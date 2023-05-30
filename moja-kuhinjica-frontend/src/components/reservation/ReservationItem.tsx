import React from 'react'
import Image from 'next/image'

const IMAGE_SIZE = 500

interface IReservationItemProps {
    itemsLength: number
    index: number
    quantity: number
    mealName: string
    mealImage: string
}

export const ReservationItem = ({
    itemsLength,
    index,
    quantity,
    mealName,
    mealImage,
}: IReservationItemProps): JSX.Element => {
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
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit. Donec odio. Quisque volutpat mattis eros.
                    </label>
                    <label className="reservationContainer__rowDiv__contentWrapper__contentLabel">
                        {quantity} porcija
                    </label>
                </div>
            </div>
        </div>
    )
}
