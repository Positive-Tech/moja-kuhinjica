import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

const IMAGE_SIZE = 500

interface IReservationItemProps {
    itemsLength: number
    index: number
    quantity: number
    mealName: string
    description: string
    mealImage: string
}

export const ReservationItem = ({
    itemsLength,
    index,
    description,
    quantity,
    mealName,
    mealImage,
}: IReservationItemProps): JSX.Element => {
    const { t } = useTranslation()
    return (
        <div className="reservationContainer">
            <div className="reservationContainer__rowDiv">
                <div className="reservationContainer__rowDiv__pictureWrapper">
                    <Image
                        src={mealImage}
                        alt=""
                        className="reservationContainer__rowDiv__pictureWrapper__mealPicture"
                        width={IMAGE_SIZE}
                        height={IMAGE_SIZE}
                    />
                </div>
                <div className="reservationContainer__rowDiv__contentWrapper">
                    <label className="reservationContainer__rowDiv__contentWrapper__titleLabel">
                        {mealName}
                    </label>
                    <label className="reservationContainer__rowDiv__contentWrapper__contentLabel">
                        {t(description)}
                    </label>
                    <label className="reservationContainer__rowDiv__contentWrapper__contentLabel">
                        {quantity} {t('porcija')}
                    </label>
                </div>
            </div>
        </div>
    )
}
