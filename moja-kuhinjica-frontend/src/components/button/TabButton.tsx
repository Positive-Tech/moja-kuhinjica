import React from 'react'
import styles from './TabButton.module.scss'

interface IDayButtonProps {
    active?: boolean
    onClick?: () => void
    content: string
    style?: string
}
export const TabButton = ({
    active,
    onClick,
    content,
    style,
}: IDayButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`${
                active ? styles.dayButtonSelected : styles.dayButton
            } ${style}`}
        >
            {content}
        </button>
    )
}
