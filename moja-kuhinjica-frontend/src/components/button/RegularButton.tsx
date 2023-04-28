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
    style,
    isActive,
}: IRegularButtonProps): JSX.Element => {
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
            {isActive ? content : `Dodato u korpu`}
        </button>
    )
}
