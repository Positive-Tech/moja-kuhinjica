import React from 'react'
import styles from './Label.module.scss'

interface ITextProps {
    content: string | undefined
    style: string
    handleClick?: () => void
}
export const Text = ({
    content,
    style,
    handleClick,
}: ITextProps): JSX.Element => {
    return (
        <label className={`${styles.text} ${style}`} onClick={handleClick}>
            {content}
        </label>
    )
}
