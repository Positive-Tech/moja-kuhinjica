import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Header from '@/components/header/Header'
import { TabButton } from '@/components/button/TabButton'
import { Footer } from '@/components/footer/Footer'
import { Title } from '@/components/label/Title'
import { CartItem } from '@/components/cart/CartItem'
import { RegularButton } from '@/components/button/RegularButton'
import { Text } from '@/components/label/Text'
import { SuccessNotificationModal } from '@/components/modal/notification/SuccessNotificationModal'
import { MobileHeader } from '@/components/header/mobileHeader/MobileHeader'
import Menu from '../../components/mobileMenu'
import { MobileFooter } from '@/components/footer/mobileFooter/MobileFooter'
import { INDEX_INCREMENT, MOBILE_WIDTH, routes } from '@/constants/constants'
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
import { generateWeekdays } from 'src/utils/dateUtils'

const ORDERING = 'ordering'
const HEADER_TYPE = 'red'
const ADD_ONE = 1
const INITIAL_MEAL_AMOUNT = 1
const RESERVATION_SUCCESS = 'Rezervacija je uspešna'
const RESERVATION_FAIL = 'Neuspešna rezervacija'
const RESERVATION_SUCCESS_MESSAGE =
    'Vaša rezervacija je sačuvana. Možete je pogledati na stranici Moje rezervacije'
dayjs.extend(utc)

const MealReservation = (): JSX.Element => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector(
        ({ restaurant: { cartItems } }) => cartItems
    )
    const today = new Date(Date.now())
    const [active, setActive] = useState(dayjs().day())
    const [showNotification, setShowNotification] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [showCart, setShowCart] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [menusForWeek, setMenusForWeek] = useState<IMenu[]>([])
    const [menuForDay, setMenuForDay] = useState<IMenu>()
    const [activeDay, setActiveDay] = useState<number>(0)
    const [reservationModalIsOpen, setReservationModalIsOpen] =
        useState<boolean>(false)
    const [confirmationModalIsOpen, setConfirmationModalIsOpen] =
        useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [isTabClick, setIsTabClick] = useState<boolean>(false)

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

    const sortMenusByDate = (menus: IMenu[]): IMenu[] => {
        return menus.sort((a: IMenu, b: IMenu) => {
            const dateA = new Date(a.date)
            const dateB = new Date(b.date)
            return dateA.getTime() - dateB.getTime()
        })
    }

    const generateDateForWeekday = (activeDay: number): string => {
        const date = dayjs()
        let dateForCreatingOrder = date.day(activeDay + ADD_ONE)

        if (dateForCreatingOrder.isAfter(date)) {
            dateForCreatingOrder = dateForCreatingOrder.startOf('day')
        }
        return dateForCreatingOrder.utc(true).format()
    }

    const createOrder = (): void => {
        const items = cartItems.map(({ meal, ...item }) => item)
        const order: IOrder = {
            date: generateDateForWeekday(activeDay),
            price: getTotalPrice(),
            restaurantId: 5,
            items,
        }
        console.log(JSON.stringify(order))
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

    const getDate = (): string | undefined => {
        const dateArrReversed = menuForDay?.date.split('-')
        if (!dateArrReversed) {
            return 'ovaj dan jos nije definisan'
        }
        return dateArrReversed?.reverse()?.join('/')
    }

    const handleTabClickWithCartItems = (): void => {
        if (cartItems.length) {
            setConfirmationModalIsOpen(true)
            setIsTabClick(true)
        }
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
            />
            <ReservationConfirmationModal
                title="Potvrdite rezervaciju"
                text={`Da li zelite da potvrdite narudzbinu za ${getDate()} ?`}
                modalIsOpen={confirmationModalIsOpen}
                confirmOrder={handleOrderConfirmation}
                closeModal={() => {
                    isTabClick
                        ? handleOrderCancellation()
                        : setConfirmationModalIsOpen(false)
                }}
                buttonText="OK"
            />
            <div className="mealReservation__container">
                <div
                    className={
                        hasMeals
                            ? 'mealReservation__container__restaurantTitleWrapper'
                            : 'mealReservation__container__restaurantTitleWrapper mealReservation__container__restaurantTitleWrapper--empty'
                    }
                >
                    <label className="mealReservation__container__restaurantTitleWrapper__restaurantTitle">
                        Restoran Top FOOD 021
                    </label>
                    <label
                        onClick={() =>
                            router.push(routes.RESTAURANT_PROFILE_PAGE)
                        }
                        className="mealReservation__container__restaurantTitleWrapper__restaurantInfoLabel"
                    >
                        opšte informacije
                    </label>
                </div>
                <label className="mealReservation__container__titleLabel">
                    {`Dnevni meni za ${getDate()}`}
                </label>
                <div className="mealReservation__container__menuDiv">
                    <div className="mealReservation__container__menuDiv__menuColDiv">
                        <div className="mealReservation__container__menuDiv__menuColDiv__menuRowDiv">
                            {generateWeekdays().map((day, activeTabIndex) => {
                                const date = dayjs()
                                    .startOf('week')
                                    .add(activeTabIndex, 'day')
                                const menu = menusForWeek.find((menuItem) =>
                                    dayjs(menuItem.date).isSame(date, 'day')
                                )
                                return (
                                    <TabButton
                                        key={uuid()}
                                        active={
                                            active ===
                                            activeTabIndex + INDEX_INCREMENT
                                        }
                                        onClick={() => {
                                            setActive(
                                                activeTabIndex + INDEX_INCREMENT
                                            )
                                            setMenuForDay(menu)
                                        }}
                                        content={day}
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
                                    content={`Dnevni meni za ${getDate()} još uvek nije
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
                                        content="korpa"
                                        style="mealReservation__container__menuDiv__cartContainer__cartWrapper__emptyCartDiv__cartTitle"
                                    />
                                    <Text
                                        content="Vaša korpa je prazna, rezervišite jelo iz dnevnog menija."
                                        style="mealReservation__container__menuDiv__cartContainer__cartWrapper__emptyCartDiv__emptyCartLabel"
                                    />
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
                                            content="Ukupno:"
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
                                            content="Potvrdi rezervaciju"
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
                title="rezervacija uspešna"
                buttonText="rezerviši ponovo"
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
                                Vaša korpa je prazna, rezervišite neko jelo iz
                                dnevnog menija.
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
                                    Ukupno:
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
                                content="Ukupno:"
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
                                content="Potvrdi rezervaciju"
                                style="mealReservation__openCartContainer__openCartBottom__confirmButtonWrapper__confirmButton"
                                isActive
                                onClick={() => createOrder()}
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
