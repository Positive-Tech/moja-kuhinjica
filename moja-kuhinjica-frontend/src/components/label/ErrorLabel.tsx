import React, { useEffect, useState } from 'react'
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
    const [beforeEmail, setBeforeEmail] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [afterEmail, setAfterEmail] = useState<string>('')

    useEffect(() => {
        const regex = /(.*) email (.*?) (.*?)$/
        const matches = content?.match(regex)
        if (matches && matches.length === 4) {
            setBeforeEmail(matches[1])
            setEmail(matches[2])
            setAfterEmail(matches[3])
        }
    }, [content])

    let errorMessage = ''
    if (email) {
        errorMessage = `${beforeEmail && t(beforeEmail)} ${email} ${
            afterEmail && t(afterEmail)
        }`
    } else {
        errorMessage = content || ''
    }

    return <label className={`errorLabel ${style}`}>{errorMessage}</label>
}
