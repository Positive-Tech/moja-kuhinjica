import React, { useState } from 'react'
import Image from 'next/image'
import { Text } from '../label/Text'
import { AmountButton } from '../button/AmountButton'
import styles from './CartItem.module.scss'
import mealPic from 'public/static/assets/images/meal2.png'
import bin from 'public/static/assets/images/bin.svg'
import { IMeal } from '@/service/Restaurant.service'
import { useAppDispatch, useAppSelector } from '@/utils/hooks'
import { removeCartItem } from '@/reduxStore/reducers/restaurantReducer'
interface ICartItemPRops {
    meal: IMeal
}
export const CartItem = ({ meal }: ICartItemPRops): JSX.Element => {
    const dispatch = useAppDispatch()
    const amount = useAppSelector(
        (state) =>
            state.restaurant.cartItems.find((item) => item.meal.id == meal.id)
                ?.amount
    )
    const getTotalMealPrice = (): number => {
        let totalPrice = 0
        if (amount) totalPrice = meal.price * amount
        return totalPrice
    }
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
                    <Text content={meal.title} style={styles.mealName} />
                    <AmountButton
                        style={styles.amountWrapper}
                        labelStyle={styles.amountLabel}
                        meal={meal}
                    />
                </div>
            </div>

            <div className={styles.priceWrapper}>
                <div className={styles.binWrapper}>
                    <Image
                        src={bin}
                        alt=""
                        className={styles.binButton}
                        onClick={() => dispatch(removeCartItem(meal))}
                    />
                </div>
                <div className={styles.priceDiv}>
                    <Text
                        content={getTotalMealPrice().toString()}
                        style={styles.price}
                    />
                    <Text content="RSD" style={styles.price} />
                </div>
            </div>
        </div>
    )
}
