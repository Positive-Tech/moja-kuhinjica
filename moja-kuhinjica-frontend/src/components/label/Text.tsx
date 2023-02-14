import React from 'react'
import styles from './Label.module.scss'

interface ITextProps {
    content: string
    style: string
}
export const Text = ({ content, style }: ITextProps): JSX.Element => {
    return <label className={`${styles.text} ${style}`}>{content}</label>
}
