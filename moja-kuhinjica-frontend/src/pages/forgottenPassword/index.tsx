import React, { useState } from 'react'
import Image from 'next/image'
import { useForm, FieldValues } from 'react-hook-form'
import { useRouter } from 'next/router'
import { FormInput } from '@/components/input/FormInput'
import { ErrorLabel } from '@/components/label/ErrorLabel'
import { Text } from '@/components/label/Text'
import styles from './PasswordForgettingPage.module.scss'
import back from 'public/static/assets/images/backArrow.svg'
import email from 'public/static/assets/images/email.svg'
import UserService from '@/service/User.service'

const PasswordForgettingPage = (): JSX.Element => {
    const [errorMessage, setErrorMessage] = useState<string>()
    const [showNotification, setShowNotification] = useState<boolean>(false)
    const [message, setMessage] = useState<string>()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const resetPassword = (data: FieldValues): void => {
        UserService.forgotPassword(data)
            .then((res) => {
                setMessage(res.data)
                setShowNotification(true)
                reset()
            })
            .catch((err) => {
                console.log(err)
                setShowNotification(false)
                setErrorMessage(err.response.data.message)
                reset()
                console.log(err)
            })
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Image src={back} alt="" onClick={() => router.back()} />
                <form
                    className={styles.formDiv}
                    onSubmit={handleSubmit((data) => resetPassword(data))}
                >
                    <label className={styles.formTitle}>
                        {showNotification
                            ? 'Proverite svoj email'
                            : 'Zaboravili ste šifru?'}
                    </label>
                    <Text
                        content={
                            showNotification
                                ? message
                                : 'Ne brinite, mi ćemo Vam poslati instrukcije za resetovanje.'
                        }
                        style={styles.infoLabel}
                    />
                    {!showNotification && errorMessage && (
                        <ErrorLabel content={errorMessage} />
                    )}
                    {!showNotification && (
                        <FormInput
                            register={register}
                            errors={errors}
                            name="email"
                            src={email}
                            placeholder="Email"
                            type="text"
                            validationSchema={{
                                required: 'email is required',
                                pattern: {
                                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                    message: 'invalid email value',
                                },
                            }}
                            style={styles.input}
                        />
                    )}
                    <div className={styles.buttonWrapper}>
                        <button className={styles.formButton}>
                            {showNotification
                                ? 'Otvori email'
                                : 'Resetuj šifru'}
                        </button>
                    </div>
                    {showNotification && (
                        <div className={styles.labelWrapper}>
                            <Text
                                content="Nije Vam stigao email?"
                                style={styles.infoLabel}
                            />
                            <Text
                                content="Pošalji ponovo"
                                style={styles.buttonLabel}
                            />
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default PasswordForgettingPage
