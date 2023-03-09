import React, { useState } from 'react'
import Image from 'next/image'
import increment from 'public/static/assets/images/increment.svg'
import decrement from 'public/static/assets/images/decrement.svg'
import styles from './AmountButton.module.scss'

interface IAmountButtonProps {
    style?: string
    labelStyle?: string
    setAmountInItem?: (param: number) => void
}
export const AmountButton = ({
    style,
    labelStyle,
    setAmountInItem,
}: IAmountButtonProps): JSX.Element => {
    const [amount, setAmount] = useState<number>(0)
    return (
        <div className={`${styles.amountWrapper} ${style}`}>
            <Image
                src={decrement}
                alt=""
                className={styles.button}
                onClick={() => {
                    if (amount > 0) {
                        setAmountInItem?.(amount - 1)
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
                    setAmountInItem?.(amount + 1)
                    setAmount(amount + 1)
                }}
            />
        </div>
    )
}
