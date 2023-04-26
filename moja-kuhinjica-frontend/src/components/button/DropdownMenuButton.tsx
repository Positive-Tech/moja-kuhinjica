import React from 'react'
import Image from 'next/image'

interface IDropdownButtonProps {
    content: string
    src: string
    style?: string
    handleClick?: () => void
}
export const DropdownMenuButton = ({
    content,
    src,
    style,
    handleClick,
}: IDropdownButtonProps): JSX.Element => {
    return (
        <div className="buttonWrapper">
            <button
                onClick={handleClick}
                className={`dropDownMenuButton ${style}`}
            >
                {content}
            </button>
            <Image src={src} alt="" className="dropdownIcon" />
        </div>
    )
}
