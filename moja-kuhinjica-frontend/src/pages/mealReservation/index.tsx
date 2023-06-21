import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/header/Header'
import { TabButton } from '@/components/button/TabButton'
import { Footer } from '@/components/footer/Footer'
import { Title } from '@/components/label/Title'
import { isBookingAllowed } from 'src/utils/dateUtils'
import { CartItem } from '@/components/cart/CartItem'
import { RegularButton } from '@/components/button/RegularButton'
import { Text } from '@/components/label/Text'
import { SuccessNotificationModal } from '@/components/modal/notification/SuccessNotificationModal'
import { MobileHeader } from '@/components/header/mobileHeader/MobileHeader'
import Menu from '../../components/mobileMenu'
import { MobileFooter } from '@/components/footer/mobileFooter/MobileFooter'
import { MOBILE_WIDTH } from '@/constants/constants'
import cartIcon from 'public/static/assets/images/cart.svg'
import RestaurantService, {
    IMeal,
    IMenu,
    IOrder,
} from '@/service/Restaurant.service'
import { MenuItem } from '@/components/menu/MenuItem'
import { useAppDispatch, useAppSelector } from '@/utils/hooks'
import {
    addItemToCart,
    emptyCart,
} from '@/reduxStore/reducers/restaurantReducer'
import uuid from 'react-uuid'
import { Oval } from 'react-loader-spinner'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/sr'
import { ReservationNotificationModal } from '@/components/modal/reservation/ReservationNotificationModal'
import { ReservationConfirmationModal } from '@/components/modal/reservation/ReservationConfirmationModal'
import { DisabledReservationModal } from '@/components/modal/disabledReservation/DisabledReservationModal'
import { generateWeekDays } from 'src/utils/dateUtils'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { routes } from '../../constants/constants'

const ORDERING = 'ordering'
const HEADER_TYPE = 'red'
const INITIAL_MEAL_AMOUNT = 1
const DISABLED_MESSAGE = 'Ne možete da rezervišete posle 10 ujutru'
const RESERVATION_SUCCESS = 'Rezervacija je uspešna'
const RESERVATION_FAIL = 'Neuspešna rezervacija'
const RESERVATION_SUCCESS_MESSAGE =
    'Vaša rezervacija je sačuvana. Možete je pogledati na stranici'
const EMPTY_CART_MESSAGE =
    'Vaša korpa je prazna, ukoliko želite da pogledate svoje rezervacije možete otići na stranicu'
dayjs.extend(utc)

