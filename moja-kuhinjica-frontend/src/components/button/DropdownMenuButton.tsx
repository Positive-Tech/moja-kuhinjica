import React from 'react'
import Image from 'next/image'
import styles from './DropdownMenuButton.module.scss'
interface IDropdownButtonProps {
    content: string
    src: string
}
export const DropdownMenuButton = ({ content, src }: IDropdownButtonProps) => {
    return (
        <div className={styles.buttonWrapper}>
            <button className={styles.dropDownMenuButton}>{content}</button>
            <Image src={src} alt="" className={styles.icon} />
        </div>
    )
}
