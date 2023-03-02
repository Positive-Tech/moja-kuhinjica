import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Header from '@/components/header/Header'
import { TabButton } from '@/components/button/TabButton'
import { MenuItem } from '@/components/menu/MenuItem'
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

const MealReservation = (): JSX.Element => {
    const router = useRouter()
    const [active, setActive] = useState<number>(1)
    const [showNotification, setShowNotification] = useState<boolean>(false)
    const [menuIsPresent, setMenuIsPresent] = useState<boolean>(true)
    const [cartIsEmpty, setCartIsEmpty] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [showCart, setShowCart] = useState<boolean>(false)

    useEffect(() => {
        setMenuIsPresent(false)
        setCartIsEmpty(true)
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

    const handleWindowResize = (): void => {
        setWindowWidth(window.innerWidth)
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
                    menuIsPresent ? styles.container : styles.emptyMenuContainer
                }
            >
                <div
                    className={
                        menuIsPresent
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
                    Dnevni meni - 21/01/2023
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
                        {menuIsPresent ? (
                            <div className={styles.grid}>
                                <MenuItem type="ordering" />
                                <MenuItem type="ordering" />
                                <MenuItem type="ordering" />
                                <MenuItem type="ordering" />
                                <MenuItem type="ordering" />
                            </div>
                        ) : (
                            <div className={styles.emptyMenuDiv}>
                                <Text
                                    content="Dnevni meni za 20/1/2023 još uvek nije
                                        objavljen."
                                    style={styles.emptyMenuLabel}
                                />
                            </div>
                        )}
                    </div>
                    <div className={styles.cartContainer}>
                        <div className={styles.cartWrapper}>
                            {cartIsEmpty && (
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
                            {!cartIsEmpty && (
                                <div className={styles.cartDiv}>
                                    <Title
                                        content="korpa"
                                        style={styles.cartTitle}
                                    />
                                    <div className={styles.scrollItemsDiv}>
                                        <CartItem />
                                        <CartItem />
                                        <CartItem />
                                        <CartItem />
                                        <CartItem />
                                        <CartItem />
                                    </div>
                                    <div className={styles.priceDiv}>
                                        <Text
                                            content="Ukupno:"
                                            style={styles.priceLabel}
                                        />
                                        <div className={styles.totalPriceDiv}>
                                            <Text
                                                content="560"
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
                    {cartIsEmpty ? (
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
            {isMobile && showCart && !cartIsEmpty && (
                <div
                    className={styles.openCartContainer}
                    onClick={() => setShowCart(false)}
                >
                    <div className={styles.openCartBottom}>
                        <Title content="korpa" style={styles.cartTitle} />
                        <div className={styles.scrollItemsDiv}>
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                        </div>
                        <div className={styles.priceDiv}>
                            <Text content="Ukupno:" style={styles.priceLabel} />
                            <div className={styles.totalPriceDiv}>
                                <Text content="560" style={styles.totalPrice} />
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
