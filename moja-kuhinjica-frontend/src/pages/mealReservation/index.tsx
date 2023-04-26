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
import styles from './MealReservation.module.scss'
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

    const generateDateForWeekday = (activeDay: number): string => {
        const date = dayjs()
        let dateForCreatingOrder = date.day(activeDay)

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
        <div className={styles.colDiv}>
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
            <div className={styles.container}>
                <div
                    className={
                        hasMeals
                            ? styles.restaurantTitleWrapper
                            : styles.emptyMenuTitleWrapper
                    }
                >
                    <label className={styles.restaurantTitle}>
                        Restoran Top FOOD 021
                    </label>
                    <label
                        onClick={() =>
                            router.push(routes.RESTAURANT_PROFILE_PAGE)
                        }
                        className={styles.restaurantInfoLabel}
                    >
                        opšte informacije
                    </label>
                </div>
                <label className={styles.titleLabel}>
                    {`Dnevni meni za ${getDate()}`}
                </label>
                <div className={styles.menuDiv}>
                    <div className={styles.menuColDiv}>
                        <div className={styles.menuRowDiv}>
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
                            <div className={styles.loadingBarWrapper}>
                                <Oval
                                    height={70}
                                    width={70}
                                    color="#c10016"
                                    wrapperStyle={{}}
                                    wrapperClass={styles.spinner}
                                    visible={true}
                                    ariaLabel="oval-loading"
                                    secondaryColor="#c10016"
                                    strokeWidth={4}
                                    strokeWidthSecondary={4}
                                />
                            </div>
                        )}
                        {hasMeals && !isLoading && (
                            <div className={styles.grid}>
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
                            <div className={styles.emptyMenuDiv}>
                                <Text
                                    content={`Dnevni meni za ${getDate()} još uvek nije
                                        objavljen.`}
                                    style={styles.emptyMenuLabel}
                                />
                            </div>
                        )}
                    </div>
                    <div className={styles.cartContainer}>
                        <div className={styles.cartWrapper}>
                            {isCartEmpty() && (
                                <div className={styles.emptyCartDiv}>
                                    <Title
                                        content="korpa"
                                        style={styles.cartTitle}
                                    />
                                    <Text
                                        content="Vaša korpa je prazna, rezervišite jelo iz dnevnog menija."
                                        style={styles.emptyCartLabel}
                                    />
                                </div>
                            )}
                            {!isCartEmpty() && (
                                <div className={styles.cartDiv}>
                                    <Title
                                        content="korpa"
                                        style={styles.cartTitle}
                                    />
                                    <div className={styles.scrollItemsDiv}>
                                        {cartItems.map(({ meal }) => {
                                            return (
                                                <CartItem
                                                    key={meal.id}
                                                    meal={meal}
                                                />
                                            )
                                        })}
                                    </div>
                                    <div className={styles.priceDiv}>
                                        <Text
                                            content="Ukupno:"
                                            style={styles.priceLabel}
                                        />
                                        <div className={styles.totalPriceDiv}>
                                            <Text
                                                content={getTotalPrice().toString()}
                                                style={styles.totalPrice}
                                            />
                                            <Text
                                                content="RSD"
                                                style={styles.totalPrice}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={styles.confirmButtonWrapper}
                                    >
                                        <RegularButton
                                            content="Potvrdi rezervaciju"
                                            isActive
                                            style={styles.confirmButton}
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
                    className={styles.bottomCart}
                    onClick={() => !isCartEmpty() && setShowCart(true)}
                >
                    {isCartEmpty() ? (
                        <>
                            <div className={styles.emptyIconWrapper}>
                                <Image
                                    src={cartIcon}
                                    alt=""
                                    className={styles.cartIcon}
                                />
                            </div>
                            <label className={styles.cartInfo}>
                                Vaša korpa je prazna, rezervišite neko jelo iz
                                dnevnog menija.
                            </label>
                        </>
                    ) : (
                        <>
                            <div className={styles.amountWrapper}>
                                <div className={styles.iconWrapper}>
                                    <Image
                                        src={cartIcon}
                                        alt=""
                                        className={styles.cartIcon}
                                    />
                                </div>
                                <label className={styles.cartInfo}>
                                    {`${cartItems.length} rezervacija`}
                                </label>
                            </div>
                            <div className={styles.priceWrapper}>
                                <label className={styles.priceLabel}>
                                    Ukupno:
                                </label>
                                <label className={styles.totalPrice}>
                                    {`${getTotalPrice()} RSD`}
                                </label>
                            </div>
                        </>
                    )}
                </div>
            )}
            {isMobile && showCart && (
                <div
                    className={styles.openCartContainer}
                    onClick={() => setShowCart(false)}
                >
                    <div
                        className={styles.openCartBottom}
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                    >
                        <Title content="korpa" style={styles.cartTitle} />
                        <div className={styles.scrollItemsDiv}>
                            {cartItems.map(({ meal }) => {
                                return <CartItem key={meal.id} meal={meal} />
                            })}
                        </div>
                        <div className={styles.priceDiv}>
                            <Text content="Ukupno:" style={styles.priceLabel} />
                            <div className={styles.totalPriceDiv}>
                                <Text
                                    content={getTotalPrice().toString()}
                                    style={styles.totalPrice}
                                />
                                <Text content="RSD" style={styles.totalPrice} />
                            </div>
                        </div>
                        <div className={styles.confirmButtonWrapper}>
                            <RegularButton
                                content="Potvrdi rezervaciju"
                                style={styles.confirmButton}
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
