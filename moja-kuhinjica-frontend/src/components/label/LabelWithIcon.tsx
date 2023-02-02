import React from 'react'
import Image from 'next/image'
import styles from './Label.module.scss'

interface ILabelWithIconProps {
    src: string
    content: string
}
export const LabelWithIcon = ({ src, content }: ILabelWithIconProps) => {
    return (
        <div className={styles.container}>
            <Image src={src} alt="" />
            <label className={styles.text}>{content}</label>
        </div>
    )
}
