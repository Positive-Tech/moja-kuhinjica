import React from 'react'
import Image from 'next/image'
import { Text } from '../label/Text'
import { AmountButton } from '../button/AmountButton'
import styles from './CartItem.module.scss'
import mealPic from '../../../public/static/assets/images/meal2.png'
import bin from '../../../public/static/assets/images/bin.svg'

interface ICartItemProps {
    item?: {
        name: string
        price: number
    }
}
export const CartItem = ({ item }: ICartItemProps): JSX.Element => {
    return (
        <div className={styles.itemContainer}>
            <div className={styles.rowDiv1}>
                <div className={styles.pictureWrapper}>
                    <Image
                        src={mealPic}
                        alt=""
                        className={styles.mealPicture}
                    />
                </div>
                <div className={styles.mealNameWrapper}>
                    <Text
                        content="Piletina sa šampinjonima"
                        style={styles.mealName}
                    />
                    <AmountButton
                        style={styles.amountWrapper}
                        labelStyle={styles.amountLabel}
                    />
                </div>
            </div>

            <div className={styles.priceWrapper}>
                <div className={styles.binWrapper}>
                    <Image src={bin} alt="" className={styles.binButton} />
                </div>
                <div className={styles.priceDiv}>
                    <Text content="560" style={styles.price} />
                    <Text content="RSD" style={styles.price} />
                </div>
            </div>
        </div>
    )
}
