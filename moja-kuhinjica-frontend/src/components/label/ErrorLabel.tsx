import React from 'react'

interface IErrorLabelProps {
    content: string | undefined
    style?: string
}
export const ErrorLabel = ({
    content,
    style,
}: IErrorLabelProps): JSX.Element => {
    return <label className={`errorLabel ${style}`}>{content}</label>
}
