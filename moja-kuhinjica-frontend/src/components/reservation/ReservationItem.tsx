import React from 'react'
import Image from 'next/image'
import styles from './ReservationItem.module.scss'
import meal1 from '../../../public/static/assets/images/meal1.png'
import { RegularButton } from '../button/RegularButton'

export const ReservationItem = () => {
    return (
        <div className={styles.container}>
            <div className={styles.rowDiv}>
                <div className={styles.pictureWrapper}>
                    <Image src={meal1} alt="" className={styles.mealPicture} />
                </div>
                <div className={styles.contentWrapper}>
                    <label className={styles.titleLabel}>
                        Pasulj sa kobasicom
                    </label>
                    <label className={styles.contentLabel}>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit. Donec odio. Quisque volutpat mattis eros.Lorem
                        ipsum dolor sit amet, consectetuer adipiscing elit.
                        Donec odio. Quisque volutpat mattis eros
                    </label>
                    <label className={styles.contentLabel}>1 porcija</label>
                    <div className={styles.buttonContainer}>
                        <div className={styles.buttonWrapper}>
                            <label className={styles.priceLabel}>560 din</label>
                            <button className={styles.cancelButton}>
                                Otkaži rezervaciju
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
