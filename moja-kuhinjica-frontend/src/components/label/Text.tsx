import React from 'react'
import { useTranslation } from 'react-i18next'

interface ITextProps {
    content: string
    style: string
    activeDate?: string
    handleClick?: () => void
}
export const Text = ({
    content,
    style,
    activeDate,
    handleClick,
}: ITextProps): JSX.Element => {
    const { t } = useTranslation()
    return (
        <label className={`$textLabel ${style}`} onClick={handleClick}>
            {t(content) as string}
        </label>
    )
}
