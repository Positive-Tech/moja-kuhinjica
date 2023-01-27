import React, { useState } from 'react'
import Image from 'next/image'
import pic from '../../../public/static/assets/images/meal1.png'
import styles from './MenuItem.module.scss'

export const MenuItem = () => {
    const [openDescription, setOpenDescription] = useState(false)

    return (
        <div className={styles.wrapper}>
            <Image src={pic} alt="" />
            <div className={styles.titleWrapper}>
                <label className={styles.titleLabel}>
                    Piletina u sosu od šampinjona
                </label>
                <svg
                    className={
                        openDescription
                            ? styles.svgSeparatorRotated
                            : styles.svgSeparator
                    }
                    onClick={() => setOpenDescription(!openDescription)}
                    width="19"
                    height="19"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M6.29289 2.29289C6.68342 1.90237 7.31658 1.90237 7.70711 2.29289L14.0404 8.62623C14.431 9.01675 14.431 9.64992 14.0404 10.0404L7.70711 16.3738C7.31658 16.7643 6.68342 16.7643 6.29289 16.3738C5.90237 15.9832 5.90237 15.3501 6.29289 14.9596L11.9191 9.33333L6.29289 3.70711C5.90237 3.31658 5.90237 2.68342 6.29289 2.29289Z" />
                </svg>
            </div>
            {openDescription && (
                <div className={styles.descriptionLabelDiv}>
                    <label className={styles.descriptionLabel}>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit. Donec odio. Quisque volutpat mattis eros
                    </label>
                </div>
            )}
            <div className={styles.priceWrapper}>
                <label className={styles.contentLabel}>meni 1 -</label>
                <label className={styles.priceLabel}>560 din</label>
            </div>
        </div>
    )
}
