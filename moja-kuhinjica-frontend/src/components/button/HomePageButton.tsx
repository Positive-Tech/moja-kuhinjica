import React from 'react'
import styles from './HomePageButton.module.scss'

interface IHeaderButtonProps {
    content: string
    onClick: () => void
}
export const HomePageButton = ({
    content,
    onClick,
}: IHeaderButtonProps): JSX.Element => {
    return (
        <button className={styles.button} onClick={onClick}>
            {content}
        </button>
    )
}
