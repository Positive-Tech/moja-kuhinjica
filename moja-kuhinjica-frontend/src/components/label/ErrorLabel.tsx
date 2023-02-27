import React from 'react'
import styles from './Label.module.scss'

interface IErrorLabelProps {
    content: string
    style?: string
}
export const ErrorLabel = ({
    content,
    style,
}: IErrorLabelProps): JSX.Element => {
    return <label className={`${styles.errorLabel} ${style}`}>{content}</label>
}
