import React, { useState, useEffect } from 'react'
import Header from '@/components/header/Header'
import { TabButton } from '@/components/button/TabButton'
import { ReservationItem } from '@/components/reservation/ReservationItem'
import { Footer } from '@/components/footer/Footer'
import Menu from '../../components/mobileMenu'
import { MobileHeader } from '@/components/header/mobileHeader/MobileHeader'
import { MobileFooter } from '@/components/footer/mobileFooter/MobileFooter'
import { MOBILE_WIDTH } from '@/constants/constants'
import uuid from 'react-uuid'
import RestaurantService, {
    IMyReservations,
    IReservationGroup,
    IReservationItem,
} from '@/service/Restaurant.service'
import 'dayjs/locale/sr'
import dayjs from 'dayjs'
import { CanCancelReservationModal } from '@/components/modal/CanCancelReservation'
import { Oval } from 'react-loader-spinner'
import { canCancelOrder } from 'src/utils/dateUtils'
import { ReservationConfirmationModal } from '@/components/modal/reservation/ReservationConfirmationModal'
import { RegularButton } from '@/components/button/RegularButton'
import { ReservationNotificationModal } from '@/components/modal/reservation/ReservationNotificationModal'
import { useTranslation } from 'react-i18next'
import { generateWeekDays } from 'src/utils/dateUtils'

const FIRST_ELEMENT = 0
const CANCELLING_SUCCESS = 'Otkazali ste rezervaciju'
const CANCELLING_FAIL = 'Rezervacije se mogu otkazati do 10 časova'

const NoReservationsMessage: React.FC = () => (
    <div className="myReservationsPage__colDiv__rowDiv">
        <label className="myReservationsPage__colDiv_an_rowDiv__infoLabel">
            Nema rezervacija za ovaj datum.
        </label>
    </div>
)

