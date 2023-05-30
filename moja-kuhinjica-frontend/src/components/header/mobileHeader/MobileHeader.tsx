import React from 'react'
import Image from 'next/image'
import burgerMenuIcon from 'public/static/assets/images/burgerMenuRed.svg'
import profileIcon from 'public/static/assets/images/profileHeader.svg'
interface IMobileHeaderProps {
    handleClick: () => void
    style?: string
    src?: string
    showProfileIcon?: boolean
}
export const MobileHeader = ({
    handleClick,
    showProfileIcon,
    style,
    src,
}: IMobileHeaderProps): JSX.Element => {
    return (
        <div className={`mobileHeaderContainer ${style}`}>
            <Image
                src={src ? src : burgerMenuIcon}
                alt=""
                className="mobileHeaderContainer__burgerMenu"
                onClick={handleClick}
            />
            {showProfileIcon && (
                <div className="mobileHeaderContainer__pictureWrapper">
                    <Image
                        src={profileIcon}
                        alt=""
                        className="mobileHeaderContainer__pictureWrapper__profile"
                    />
                </div>
            )}
        </div>
    )
}
