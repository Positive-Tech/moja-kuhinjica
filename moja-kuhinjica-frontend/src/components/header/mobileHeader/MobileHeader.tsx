import React from 'react'
import Image from 'next/image'
import styles from './MobileHeader.module.scss'
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
        <div className={`${styles.container} ${style}`}>
            <Image
                src={src ? src : burgerMenuIcon}
                alt=""
                className={styles.burgerMenu}
                onClick={handleClick}
            />
            {showProfileIcon && (
                <div className={styles.pictureWrapper}>
                    <Image
                        src={profileIcon}
                        alt=""
                        className={styles.profile}
                    />
                </div>
            )}
        </div>
    )
}
