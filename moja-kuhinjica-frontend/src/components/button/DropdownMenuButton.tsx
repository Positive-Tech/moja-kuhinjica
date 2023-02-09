import React from 'react'
import Image from 'next/image'
import styles from './DropdownMenuButton.module.scss'
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
}: IDropdownButtonProps) => {
    return (
        <div className={styles.buttonWrapper}>
            <button
                onClick={handleClick}
                className={`${styles.dropDownMenuButton} ${style}`}
            >
                {content}
            </button>
            <Image src={src} alt="" className={styles.icon} />
        </div>
    )
}
