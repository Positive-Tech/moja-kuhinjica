import React from 'react'
import styles from './Label.module.scss'

interface ITitleProps {
    content: string
    style: string
}
export const Title = ({ content, style }: ITitleProps) => {
    return <label className={`${styles.title} ${style}`}>{content}</label>
}
