import React from 'react'
import styles from './Label.module.scss'

interface ITitleProps {
    content: string
    style: string
    onClick?: () => void
}
export const Title = ({
    content,
    style,
    onClick,
}: ITitleProps): JSX.Element => {
    return (
        <label onClick={onClick} className={`titleLabel ${style}`}>
            {content}
        </label>
    )
}
