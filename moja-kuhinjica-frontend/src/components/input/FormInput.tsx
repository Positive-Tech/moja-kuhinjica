import React from 'react'
import styles from './FormInput.module.scss'
import Image from 'next/image'

interface IFormInputProps {
    src: string
    placeholder: string
    type: string
}

export const FormInput = ({ src, placeholder, type }: IFormInputProps) => {
    return (
        <div className={styles.wrapper}>
            <Image src={src} className={styles.icon} alt="" />
            <input
                className={styles.input}
                placeholder={placeholder}
                type={type}
            ></input>
        </div>
    )
}
