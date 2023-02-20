import React, { useState } from 'react'
import Image from 'next/image'
import { useForm, FieldValues } from 'react-hook-form'
import { FormInput } from '@/components/input/FormInput'
import { useRouter } from 'next/router'
import { ErrorLabel } from '@/components/label/ErrorLabel'
import UserService from '@/service/User.service'
import styles from './RegistrationPage.module.scss'
import back from 'public/static/assets/images/backArrow.svg'
import profile from 'public/static/assets/images/profile.svg'
import email from 'public/static/assets/images/email.svg'
import password from 'public/static/assets/images/password.svg'
import mobile from 'public/static/assets/images/mobile.svg'
import successFilled from 'public/static/assets/images/successFilled.svg'
import success from 'public/static/assets/images/success.svg'

const RegistrationPage = (): JSX.Element => {
    const [showError, setShowError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [showNotification, setShowNotification] = useState<boolean>(false)
    const [userEmail, setUserEmail] = useState<string>('')
    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const signIn = (inputData: FieldValues): void => {
        console.log(inputData)
        const res = UserService.signIn(inputData)
            .then((res) => {
                setUserEmail(inputData.email)
                setShowNotification(true)
                reset()
            })
            .catch((err) => {
                setErrorMessage(err.message)
                setShowError(true)
                console.log(err)
            })
    }

    const validate = (data: FieldValues): void => {
        if (data.password === data.confirmPassword) {
            delete data.confirmPassword
            data.phoneNumber = '+381' + data.phoneNumber
            setShowError(false)
            signIn(data)
        } else {
            setErrorMessage('Šifre se ne poklapaju. Pokušajte ponovo.')
            setShowError(true)
        }
    }

    return (
        <div className={styles.container}>
            {!showNotification && (
                <div className={styles.wrapper}>
                    <Image src={back} alt="" onClick={() => router.back()} />
                    <form
                        className={styles.formDiv}
                        onSubmit={handleSubmit((data) => validate(data))}
                    >
                        <label className={styles.formTitle}>
                            Registrujte se
                        </label>
                        {showError && <ErrorLabel content={errorMessage} />}

                        <FormInput
                            register={register}
                            errors={errors}
                            name="name"
                            src={profile}
                            placeholder="Ime"
                            type="text"
                            validationSchema={{
                                required: 'name is required',
                                pattern: {
                                    value: /[A-Za-z]/,
                                    message: 'invalid name value',
                                },
                            }}
                            style={styles.input}
                        />
                        <FormInput
                            register={register}
                            errors={errors}
                            name="surname"
                            src={profile}
                            placeholder="Prezime"
                            type="text"
                            validationSchema={{
                                required: 'surname is required',
                                pattern: {
                                    value: /[A-Za-z]/,
                                    message: 'invalid surname value',
                                },
                            }}
                            style={styles.input}
                        />
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
                        <FormInput
                            register={register}
                            errors={errors}
                            name="password"
                            src={password}
                            placeholder="Šifra"
                            type="password"
                            validationSchema={{
                                required: 'password is required',
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    message: 'invalid password value',
                                },
                            }}
                            style={styles.input}
                        />
                        <FormInput
                            register={register}
                            errors={errors}
                            name="confirmPassword"
                            src={password}
                            placeholder="Potvrdi šifru"
                            type="password"
                            validationSchema={{
                                required: 'confirmed password is required',
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    message: 'invalid confirmed password value',
                                },
                            }}
                            style={styles.input}
                        />
                        <FormInput
                            register={register}
                            errors={errors}
                            name="phoneNumber"
                            src={mobile}
                            placeholder=""
                            type="text"
                            validationSchema={{
                                required: 'telephone number is required',
                                pattern: {
                                    value: /^[0-9]{6,}$/,
                                    message: 'invalid telephone number value',
                                },
                            }}
                            style={styles.input}
                            isPhoneNumber={true}
                        />
                        <button className={styles.formButton}>Potvrdi</button>
                    </form>
                </div>
            )}
            {showNotification && (
                <div className={styles.notificationContainer}>
                    <div className={styles.notificationDiv}>
                        <Image src={successFilled} alt="" />

                        <div className={styles.contentDiv}>
                            <Image src={success} alt="" />
                            <label className={styles.contentLabel}>
                                Poslat je email na {userEmail}. Potrebno je
                                kliknuti na link u poruci kako bi aktivirali Vas
                                profil.
                            </label>
                        </div>
                        <button
                            className={styles.notificationButton}
                            onClick={() => router.push('/')}
                        >
                            zatvori
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default RegistrationPage
