import React from 'react'
import Image from 'next/image'
import meal1 from 'public/static/assets/images/meal1.png'

export const ReservationItem = (): JSX.Element => {
    return (
        <div className="reservationContainer">
            <div className="reservationContainer__rowDiv">
                <div className="reservationContainer__rowDiv__pictureWrapper">
                    <Image
                        src={meal1}
                        alt=""
                        className="reservationContainer__rowDiv__pictureWrapper__mealPicture"
                    />
                </div>
                <div className="reservationContainer__rowDiv__contentWrapper">
                    <label className="reservationContainer__rowDiv__contentWrapper__titleLabel">
                        Pasulj sa kobasicom
                    </label>
                    <label className="reservationContainer__rowDiv__contentWrapper__contentLabel">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit. Donec odio. Quisque volutpat mattis eros.
                    </label>
                    <label className="reservationContainer__rowDiv__contentWrapper__contentLabel">
                        1 porcija
                    </label>
                    <div className="reservationContainer__rowDiv__contentWrapper__buttonContainer">
                        <div className="reservationContainer__rowDiv__contentWrapper__buttonContainer__buttonWrapper">
                            <label className="reservationContainer__rowDiv__contentWrapper__buttonContainer__buttonWrapper__priceLabel">
                                560 din
                            </label>
                            <button className="reservationContainer__rowDiv__contentWrapper__buttonContainer__buttonWrapper__cancelButton">
                                Otkaži
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
