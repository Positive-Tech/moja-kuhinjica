import React from 'react'

interface ITitleProps {
    content: string
    style: string
    onClick?: () => void
}
export const Title = ({
    content,
    style,
    onClick,
}: ITitleProps): JSX.Element => {
    return (
        <label onClick={onClick} className={`titleLabel ${style}`}>
            {content}
        </label>
    )
}
