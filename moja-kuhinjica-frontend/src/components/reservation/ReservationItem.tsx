import React from 'react'
import Image from 'next/image'

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
                        width={500}
                        height={500}
                    />
                </div>
                <div className="reservationContainer__rowDiv__contentWrapper">
                    <label className="reservationContainer__rowDiv__contentWrapper__titleLabel">
                        {mealName}
                    </label>

                    <label className="reservationContainer__rowDiv__contentWrapper__contentLabel">
                        {quantity} porcija
                    </label>
                    <div className="reservationContainer__rowDiv__contentWrapper__buttonContainer">
                        <div className="reservationContainer__rowDiv__contentWrapper__buttonContainer__buttonWrapper">
                            {index === itemsLength - 1 && (
                                <button className="reservationContainer__rowDiv__contentWrapper__buttonContainer__buttonWrapper__cancelButton">
                                    Otkaži
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
