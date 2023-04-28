import React from 'react'

interface IHeaderButtonProps {
    content: string
    onClick: () => void
}
export const HomePageButton = ({
    content,
    onClick,
}: IHeaderButtonProps): JSX.Element => {
    return (
        <button className="homeBtn" onClick={onClick}>
            {content}
        </button>
    )
}
