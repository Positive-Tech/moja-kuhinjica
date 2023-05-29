import React from 'react'
import { useTranslation } from 'react-i18next'

interface IErrorLabelProps {
    content: string | undefined
    style?: string
}
export const ErrorLabel = ({
    content,
    style,
}: IErrorLabelProps): JSX.Element => {
    const { t } = useTranslation()
    return <label className={`errorLabel ${style}`}>{content}</label>
}
 