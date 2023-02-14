import React from 'react'
import Image from 'next/image'
import styles from './AmountButton.module.scss'
import increment from '../../../public/static/assets/images/increment.svg'
import decrement from '../../../public/static/assets/images/decrement.svg'

interface IAmountButtonProps {
    style?: string
    labelStyle?: string
}
export const AmountButton = ({
    style,
    labelStyle,
}: IAmountButtonProps): JSX.Element => {
    return (
        <div className={`${styles.amountWrapper} ${style}`}>
            <Image src={decrement} alt="" className={styles.button} />
            <label className={`${styles.contentLabel} ${labelStyle}`}>1</label>
            <Image src={increment} alt="" className={styles.button} />
        </div>
    )
}
