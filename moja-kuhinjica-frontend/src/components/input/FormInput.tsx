import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form'
import styles from './FormInput.module.scss'
import errorIcon from '../../../public/static/assets/images/error.svg'
import hidePassword from '../../../public/static/assets/images/hidePassword.svg'
interface IFormInputProps {
    src: string
    placeholder: string
    type: string
    register: UseFormRegister<FieldValues>
    validationSchema: {}
    name: string
    errors: FieldErrors<FieldValues>
    style?: string
}

export const FormInput = ({
    src,
    placeholder,
    type,
    register,
    validationSchema,
    name,
    errors,
    style,
}: IFormInputProps) => {
    const [invalidInput, setInvalidInput] = useState(false)

    const isValid = () => {
        if (errors[name]?.message) {
            console.log(errors)
            setInvalidInput(true)
            return
        }
        setInvalidInput(false)
    }
    useEffect(() => {
        isValid()
    })

    return (
        <div className={styles.wrapper}>
            <Image src={src} className={styles.icon} alt="" />
            <input
                className={
                    invalidInput
                        ? `${styles.invalidInput} ${style}`
                        : `${styles.input} ${style}`
                }
                placeholder={placeholder}
                type={type}
                {...register(name, validationSchema)}
            ></input>
            {invalidInput && (
                <Image src={errorIcon} alt="" className={styles.sideIcon} />
            )}
            {type === 'password' && !invalidInput && (
                <Image src={hidePassword} alt="" className={styles.sideIcon} />
            )}
        </div>
    )
}
