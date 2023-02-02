import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Header from '@/components/header/Header'
import { TabButton } from '@/components/button/TabButton'
import { MenuItem } from '@/components/menu/MenuItem'
import styles from './MealReservation.module.scss'
import { Footer } from '@/components/footer/Footer'
import { Title } from '@/components/label/Title'

const MealReservation = () => {
    const router = useRouter()
    const [active, setActive] = useState<number>(1)
    return (
        <div className={styles.colDiv}>
            <Header type="red" selectedButton={0} />
            <div className={styles.wrapper}>
                <div className={styles.container}>
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
                            <div className={styles.grid}>
                                <MenuItem type="ordering" />
                                <MenuItem type="ordering" />
                                <MenuItem type="ordering" />
                                <MenuItem type="ordering" />
                                <MenuItem type="ordering" />
                            </div>
                        </div>
                        <div className={styles.cartContainer}>
                            <Title content="korpa" style={styles.cartTitle} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MealReservation
