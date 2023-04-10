import React from 'react'

interface IRegularButtonProps {
    onClick?: () => void
    content: string
    style?: string
    isActive: boolean | undefined
}
export const RegularButton = ({
    content,
    onClick,
    isActive,
}: IRegularButtonProps): JSX.Element => {
    return (
        <button
            onClick={onClick}
            className={
                isActive
                    ? `regularButton`
                    : `regularButton regularButton--disabled`
            }
            disabled={!isActive}
        >
            {isActive ? content : `Dodato u korpu`}
        </button>
    )
}
