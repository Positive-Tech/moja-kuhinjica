import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface IErrorLabelProps {
    content: string | undefined
    style?: string
}

const COMAPRING_NUMBER = 4

export const ErrorLabel = ({
    content,
    style,
}: IErrorLabelProps): JSX.Element => {
    const { t } = useTranslation()
    const [beforeEmail, setBeforeEmail] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [afterEmail, setAfterEmail] = useState<string>('')
    const regex = /(.*) email (.*?) (.*?)$/

    useEffect(() => {
        const matches = content?.match(regex)
        if (matches?.length === COMAPRING_NUMBER) {
            setBeforeEmail(matches[1])
            setEmail(matches[2])
            setAfterEmail(matches[3])
        }
    }, [content])

    const errorMessage = email
        ? `${beforeEmail && t(beforeEmail)} ${email} ${
              afterEmail && t(afterEmail)
          }`
        : content || ''

    return <label className={`errorLabel ${style}`}>{errorMessage}</label>
}
