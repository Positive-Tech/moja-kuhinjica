import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form'
import styles from './FormInput.module.scss'
import errorIcon from 'public/static/assets/images/error.svg'
import hidePassword from 'public/static/assets/images/hidePassword.svg'
import editIcon from 'public/static/assets/images/editIcon.svg'
interface IFormInputProps {
    src: string
    placeholder: string
    type: string
    register: UseFormRegister<FieldValues>
    validationSchema: {}
    name: string
    errors: FieldErrors<FieldValues>
    style?: string
    isPhoneNumber?: boolean
    defaultValue?: string
    isEditable?: boolean
    handleEditClick?: () => void
    handleOnBlur?: () => void
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
    isPhoneNumber,
    isEditable,
    defaultValue,
    handleEditClick,
    handleOnBlur,
}: IFormInputProps): JSX.Element => {
    const [invalidInput, setInvalidInput] = useState(false)
    const [inputType, setInputType] = useState(type)
    const { ref, ...rest } = register(name, validationSchema)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const isValid = (): void => {
        if (errors[name]?.message) {
            setInvalidInput(true)
            return
        }
        setInvalidInput(false)
    }
    useEffect(() => {
        isValid()
    })

    const handleClick = (): void => {
        handleEditClick?.()
        inputRef.current?.focus()
    }

    return (
        <div className={styles.wrapper}>
            <Image src={src} className={styles.icon} alt="" />
            {isPhoneNumber && (
                <label className={styles.numberFormat}>+381</label>
            )}
            <input
                className={
                    invalidInput
                        ? `${
                              isPhoneNumber
                                  ? styles.phoneNumberInvalidInput
                                  : styles.invalidInput
                          } ${style}`
                        : `${
                              isPhoneNumber
                                  ? styles.phoneNumberInput
                                  : styles.input
                          } ${style}`
                }
                placeholder={placeholder}
                type={inputType}
                defaultValue={defaultValue}
                {...rest}
                ref={(e) => {
                    ref(e)
                    inputRef.current = e // we can still assign to ref
                }}
                onFocus={(e) => {
                    if (type === 'number') {
                        e.currentTarget.type = 'text'
                        e.currentTarget.setSelectionRange(
                            e.currentTarget.value.length,
                            e.currentTarget.value.length
                        )
                        e.currentTarget.type = 'number'
                    } else {
                        e.currentTarget.setSelectionRange(
                            e.currentTarget.value.length,
                            e.currentTarget.value.length
                        )
                    }
                }}
                onBlur={() => handleOnBlur?.()}
            ></input>
            {invalidInput && (
                <Image
                    src={errorIcon}
                    alt=""
                    className={styles.sideErrorIcon}
                />
            )}
            {isEditable && !invalidInput && (
                <Image
                    src={editIcon}
                    alt=""
                    className={styles.sideEditIcon}
                    onClick={() => handleClick()}
                />
            )}
            {type === 'password' && !invalidInput && (
                <Image
                    src={hidePassword}
                    alt=""
                    className={styles.sideEditIcon}
                    onClick={() =>
                        setInputType(
                            inputType === 'password' ? 'text' : 'password'
                        )
                    }
                />
            )}
        </div>
    )
}
