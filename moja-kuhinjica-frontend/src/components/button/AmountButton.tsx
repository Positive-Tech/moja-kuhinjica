import React, { useState } from 'react'
import Image from 'next/image'
import increment from 'public/static/assets/images/increment.svg'
import decrement from 'public/static/assets/images/decrement.svg'
import styles from './AmountButton.module.scss'
import { useAppDispatch } from '@/utils/hooks'
import { changeMealAmount } from '@/reduxStore/reducers/restaurantReducer'
import { IMeal } from '@/service/Restaurant.service'

interface IAmountButtonProps {
    style?: string
    labelStyle?: string
    meal: IMeal
}
export const AmountButton = ({
    style,
    labelStyle,
    meal,
}: IAmountButtonProps): JSX.Element => {
    const [amount, setAmount] = useState<number>(1)
    const dispatch = useAppDispatch()

    return (
        <div className={`${styles.amountWrapper} ${style}`}>
            <Image
                src={decrement}
                alt=""
                className={styles.button}
                onClick={() => {
                    if (amount > 1) {
                        dispatch(changeMealAmount({ meal, amount: -1 }))
                        setAmount(amount - 1)
                    }
                }}
            />
            <label className={`${styles.contentLabel} ${labelStyle}`}>
                {amount}
            </label>
            <Image
                src={increment}
                alt=""
                className={styles.button}
                onClick={() => {
                    dispatch(changeMealAmount({ meal, amount: 1 }))
                    setAmount(amount + 1)
                }}
            />
        </div>
    )
}
