import React from 'react'
import { useTranslation } from 'react-i18next'

interface IRegularButtonProps {
    onClick?: () => void
    content: string
    style?: string
    isActive: boolean | undefined
}
export const RegularButton = ({
    content,
    onClick,
    style,
    isActive,
}: IRegularButtonProps): JSX.Element => {
    const { t } = useTranslation()
    return (
        <button
            onClick={onClick}
            className={
                isActive
                    ? `regularButton ${style}`
                    : ` regularButton regularButton--disabled ${style}`
            }
            disabled={!isActive}
        >
            {isActive ? content : t("Dodato u korpu")}
        </button>
    )
}
