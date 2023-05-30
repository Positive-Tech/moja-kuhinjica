import React from 'react'

interface IDayButtonProps {
    active?: boolean
    onClick?: () => void
    content: string
    style?: string
}
export const TabButton = ({
    active,
    onClick,
    content,
    style,
}: IDayButtonProps): JSX.Element => {
    return (
        <button
            onClick={onClick}
            className={`${
                active ? `dayButton dayButton--selected` : `dayButton`
            } ${style}`}
        >
            {content}
        </button>
    )
}
