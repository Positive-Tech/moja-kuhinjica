import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Header from '@/components/header/Header'
import { TabButton } from '@/components/button/TabButton'
import { MenuItem } from '@/components/menu/MenuItem'
import styles from './MealReservation.module.scss'
import { Footer } from '@/components/footer/Footer'
import { Title } from '@/components/label/Title'
import { CartItem } from '@/components/cart/CartItem'
import { RegularButton } from '@/components/button/RegularButton'
import { Text } from '@/components/label/Text'
import { SuccessNotificationModal } from '@/components/modal/notification/SuccessNotificationModal'

const MealReservation = () => {
    const router = useRouter()
    const [active, setActive] = useState<number>(1)
    const [showNotification, setShowNotification] = useState<boolean>(false)
    const [menuIsPresent, setMenuIsPresent] = useState<boolean>(true)
    const [cartIsEmpty, setCartIsEmpty] = useState<boolean>(false)
    return (
        <div className={styles.colDiv}>
            <Header type="red" selectedButton={2} />
            <div
                className={
                    menuIsPresent ? styles.container : styles.emptyMenuContainer
                }
            >
                <div className={styles.restaurantButtonWrapper}>
                    <button
                        className={styles.restaurantButton}
                        onClick={() => router.push('/restaurant/profile')}
                    >
                        Restoran Top FOOD 021
                    </button>
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
                                content="Ponedeljak"
                            />
                            <TabButton
                                active={active === 2}
                                onClick={() => setActive(2)}
                                content="Utorak"
                            />
                            <TabButton
                                active={active === 3}
                                onClick={() => setActive(3)}
                                content="Sreda"
                            />
                            <TabButton
                                active={active === 4}
                                onClick={() => setActive(4)}
                                content="Četvrtak"
                            />
                            <TabButton
                                active={active === 5}
                                onClick={() => setActive(5)}
                                content="Petak"
                            />
                            <TabButton
                                active={active === 6}
                                onClick={() => setActive(6)}
                                content="Subota"
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
                                    <div
                                        style={{
                                            overflow: 'scroll',
                                            padding: '5%',
                                            height: '80%',
                                        }}
                                    >
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
                                    <RegularButton content="Potvrdi rezervaciju" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
            <SuccessNotificationModal
                modalIsOpen={showNotification}
                closeModal={() => setShowNotification(false)}
                title="rezervacija uspešna"
                buttonText="rezerviši ponovo"
            />
        </div>
    )
}

export default MealReservation
