import React, { useState, useEffect } from 'react'
import Header from '@/components/header/Header'
import { TabButton } from '@/components/button/TabButton'
import { ReservationItem } from '@/components/reservation/ReservationItem'
import { Footer } from '@/components/footer/Footer'
import Menu from '../../components/mobileMenu'
import { MobileHeader } from '@/components/header/mobileHeader/MobileHeader'
import { MobileFooter } from '@/components/footer/mobileFooter/MobileFooter'
import { INDEX_INCREMENT, MOBILE_WIDTH } from '@/constants/constants'
import styles from './MyReservationsPage.module.scss'
import uuid from 'react-uuid'
import RestaurantService, {
    IMyReservations,
    IReservationGroup,
    IReservationItem,
} from '@/service/Restaurant.service'
import 'dayjs/locale/sr'
import dayjs, { Dayjs } from 'dayjs'
import { Oval } from 'react-loader-spinner'

const FIRST_ELEMENT = 0

const MyReservationsPage = (): JSX.Element => {
    const [active, setActive] = useState<number>(1)
    const [reservationsExist, setReservationsExist] = useState<boolean>(true)
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [myReservations, setMyReservations] = useState<IMyReservations[]>()
    const [activeDate, setActiveDate] = useState<string>(
        dayjs().format('DD-MM-YYYY')
    )

    const handleWindowResize = (): void => {
        setWindowWidth(window.innerWidth)
    }

    const fetchMyReservations = (): void => {
        setIsLoading(true)
        RestaurantService.fetchMyReservations(true)
            .then((res) => {
                setMyReservations(res.data)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false)
            })
    }

    const compareReservationDates = (
        a: IMyReservations,
        b: IMyReservations
    ): number => {
        const aDate = new Date(a.date.split(',')[0]).setHours(0, 0, 0, 0)
        const bDate = new Date(b.date.split(',')[0]).setHours(0, 0, 0, 0)

        return aDate - bDate
    }

    const groupReservationsByDate = (
        reservations?: IMyReservations[]
    ): IReservationGroup[] => {
        const sortedReservations = reservations?.sort(compareReservationDates)

        const groups: IReservationGroup[] = []

        sortedReservations?.forEach((reservation) => {
            const groupIndex = groups.findIndex(
                (group) => group.date === reservation.date.split(',')[0]
            )

            if (groupIndex !== -1) {
                groups[groupIndex].reservations.push(reservation)
                return
            }
            groups.push({
                date: reservation.date.split(',')[0],
                reservations: [reservation],
            })
        })

        return groups
    }

    const getReservationsForDayOfWeek = (
        dayOfWeek: string
    ): IReservationGroup[] => {
        return groupReservationsByDate(myReservations).filter((reservation) => {
            return dayjs(reservation.date).format('DD-MM-YYYY') === dayOfWeek
        })
    }

    const generateWeekDays = (): { dayofweek: string; date: string }[] => {
        const today: Dayjs = dayjs().startOf('day')
        const endOfWeek: Dayjs = today.add(6, 'day').endOf('day')

        dayjs.locale('sr')
        const days: { dayofweek: string; date: string }[] = []

        let day = dayjs(today)
        while (day.isBefore(endOfWeek)) {
            days.push({
                dayofweek: day
                    .format('ddd')
                    .toLocaleUpperCase()
                    .replace('.', ''),
                date: day.format('DD-MM-YYYY'),
            })
            day = day.add(1, 'day')
        }

        return days
    }

    const resForDay: IMyReservations[] =
        getReservationsForDayOfWeek(activeDate)[0]?.reservations

    useEffect(() => {
        fetchMyReservations()
    }, [])

    useEffect(() => {
        setReservationsExist(true)
        handleWindowResize()
        window.addEventListener('resize', handleWindowResize)
        if (windowWidth < MOBILE_WIDTH) setIsMobile(true)
        else setIsMobile(false)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [windowWidth])

    return (
        <div className={styles.colDiv}>
            {showMenu && <Menu closeMenu={() => setShowMenu(false)} />}
            {isMobile ? (
                <MobileHeader handleClick={() => setShowMenu(true)} />
            ) : (
                <Header type="red" selectedButton={FIRST_ELEMENT} />
            )}
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
                        {generateWeekDays().map((day, activeTabIndex) => {
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
                                        setActiveDate(day.date)
                                    }}
                                    content={day.dayofweek}
                                />
                            )
                        })}
                    </div>

                    <label className={styles.titleLabel}>{activeDate}</label>
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
                    {!myReservations && (
                        <div className={styles.rowDiv}>
                            <label className={styles.infoLabel}>
                                Nema rezervacija za ovaj datum.
                            </label>
                        </div>
                    )}
                    {myReservations && (
                        <div className={styles.reservationWrapper}>
                            {resForDay?.map(
                                ({
                                    id,
                                    restaurant,
                                    items,
                                }: IMyReservations) => (
                                    <>
                                        <label
                                            className={styles.restaurantLabel}
                                        >
                                            {restaurant.restaurantName}
                                        </label>
                                        <label
                                            className={styles.reservationLabel}
                                        >
                                            Rezervacija {id}
                                        </label>
                                        {items.map(
                                            (
                                                {
                                                    id,
                                                    quantity,
                                                    mealName,
                                                    mealImage,
                                                }: IReservationItem,
                                                index
                                            ) => (
                                                <ReservationItem
                                                    key={id}
                                                    quantity={quantity}
                                                    mealName={mealName}
                                                    mealImage={mealImage}
                                                    index={index}
                                                    itemsLength={items.length}
                                                />
                                            )
                                        )}
                                    </>
                                )
                            )}
                        </div>
                    )}
                </div>
                {isMobile ? <MobileFooter /> : <Footer />}
            </div>
        </div>
    )
}

export default MyReservationsPage
