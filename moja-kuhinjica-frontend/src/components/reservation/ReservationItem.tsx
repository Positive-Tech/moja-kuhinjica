import React from 'react'
import Image from 'next/image'
import styles from './ReservationItem.module.scss'

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
    mealImage
}: IReservationItemProps): JSX.Element => {
    return (
        <div className={styles.container}>
            <div className={styles.rowDiv}>
                <div className={styles.pictureWrapper}>
                    <Image
                        src={mealImage}
                        alt=""
                        className={styles.mealPicture}
                        width={500}
                        height={500}
                    />
                </div>
                <div className={styles.contentWrapper}>
                    <label className={styles.titleLabel}>{mealName}</label>
                    <label className={styles.contentLabel}>
                        {quantity} porcija
                    </label>
                </div>
            </div>
        </div>
    )
}
