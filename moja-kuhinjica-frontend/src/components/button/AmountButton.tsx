import React, { useState } from 'react'
import Image from 'next/image'
import increment from 'public/static/assets/images/increment.svg'
import decrement from 'public/static/assets/images/decrement.svg'
import styles from './AmountButton.module.scss'

interface IAmountButtonProps {
    style?: string
    labelStyle?: string
}
export const AmountButton = ({
    style,
    labelStyle,
}: IAmountButtonProps): JSX.Element => {
    const [amount, setAmount] = useState<number>(0)
    return (
        <div className={`${styles.amountWrapper} ${style}`}>
            <Image
                src={decrement}
                alt=""
                className={styles.button}
                onClick={() => {
                    if (amount > 0) setAmount(amount - 1)
                }}
            />
            <label className={`${styles.contentLabel} ${labelStyle}`}>
                {amount}
            </label>
            <Image
                src={increment}
                alt=""
                className={styles.button}
                onClick={() => setAmount(amount + 1)}
            />
        </div>
    )
}
