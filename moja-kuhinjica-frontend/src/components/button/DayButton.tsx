import React from 'react'
import styles from './DayButton.module.scss'

interface IDayButtonProps {
    active: number
    setActive: (param: number) => void
    buttonNumber: number
    content: string
}
export const DayButton = ({
    active,
    setActive,
    buttonNumber,
    content,
}: IDayButtonProps) => {
    return (
        <button
            onClick={() => setActive(buttonNumber)}
            className={
                active === buttonNumber
                    ? styles.dayButtonSelected
                    : styles.dayButton
            }
        >
            {content}
        </button>
    )
}
