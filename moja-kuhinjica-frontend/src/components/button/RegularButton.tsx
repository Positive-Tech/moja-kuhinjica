import React from 'react'
import styles from './RegularButton.module.scss'

interface IRegularButtonProps {
    onClick?: () => void
    content: string
}
export const RegularButton = ({ content, onClick }: IRegularButtonProps) => {
    return (
        <button onClick={onClick} className={styles.button}>
            {content}
        </button>
    )
}