const MealReservation = (): JSX.Element => {
    const { t } = useTranslation()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector(
        ({ restaurant: { cartItems } }) => cartItems
    )
    const [active, setActive] = useState<number>(0)
    const [showDisabledReservation, setShowDisabledReservation] =
        useState<boolean>(false)
    const [showNotification, setShowNotification] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [selectedDay, setSelectedDay] = useState<string>()
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [showCart, setShowCart] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [menusForWeek, setMenusForWeek] = useState<IMenu[]>([])
    const [menuForDay, setMenuForDay] = useState<IMenu>()
    const [reservationModalIsOpen, setReservationModalIsOpen] =
        useState<boolean>(false)
    const [confirmationModalIsOpen, setConfirmationModalIsOpen] =
        useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [isTabClick, setIsTabClick] = useState<boolean>(false)
    const [activeDate, setActiveDate] = useState<string>(
        dayjs().format('DD/MM/YYYY')
    )

    const [dayOfweek, setDeyOfWeek] = useState<number>(dayjs().day())
    const hasMeals = Boolean(menuForDay?.meals?.length)
    useEffect(() => {
        fetchMenus()
    }, [])

    useEffect(() => {
        handleWindowResize()
        window.addEventListener('resize', handleWindowResize)
        setIsMobile(windowWidth < MOBILE_WIDTH)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [windowWidth])

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent): void => {
            if (confirmationModalIsOpen) {
                event.preventDefault()
                event.returnValue = ''
                document.body.style.pointerEvents = 'none'
                return
            }
            document.body.style.pointerEvents = 'auto'
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
            document.body.style.pointerEvents = 'auto'
        }
    }, [confirmationModalIsOpen])

    useEffect(() => {
        setMenuForDay(
            menusForWeek.find(
                (item) => new Date(item.date).getDay() === dayOfweek
            )
        )
    }, [active])

    const isCartEmpty = (): boolean => !cartItems.length

    const isItemInCart = (mealId: number): boolean =>
        !!cartItems.find((item) => item.meal.id === mealId)

    const fetchMenus = (): void => {
        setIsLoading(true)
        RestaurantService.fetchWeeklyMenus()
            .then(({ data }) => {
                setMenusForWeek(data)
                setMenuForDay(data[active])
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false)
            })
    }
    const addToCart = (meal: IMeal): void => {
        if (!isBookingAllowed(activeDate)) {
            return setShowDisabledReservation(true)
        }

        dispatch(
            addItemToCart({
                meal,
                mealId: meal.id,
                quantity: INITIAL_MEAL_AMOUNT,
            })
        )
    }
    const handleWindowResize = (): void => {
        setWindowWidth(window.innerWidth)
    }

    const getTotalPrice = (): number => {
        let totalPrice = 0
        cartItems.forEach(
            (item) => (totalPrice += item.meal.price * item.quantity)
        )
        return totalPrice
    }

    const generateDateForWeekday = (activeDay: number): string => {
        const date = dayjs()
        let dateForCreatingOrder = date.day(activeDay)
        if (dateForCreatingOrder.isBefore(date)) {
            dateForCreatingOrder = dateForCreatingOrder.add(1, 'week')
        }
        return dateForCreatingOrder.utc(true).format()
    }

    const createOrder = (): void => {
        const items = cartItems.map(({ meal, ...item }) => item)
        const order: IOrder = {
            date: generateDateForWeekday(dayOfweek),
            price: getTotalPrice(),
            restaurantId: 5,
            items,
        }

        RestaurantService.createOrder(order)
            .then(() => {
                setReservationModalIsOpen(true)
                dispatch(emptyCart())
                setIsError(false)
            })
            .catch((err) => {
                setIsError(true)
                setErrorMessage(err.response.data.message)
                setReservationModalIsOpen(true)
                console.log(err)
            })
    }

    const handleTabClickWithCartItems = (): void => {
        setConfirmationModalIsOpen(true)
        setIsTabClick(true)
    }

    const handleOrderCancellation = (): void => {
        dispatch(emptyCart())
        setConfirmationModalIsOpen(false)
        setIsTabClick(false)
    }

    const handleOrderConfirmation = (): void => {
        createOrder()
        setConfirmationModalIsOpen(false)
    }

    return (
        <div className="mealReservation">
            {showMenu && <Menu closeMenu={() => setShowMenu(false)} />}
            {isMobile ? (
                <MobileHeader handleClick={() => setShowMenu(true)} />
            ) : (
                <Header type={HEADER_TYPE} selectedButton={2} />
            )}
            <ReservationNotificationModal
                title={!isError ? RESERVATION_SUCCESS : RESERVATION_FAIL}
                text={!isError ? RESERVATION_SUCCESS_MESSAGE : errorMessage}
                modalIsOpen={reservationModalIsOpen}
                closeModal={() => {
                    setReservationModalIsOpen(false)
                }}
                buttonText="OK"
                isError={isError}
                linkMyReservations={!isError}
                linkText="Moje rezervacije"
                route={routes.MY_RESERVATIONS_PAGE}
            />
            <ReservationConfirmationModal
                title={t('Potvrdite rezervaciju')}
                text={`Da li zelite da potvrdite narudzbinu za ${activeDate} ?`}
                modalIsOpen={confirmationModalIsOpen}
                confirmOrder={handleOrderConfirmation}
                closeModal={() => {
                    isTabClick
                        ? handleOrderCancellation()
                        : setConfirmationModalIsOpen(false)
                }}
                buttonText="OK"
            />
            <DisabledReservationModal
                modalIsOpen={showDisabledReservation}
                closeModal={() => setShowDisabledReservation(!true)}
                title={DISABLED_MESSAGE}
                buttonText={'OK'}
            />

            <div className="mealReservation__container">
                <div
                    className={
                        hasMeals
                            ? 'mealReservation__container__restaurantTitleWrapper'
                            : 'mealReservation__container__restaurantTitleWrapper mealReservation__container__restaurantTitleWrapper--empty'
                    }
                >
                    <Link
                        href="/restaurant/profile"
                        style={{ textDecoration: 'none' }}
                    >
                        <label className="mealReservation__container__restaurantTitleWrapper__restaurantTitle">
                            Restoran Top FOOD 021
                        </label>
                    </Link>
                    <Link
                        href="/restaurant/profile"
                        style={{ textDecoration: 'none' }}
                    >
                        <label className="mealReservation__container__restaurantTitleWrapper__restaurantInfoLabel">
                            {t('opšte informacije')}
                        </label>
                    </Link>
                </div>
                <label className="mealReservation__container__titleLabel">
                    {t('Dnevni meni za')} {activeDate}
                </label>
                <div className="mealReservation__container__menuDiv">
                    <div className="mealReservation__container__menuDiv__menuColDiv">
                        <div className="mealReservation__container__menuDiv__menuColDiv__menuRowDiv">
                            {generateWeekDays().map((day, activeTabIndex) => {
                                const date = dayjs().add(activeTabIndex, 'day')
                                return (
                                    <TabButton
                                        key={uuid()}
                                        active={active === activeTabIndex}
                                        onClick={() => {
                                            if (cartItems.length) {
                                                handleTabClickWithCartItems()
                                            } else {
                                                setDeyOfWeek(date.day())
                                                setActive(activeTabIndex)
                                                setActiveDate(day.date)
                                            }
                                        }}
                                        content={t(day.dayofweek)}
                                    />
                                )
                            })}
                        </div>
                        {isLoading && (
                            <div className="mealReservation__container__menuDiv__menuColDiv__loadingBarWrapper">
                                <Oval
                                    height={70}
                                    width={70}
                                    color="#c10016"
                                    wrapperStyle={{}}
                                    wrapperClass="mealReservation__container__menuDiv__menuColDiv__loadingBarWrapper__spinner"
                                    visible={true}
                                    ariaLabel="oval-loading"
                                    secondaryColor="#c10016"
                                    strokeWidth={4}
                                    strokeWidthSecondary={4}
                                />
                            </div>
                        )}
                        {hasMeals && !isLoading && (
                            <div className="mealReservation__container__menuDiv__menuColDiv__grid">
                                {menuForDay?.meals?.map((meal: IMeal) => {
                                    return (
                                        <MenuItem
                                            key={meal.id}
                                            type={ORDERING}
                                            title={meal.title}
                                            description={meal.description}
                                            price={meal.price}
                                            image={meal.image}
                                            handleClick={() => addToCart(meal)}
                                            buttonIsActive={
                                                !isItemInCart(meal.id)
                                            }
                                        />
                                    )
                                })}
                            </div>
                        )}
                        {!isLoading && !hasMeals && (
                            <div className="mealReservation__container__menuDiv__menuColDiv__emptyMenuDiv">
                                <Text
                                    content={`Dnevni meni za ${activeDate} još uvek nije
                                        objavljen.`}
                                    style="mealReservation__container__menuDiv__menuColDiv__emptyMenuDiv__emptyMenuLabel"
                                />
                            </div>
                        )}
                    </div>
                    <div className="mealReservation__container__menuDiv__cartContainer">
                        <div className="mealReservation__container__menuDiv__cartContainer__cartWrapper">
                            {isCartEmpty() && (
                                <div className="mealReservation__container__menuDiv__cartContainer__cartWrapper__emptyCartDiv">
                                    <Title
                                        content={t('korpa')}
                                        style="mealReservation__container__menuDiv__cartContainer__cartWrapper__emptyCartDiv__cartTitle"
                                    />

                                    <label className="mealReservation__container__menuDiv__cartContainer__cartWrapper__emptyCartDiv__emptyCartLabel">
                                        {t(EMPTY_CART_MESSAGE)}
                                        <span
                                            className="mealReservation__container__menuDiv__cartContainer__cartWrapper__emptyCartDiv__emptyCartLabel__emptySpan"
                                            onClick={() =>
                                                router.push(
                                                    routes.MY_RESERVATIONS_PAGE
                                                )
                                            }
                                        >
                                            {' ' + t('Moje rezervacije')}
                                        </span>
                                    </label>
                                </div>
                            )}
                            {!isCartEmpty() && (
                                <div className="mealReservation__container__menuDiv__cartContainer__cartWrapper__cartDiv">
                                    <Title
                                        content="korpa"
                                        style="mealReservation__container__menuDiv__cartContainer__cartWrapper__cartDiv__cartTitle"
                                    />
                                    <div className="mealReservation__container__menuDiv__cartContainer__cartWrapper__cartDiv__scrollItemsDiv">
                                        {cartItems.map(({ meal }) => {
                                            return (
                                                <CartItem
                                                    key={meal.id}
                                                    meal={meal}
                                                />
                                            )
                                        })}
                                    </div>
                                    <div className="mealReservation__container__menuDiv__cartContainer__cartWrapper__cartDiv__priceDiv">
                                        <Text
                                            content={t('Ukupno:') as string}
                                            style="mealReservation__container__menuDiv__cartContainer__cartWrapper__cartDiv__priceDiv__priceLabel"
                                        />
                                        <div className="mealReservation__container__menuDiv__cartContainer__cartWrapper__cartDiv__priceDiv__totalPriceDiv">
                                            <Text
                                                content={getTotalPrice().toString()}
                                                style="mealReservation__container__menuDiv__cartContainer__cartWrapper__cartDiv__priceDiv__totalPriceDiv__totalPrice"
                                            />
                                            <Text
                                                content="RSD"
                                                style="mealReservation__container__menuDiv__cartContainer__cartWrapper__cartDiv__priceDiv__totalPriceDiv__totalPrice"
                                            />
                                        </div>
                                    </div>
                                    <div className="mealReservation__container__menuDiv__cartContainer__cartWrapper__cartDiv__confirmButtonWrapper">
                                        <RegularButton
                                            content={t('Potvrdi rezervaciju')}
                                            isActive
                                            style="mealReservation__container__menuDiv__cartContainer__cartWrapper__cartDiv__confirmButtonWrapper__confirmButton"
                                            onClick={() =>
                                                setConfirmationModalIsOpen(true)
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <SuccessNotificationModal
                modalIsOpen={showNotification}
                closeModal={() => setShowNotification(false)}
                title={t('rezervacija uspešna')}
                buttonText={t('rezerviši ponovo')}
            />
            {isMobile && !showCart && (
                <div
                    className="mealReservation__bottomCart"
                    onClick={() => !isCartEmpty() && setShowCart(true)}
                >
                    {isCartEmpty() ? (
                        <>
                            <div className="mealReservation__bottomCart__emptyIconWrapper">
                                <Image
                                    src={cartIcon}
                                    alt=""
                                    className="mealReservation__bottomCart__emptyIconWrapper__cartIcon"
                                />
                            </div>
                            <label className="mealReservation__bottomCart__cartInfo">
                                {t(
                                    'Vaša korpa je prazna, rezervišite neko jelo iz dnevnog menija.'
                                )}
                            </label>
                        </>
                    ) : (
                        <>
                            <div className="mealReservation__bottomCart__amountWrapper">
                                <div className="mealReservation__bottomCart__amountWrapper__iconWrapper">
                                    <Image
                                        src={cartIcon}
                                        alt=""
                                        className="mealReservation__bottomCart__amountWrapper__iconWrapper__cartIcon"
                                    />
                                </div>
                                <label className="mealReservation__bottomCart__amountWrapper__cartInfo">
                                    {`${cartItems.length} rezervacija`}
                                </label>
                            </div>
                            <div className="mealReservation__bottomCart__priceWrapper">
                                <label className="mealReservation__bottomCart__priceWrapper__priceLabel">
                                    {t('Ukupno')}
                                </label>
                                <label className="mealReservation__bottomCart__priceWrapper__totalPrice">
                                    {`${getTotalPrice()} RSD`}
                                </label>
                            </div>
                        </>
                    )}
                </div>
            )}
            {isMobile && showCart && (
                <div
                    className="mealReservation__openCartContainer"
                    onClick={() => setShowCart(false)}
                >
                    <div
                        className="mealReservation__openCartContainer__openCartBottom"
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                    >
                        <Title
                            content="korpa"
                            style="mealReservation__openCartContainer__openCartBottom__cartTitle"
                        />
                        <div className="mealReservation__openCartContainer__openCartBottom__scrollItemsDiv">
                            {cartItems.map(({ meal }) => {
                                return <CartItem key={meal.id} meal={meal} />
                            })}
                        </div>
                        <div className="mealReservation__openCartContainer__openCartBottom__priceDiv">
                            <Text
                                content={t('Ukupno:') as string}
                                style="mealReservation__openCartContainer__openCartBottom__priceDiv__priceLabel"
                            />
                            <div className="mealReservation__openCartContainer__openCartBottom__priceDiv__totalPriceDiv">
                                <Text
                                    content={getTotalPrice().toString()}
                                    style="mealReservation__openCartContainer__openCartBottom__priceDiv__totalPriceDiv__totalPrice"
                                />
                                <Text
                                    content="RSD"
                                    style="mealReservation__openCartContainer__openCartBottom__priceDiv__totalPriceDiv__totalPrice"
                                />
                            </div>
                        </div>
                        <div className="mealReservation__openCartContainer__openCartBottom__confirmButtonWrapper">
                            <RegularButton
                                content={t('Potvrdi rezervaciju') as string}
                                style="mealReservation__openCartContainer__openCartBottom__confirmButtonWrapper__confirmButton"
                                isActive
                                onClick={createOrder}
                            />
                        </div>
                    </div>
                </div>
            )}
            {isMobile ? <MobileFooter /> : <Footer />}
        </div>
    )
}

export default MealReservation
