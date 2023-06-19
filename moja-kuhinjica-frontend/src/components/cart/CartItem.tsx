import React from 'react'
import Image from 'next/image'
import { Text } from '../label/Text'
import { AmountButton } from '../button/AmountButton'
import bin from 'public/static/assets/images/bin.svg'
import { IMeal } from '@/service/Restaurant.service'
import { useAppDispatch, useAppSelector } from '@/utils/hooks'
import { removeCartItem } from '@/reduxStore/reducers/restaurantReducer'
import { useTranslation } from 'react-i18next'
import mealDefault from 'public/static/assets/images/mealDefault.svg'

const NIL_PRICE = 0
interface ICartItemPRops {
    meal: IMeal
}
export const CartItem = ({ meal }: ICartItemPRops): JSX.Element => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()
    const amount = useAppSelector(
        ({ restaurant: { cartItems } }) =>
            cartItems.find((item) => item.meal.id === meal.id)?.quantity
    )
    const getTotalMealPrice = (): number =>
        amount ? meal.price * amount : NIL_PRICE

    return (
        <div className="itemContainer">
            <div className="itemContainer__rowDiv1">
                <div className="itemContainer__rowDiv1__pictureWrapper">
                    <Image
                        src={meal.image || mealDefault}
                        alt=""
                        className="itemContainer__rowDiv1__pictureWrapper__mealPicture"
                        width="0"
                        height="0"
                        sizes="100vw"
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
                <div className="itemContainer__mealNameWrapper">
                    <Text
                        content={t(meal.title)}
                        style="itemContainer__mealNameWrapper__mealName"
                    />
                    <AmountButton
                        style="itemContainer__amountWrapper"
                        labelStyle="itemContainer__amountLabel"
                        meal={meal}
                    />
                </div>
            </div>

            <div className="itemContainer__priceWrapper">
                <div className="itemContainer__priceWrapper__binWrapper">
                    <Image
                        src={bin}
                        alt=""
                        className="itemContainer__priceWrapper__binWrapper__binButton"
                        onClick={() => dispatch(removeCartItem(meal))}
                    />
                </div>
                <div className="itemContainer__priceWrapper__binWrapper__priceDiv">
                    <Text
                        content={getTotalMealPrice().toString()}
                        style="itemContainer__priceWrapper__binWrapper__priceDiv__price"
                    />
                    <Text
                        content="RSD"
                        style="itemContainer__priceWrapper__binWrapper__priceDiv__price"
                    />
                </div>
            </div>
        </div>
    )
}
