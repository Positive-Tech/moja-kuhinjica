import React from 'react'
import styles from './HeaderButton.module.scss'

const HEADER_COLOR = 'red'
interface IHeaderButtonProps {
    active: boolean
    onClick: () => void
    content: string
    headerType: string
}
export const HeaderButton = ({
    active,
    onClick,
    content,
    headerType,
}: IHeaderButtonProps): JSX.Element => {
    return (
        <button
            className={
                active
                    ? headerType === HEADER_COLOR
                        ? styles.navButtonProfileSelected
                        : styles.navButtonSelected
                    : styles.navButton
            }
            onClick={onClick}
        >
            {content}
        </button>
    )
}
