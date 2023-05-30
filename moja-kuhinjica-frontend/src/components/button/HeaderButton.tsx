import React from 'react'


const HEADER_COLOR = 'red'
interface IHeaderButtonProps {
    active: boolean
    onClick: () => void
    content: string
    headerType: string
}
export const HeaderButton = ({
    active,
    onClick,
    content,
    headerType,
}: IHeaderButtonProps): JSX.Element => {
    return (
        <button
            className={
                active
                    ? headerType === HEADER_COLOR
                        ? `navButton navButton--selectedProfile`
                        : `navButton navButton--selected`
                    : `navButton`
            }
            onClick={onClick}
        >
            {content}
        </button>
    )
}
