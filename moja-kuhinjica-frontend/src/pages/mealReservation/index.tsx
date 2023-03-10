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
import { MOBILE_WIDTH } from '@/constants/constants'
import styles from './MealReservation.module.scss'
import cartIcon from 'public/static/assets/images/cart.svg'
import RestaurantService, {
    ICartItem,
    IMeal,
    IMenu,
} from '@/service/Restaurant.service'
import { MenuItem } from '@/components/menu/MenuItem'
import { useAppDispatch, useAppSelector } from '@/utils/hooks'
import { addItemToCart } from '@/reduxStore/reducers/restaurantReducer'

const MealReservation = (): JSX.Element => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector((state) => state.restaurant.cartItems)
    const today = new Date(Date.now())
    const [active, setActive] = useState<number>(today.getDay())
    const [showNotification, setShowNotification] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [showCart, setShowCart] = useState<boolean>(false)
    const [menuForWeek, setMenuForWeek] = useState<IMenu[]>()
    const [menuForDay, setMenuForDay] = useState<IMenu>()

    useEffect(() => {
        fetchMenus()
    }, [])

    useEffect(() => {
        handleWindowResize()
        window.addEventListener('resize', handleWindowResize)
        if (windowWidth < MOBILE_WIDTH) setIsMobile(true)
        else setIsMobile(false)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [windowWidth])

    const isCartEmpty = (): boolean => {
        return cartItems.length === 0
    }

    const fetchMenus = (): void => {
        RestaurantService.fetchAllMenus()
            .then((res) => {
                setMenuForWeek(res.data)
                setMenuForDay(res.data[5])
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const addToCart = (meal: IMeal): void => {
        let cartItem: ICartItem = { meal: meal, amount: 1 }
        dispatch(addItemToCart(cartItem))
    }

    const handleWindowResize = (): void => {
        setWindowWidth(window.innerWidth)
    }

    const getTotalPrice = (): number => {
        let totalPrice = 0
        cartItems.forEach(
            (item) => (totalPrice += item.meal.price * item.amount)
        )
        return totalPrice
    }
    return (
        <div className={styles.colDiv}>
            {showMenu && <Menu closeMenu={() => setShowMenu(false)} />}
            {isMobile ? (
                <MobileHeader handleClick={() => setShowMenu(true)} />
            ) : (
                <Header type="red" selectedButton={2} />
            )}
            <div
                className={
                    menuForDay ? styles.container : styles.emptyMenuContainer
                }
            >
                <div
                    className={
                        menuForDay
                            ? styles.restaurantTitleWrapper
                            : styles.emptyMenuTitleWrapper
                    }
                >
                    <label className={styles.restaurantTitle}>
                        Restoran Top FOOD 021
                    </label>
                    <label
                        onClick={() => router.push('/restaurant/profile')}
                        className={styles.restaurantInfoLabel}
                    >
                        opste informacije
                    </label>
                </div>
                <label className={styles.titleLabel}>
                    {`Dnevni meni - ${today.toLocaleDateString()}`}
                </label>
                <div className={styles.menuDiv}>
                    <div className={styles.menuColDiv}>
                        <div className={styles.menuRowDiv}>
                            <TabButton
                                active={active === 1}
                                onClick={() => setActive(1)}
                                content="PON"
                            />
                            <TabButton
                                active={active === 2}
                                onClick={() => setActive(2)}
                                content="UTO"
                            />
                            <TabButton
                                active={active === 3}
                                onClick={() => setActive(3)}
                                content="SRE"
                            />
                            <TabButton
                                active={active === 4}
                                onClick={() => setActive(4)}
                                content="ČET"
                            />
                            <TabButton
                                active={active === 5}
                                onClick={() => setActive(5)}
                                content="PET"
                            />
                            <TabButton
                                active={active === 6}
                                onClick={() => setActive(6)}
                                content="SUB"
                            />
                        </div>
                        {menuForDay ? (
                            <div className={styles.grid}>
                                {menuForDay.meals.map((meal) => {
                                    return (
                                        <MenuItem
                                            key={meal.id}
                                            type="ordering"
                                            title={meal.title}
                                            description={meal.description}
                                            price={meal.price}
                                            handleClick={() => addToCart(meal)}
                                        />
                                    )
                                })}
                            </div>
                        ) : (
                            <div className={styles.emptyMenuDiv}>
                                <Text
                                    content={`Dnevni meni za ${today.toLocaleDateString()} još uvek nije
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
                                        {cartItems.map((item) => {
                                            return (
                                                <CartItem
                                                    key={item.meal.id}
                                                    meal={item.meal}
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
                                    <RegularButton
                                        content="Potvrdi rezervaciju"
                                        style={styles.confirmButton}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {isMobile ? <MobileFooter /> : <Footer />}
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
                    onClick={() => setShowCart(true)}
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
                                Vasa korpa je prazna, rezervisite neko jelo iz
                                dnevnog menija
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
                                    5 rezervacija
                                </label>
                            </div>
                            <div className={styles.priceWrapper}>
                                <label className={styles.priceLabel}>
                                    Ukupno:
                                </label>
                                <label className={styles.totalPrice}>
                                    1120 RSD
                                </label>
                            </div>
                        </>
                    )}
                </div>
            )}
            {isMobile && showCart && !isCartEmpty && (
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
                            {/* <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem /> */}
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
                        <RegularButton
                            content="Potvrdi rezervaciju"
                            style={styles.confirmButton}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default MealReservation
