import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form'
import errorIcon from 'public/static/assets/images/error.svg'
import hidePassword from 'public/static/assets/images/hidePassword.svg'
import editIcon from 'public/static/assets/images/editIcon.svg'
import { ErrorLabel } from '../label/ErrorLabel'
import { useTranslation } from 'react-i18next'
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
    const { t } = useTranslation()
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
        <>
            <div className="formInputWrapper">
                <Image src={src} className="formInputWrapper__icon" alt="" />
                {isPhoneNumber && (
                    <label className="formInputWrapper__numberFormat">
                        +381
                    </label>
                )}
                <input
                    className={
                        invalidInput
                            ? `${
                                  isPhoneNumber
                                      ? 'formInputWrapper__invalidInput formInputWrapper__invalidInput--phoneNumber'
                                      : 'formInputWrapper__invalidInput'
                              } ${style}`
                            : `${
                                  isPhoneNumber
                                      ? 'formInputWrapper__input formInputWrapper__input--phoneNumber'
                                      : 'formInputWrapper__input'
                              } ${style}`
                    }
                    placeholder={placeholder}
                    type={inputType}
                    defaultValue={defaultValue}
                    {...rest}
                    accept="text/plain"
                    ref={(e) => {
                        ref(e)
                        inputRef.current = e
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
                        className="formInputWrapper__sideErrorIcon"
                    />
                )}
                {isEditable && !invalidInput && (
                    <Image
                        src={editIcon}
                        alt=""
                        className="formInputWrapper__sideEditIcon"
                        onClick={() => handleClick()}
                    />
                )}
                {type === 'password' && !invalidInput && (
                    <Image
                        src={hidePassword}
                        alt=""
                        className="formInputWrapper__sideEditIcon"
                        onClick={() =>
                            setInputType(
                                inputType === 'password' ? 'text' : 'password'
                            )
                        }
                    />
                )}
            </div>
            {invalidInput && (
                <ErrorLabel
                    content={errors[name]?.message?.toString()}
                    style="formInputWrapper__errorLabel"
                />
            )}
        </>
    )
}
