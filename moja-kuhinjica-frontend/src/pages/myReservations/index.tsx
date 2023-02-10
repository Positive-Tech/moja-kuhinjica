import React, { useState } from 'react'
import Header from '@/components/header/Header'
import { TabButton } from '@/components/button/TabButton'
import styles from './MyReservationsPage.module.scss'
import { ReservationItem } from '@/components/reservation/ReservationItem'
import { Footer } from '@/components/footer/Footer'

const MyReservationsPage = () => {
    const [active, setActive] = useState<number>(1)
    const [reservationsExist, setReservationsExist] = useState<boolean>(true)

    return (
        <div className={styles.colDiv}>
            <Header type="red" selectedButton={0} />
            <div
                className={
                    reservationsExist ? styles.container : styles.emptyContainer
                }
            >
                <label
                    className={
                        reservationsExist
                            ? styles.titleLabel
                            : styles.emptyTitleLabel
                    }
                >
                    Moje rezervacije
                </label>
                <label className={styles.infoLabel}>
                    Rezervacije se mogu otkazati do 10 časova
                </label>
                <div className={styles.colDiv1}>
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
                    <label className={styles.titleLabel}>Februar 4</label>
                    {!reservationsExist && (
                        <div className={styles.rowDiv}>
                            <label className={styles.infoLabel}>
                                Nema rezervacija za ovaj datum.
                            </label>
                        </div>
                    )}
                    {reservationsExist && (
                        <div className={styles.reservationWrapper}>
                            <label className={styles.restaurantLabel}>
                                Restoran Top FOOD 021
                            </label>
                            <label className={styles.reservationLabel}>
                                Rezervacija #234913
                            </label>
                            <ReservationItem />
                            <ReservationItem />
                        </div>
                    )}
                    {reservationsExist && (
                        <div className={styles.reservationWrapper}>
                            <label className={styles.restaurantLabel}>
                                Restoran Top FOOD 021
                            </label>
                            <label className={styles.reservationLabel}>
                                Rezervacija #234913
                            </label>
                            <ReservationItem />
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default MyReservationsPage