const MyReservationsPage = (): JSX.Element => {
    const { t } = useTranslation()
    const [active, setActive] = useState<number>(1)
    const [reservationsExist, setReservationsExist] = useState<boolean>(true)
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [myReservations, setMyReservations] = useState<IMyReservations[]>()
    const [confirmationModalIsOpen, setConfirmationModalIsOpen] =
        useState<boolean>(false)
    const [cancellationModalIsOpen, setCancellationModalIsOpen] =
        useState<boolean>(false)
    const [showDisabledReservation, setShowDisabledReservation] =
        useState<boolean>(false)
    const [reservationID, setReservationID] = useState<number>(-1)
    const [isError] = useState<boolean>(false)
    const [isTabClick, setIsTabClick] = useState<boolean>(false)
    const [activeDate, setActiveDate] = useState<string>(
        dayjs().format('DD/MM/YYYY')
    )

    const handleWindowResize = (): void => {
        setWindowWidth(window.innerWidth)
    }

    const fetchMyReservations = (): void => {
        setIsLoading(true)
        RestaurantService.fetchMyReservations(true)
            .then((res) => {
                const activReservation = res?.data?.filter(
                    (reservation: { status: string }) =>
                        reservation?.status !== 'Otkazana'
                )
                setMyReservations(activReservation)
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
            return dayjs(reservation.date).format('DD/MM/YYYY') === dayOfWeek
        })
    }

    const resForDay: IMyReservations[] =
        getReservationsForDayOfWeek(activeDate)[0]?.reservations
    console.log(resForDay, 'resforDay')

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

    const handleOrderCancellation = (id: number): void => {
        const filteredReservations = myReservations?.filter(
            (reservation) => reservation?.id !== id
        )
        RestaurantService.cancleOrder(id)
            .then(() => {
                setMyReservations(filteredReservations)
                setConfirmationModalIsOpen(false)
                setCancellationModalIsOpen(true)
            })
            .catch((err) => console.log(err))
    }
    const handleModalClose = (): void => {
        setConfirmationModalIsOpen(false)
        setIsTabClick(false)
    }

    return (
        <div className={'myReservationsPage'}>
            {showMenu && <Menu closeMenu={() => setShowMenu(false)} />}
            {isMobile ? (
                <MobileHeader handleClick={() => setShowMenu(true)} />
            ) : (
                <Header type="red" selectedButton={FIRST_ELEMENT} />
            )}

            <CanCancelReservationModal
                modalIsOpen={showDisabledReservation}
                closeModal={() => setShowDisabledReservation(!true)}
                title={'Ne mozete da otkazete rezervaciju posle 10 ujutru'}
                buttonText={'OK'}
            />
            <ReservationConfirmationModal
                title={t('Potvrdite otkazivanje')}
                text={t(
                    'Da li ste sigurni da želite da otkažete rezervaciju?'
                ).toString()}
                modalIsOpen={confirmationModalIsOpen}
                confirmOrder={() => handleOrderCancellation(reservationID)}
                closeModal={() => {
                    isTabClick
                        ? handleModalClose()
                        : setConfirmationModalIsOpen(false)
                }}
                buttonText="OK"
            />

            <ReservationNotificationModal
                title={!isError ? CANCELLING_SUCCESS : CANCELLING_FAIL}
                modalIsOpen={cancellationModalIsOpen}
                closeModal={() => {
                    setCancellationModalIsOpen(false)
                }}
                buttonText="OK"
                isError={isError}
            />

            <div
                className={
                    reservationsExist
                        ? 'myReservationsPage__container'
                        : 'myReservationsPage__emptyContainer'
                }
            >
                <label
                    className={
                        reservationsExist
                            ? 'myReservationsPage__container__titleLabel'
                            : 'myReservationsPage__container__titleLabel myReservationsPage__container__titleLabel--empty'
                    }
                >
                    {t('Moje rezervacije')}
                </label>
                <label className="myReservationsPage__container__infoLabel">
                    {t('Rezervacije se mogu otkazati do 10 časova')}
                </label>
                <label className="myReservationsPage__colDiv__titleLabel">
                    Rezervacije za: {activeDate}
                </label>
                <div className="myReservationsPage__colDiv">
                    <div className="myReservationsPage__colDiv__menuRowDiv">
                        {generateWeekDays().map((day, activeTabIndex) => {
                            return (
                                <TabButton
                                    key={uuid()}
                                    active={active === activeTabIndex}
                                    onClick={() => {
                                        setActive(activeTabIndex)
                                        setActiveDate(day.date)
                                    }}
                                    content={t(day.dayofweek)}
                                />
                            )
                        })}
                    </div>

                    {isLoading ? (
                        <div className="myReservationsPage__colDiv__loadingBarWrapper">
                            <Oval
                                height={70}
                                width={70}
                                color="#c10016"
                                wrapperStyle={{}}
                                wrapperClass="myReservationsPage__colDiv__loadingBarWrapper__spinner"
                                visible={true}
                                ariaLabel="oval-loading"
                                secondaryColor="#c10016"
                                strokeWidth={4}
                                strokeWidthSecondary={4}
                            />
                        </div>
                    ) : (
                        <>
                            {myReservations ? (
                                <div className="myReservationsPage__colDiv__reservationWrapper">
                                    {resForDay?.length > 0 ? (
                                        resForDay?.map(
                                            ({
                                                id,
                                                restaurant,
                                                description,
                                                items,
                                                price,
                                            }: IMyReservations) => (
                                                <div
                                                    key={id}
                                                    className="myReservationsPage__colDiv__reservationWrapper__container"
                                                >
                                                    <p>{description}</p>
                                                    <label
                                                        className={
                                                            'myReservationsPage__colDiv__reservationWrapper__container__restaurantLabel'
                                                        }
                                                    >
                                                        {
                                                            restaurant.restaurantName
                                                        }
                                                    </label>
                                                    <label className="myReservationsPage__colDiv__reservationWrapper__container__reservationLabel">
                                                        Rezervacija {id}
                                                    </label>
                                                    {items.map(
                                                        (
                                                            {
                                                                id,
                                                                quantity,
                                                                description,
                                                                mealName,
                                                                mealImage,
                                                            }: IReservationItem,
                                                            index
                                                        ) => (
                                                            <ReservationItem
                                                                key={id}
                                                                quantity={
                                                                    quantity
                                                                }
                                                                mealName={
                                                                    mealName
                                                                }
                                                                description={
                                                                    description
                                                                }
                                                                mealImage={
                                                                    mealImage
                                                                }
                                                                index={index}
                                                                itemsLength={
                                                                    items.length
                                                                }
                                                            />
                                                        )
                                                    )}
                                                    <div className="myReservationsPage__colDiv__reservationWrapper__container__buttonWrapper">
                                                        <label className="myReservationsPage__colDiv__reservationWrapper__container__buttonWrapper__priceLabel">
                                                            {price} din
                                                        </label>
                                                        <RegularButton
                                                            content="Otkaži rezervaciju"
                                                            isActive
                                                            style={
                                                                'myReservationsPage__colDiv__reservationWrapper__container__buttonWrapper__cancelButton'
                                                            }
                                                            onClick={() => {
                                                                if (
                                                                    canCancelOrder(
                                                                        activeDate
                                                                    )
                                                                ) {
                                                                    return setShowDisabledReservation(
                                                                        true
                                                                    )
                                                                }
                                                                setConfirmationModalIsOpen(
                                                                    true
                                                                )
                                                                setReservationID(
                                                                    id
                                                                )
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        )
                                    ) : (
                                        <NoReservationsMessage />
                                    )}
                                </div>
                            ) : (
                                <NoReservationsMessage />
                            )}
                        </>
                    )}
                </div>

                {isMobile ? <MobileFooter /> : <Footer />}
            </div>
        </div>
    )
}

export default MyReservationsPage
