import React from 'react'
import styles from './HeaderButton.module.scss'

interface IHeaderButtonProps {
    active: boolean
    onClick: () => void
    content: string
}
export const HeaderButton = ({
    active,
    onClick,
    content,
}: IHeaderButtonProps) => {
    return (
        <button
            className={active ? styles.navButtonSelected : styles.navButton}
            onClick={onClick}
        >
            {content}
        </button>
    )
}
