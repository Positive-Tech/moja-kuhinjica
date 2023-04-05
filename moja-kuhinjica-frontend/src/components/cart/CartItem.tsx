import React from 'react'
import Image from 'next/image'
import { Text } from '../label/Text'
import { AmountButton } from '../button/AmountButton'
import styles from './CartItem.module.scss'
import bin from 'public/static/assets/images/bin.svg'
import { IMeal } from '@/service/Restaurant.service'
import { useAppDispatch, useAppSelector } from '@/utils/hooks'
import { removeCartItem } from '@/reduxStore/reducers/restaurantReducer'

const NIL_PRICE = 0
interface ICartItemPRops {
    meal: IMeal
}
export const CartItem = ({ meal }: ICartItemPRops): JSX.Element => {
    const dispatch = useAppDispatch()
    const amount = useAppSelector(
        ({ restaurant: { cartItems } }) =>
            cartItems.find((item) => item.meal.id === meal.id)?.quantity
    )
    const getTotalMealPrice = (): number =>
        amount ? meal.price * amount : NIL_PRICE

    return (
        <div className={styles.itemContainer}>
            <div className={styles.rowDiv1}>
                <div className={styles.pictureWrapper}>
                    <Image
                        src={meal.image}
                        alt=""
                        className={styles.mealPicture}
                        width="0"
                        height="0"
                        sizes="100vw"
                        style={{ width: '100%', height: '100%' }}
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
