import React from 'react'
import styles from './FormInput.module.scss'
import Image from 'next/image'

interface IFormInputProps {
    src: string
    content: string
    type: string
}

export const FormInput = (props: IFormInputProps) => {
    return (
        <div className={styles.wrapper}>
            <Image src={props.src} className={styles.icon} alt="" />
            <input
                className={styles.input}
                placeholder={props.content}
                type={props.type}
            ></input>
        </div>
    )
}
