import React from 'react'
import styles from './RegularButton.module.scss'

interface IRegularButtonProps {
    onClick?: () => void
    content: string
    style?: string
}
export const RegularButton = ({
    content,
    onClick,
    style,
}: IRegularButtonProps): JSX.Element => {
    return (
        <button onClick={onClick} className={`${styles.button} ${style}`}>
            {content}
        </button>
    )
}
