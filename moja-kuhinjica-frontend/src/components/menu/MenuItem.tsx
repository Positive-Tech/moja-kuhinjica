import React, { useState } from 'react'
import Image from 'next/image'
import { RegularButton } from '../button/RegularButton'
import { Title } from '../label/Title'
import { Text } from '../label/Text'
import { AmountButton } from '../button/AmountButton'
import styles from './MenuItem.module.scss'
import pic from '../../../public/static/assets/images/meal1.png'

interface IMenuItemProps {
    type?: string
}
export const MenuItem = ({ type }: IMenuItemProps): JSX.Element => {
    const [openDescription, setOpenDescription] = useState(false)

    const isOrdering = (): boolean => type === 'ordering'

    return (
        <div className={isOrdering() ? styles.orderingWrapper : styles.wrapper}>
            <div>
                <Image src={pic} alt="" className={styles.restaurantPicture} />
            </div>
            <div className={styles.titleWrapper}>
                <Title
                    onClick={() => setOpenDescription(!openDescription)}
                    content="Piletina u sosu od šampinjona"
                    style={
                        isOrdering()
                            ? styles.orderingTitleLabel
                            : styles.titleLabel
                    }
                />
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
                    <Text
                        content="
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit. Donec odio. Quisque volutpat mattis eros"
                        style={
                            isOrdering()
                                ? styles.orderingDescriptionLabel
                                : styles.descriptionLabel
                        }
                    />
                </div>
            )}
            <div className={styles.priceWrapper}>
                <label
                    className={
                        isOrdering()
                            ? styles.orderingContentLabel
                            : styles.contentLabel
                    }
                >
                    meni 1 -
                </label>
                <label
                    className={
                        isOrdering()
                            ? styles.orderingPriceLabel
                            : styles.priceLabel
                    }
                >
                    560 din
                </label>
            </div>
            {isOrdering() && (
                <div className={styles.buttonContainer}>
                    <AmountButton />
                    <RegularButton content="Rezerviši" />
                </div>
            )}
        </div>
    )
}
