import React from 'react'
import styles from './HeaderButton.module.scss'

interface IHeaderButtonProps {
    active: number
    setActive: (param: number) => void
    buttonNumber: number
    content: string
}
export const HeaderButton = ({
    active,
    setActive,
    buttonNumber,
    content,
}: IHeaderButtonProps) => {
    return (
        <button
            className={
                active === buttonNumber
                    ? styles.navButtonSelected
                    : styles.navButton
            }
            onClick={() => setActive(buttonNumber)}
        >
            {content}
        </button>
    )
}
