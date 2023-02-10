import React from 'react'
import Image from 'next/image'
import styles from './MobileHeader.module.scss'
import burgerMenuIcon from '../../../../public/static/assets/images/burgerMenuRed.svg'
import profileIcon from '../../../../public/static/assets/images/profileHeader.svg'
interface IMobileHeaderProps {
    handleClick: () => void
}
export const MobileHeader = ({ handleClick }: IMobileHeaderProps) => {
    return (
        <div className={styles.container}>
            <Image
                src={burgerMenuIcon}
                alt=""
                className={styles.burgerMenu}
                onClick={handleClick}
            />
            <div className={styles.pictureWrapper}>
                <Image src={profileIcon} alt="" className={styles.profile} />
            </div>
        </div>
    )
}
