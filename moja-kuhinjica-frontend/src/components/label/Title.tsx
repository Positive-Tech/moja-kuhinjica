import React from 'react'
import styles from './Label.module.scss'

interface ITitleProps {
    content: string
    style: string
    onClick?: () => void
}
export const Title = ({ content, style, onClick }: ITitleProps) => {
    return (
        <label onClick={onClick} className={`${styles.title} ${style}`}>
            {content}
        </label>
    )
}
