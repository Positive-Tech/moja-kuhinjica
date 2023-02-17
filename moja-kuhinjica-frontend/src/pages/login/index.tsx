import React, { useState } from 'react'
import Image from 'next/image'
import { useForm, FieldValues } from 'react-hook-form'
import { useRouter } from 'next/router'
import { FormInput } from '@/components/input/FormInput'
import back from 'public/static/assets/images/backArrow.svg'
import email from 'public/static/assets/images/email.svg'
import password from 'public/static/assets/images/password.svg'

import styles from './LoginPage.module.scss'
import UserService from '@/service/User.service'
import { ErrorLabel } from '@/components/label/ErrorLabel'

const LoginPage = (): JSX.Element => {
    const [showError, setShowError] = useState<boolean>(false)
    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data: any): void => {
        reset()
    }

    const login = (inputData: FieldValues): void => {
        setShowError(false)
        const res = UserService.login(inputData)
            .then((res) => {
                localStorage.setItem('token', res.data.access_token)
                router.push('/')
                reset()
            })
            .catch((err) => {
                setShowError(true)
                console.log(err)
            })
    }
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Image src={back} alt="" onClick={() => router.back()} />
                <form
                    className={styles.formDiv}
                    onSubmit={handleSubmit((data) => login(data))}
                >
                    <label className={styles.formTitle}>Ulogujte se</label>
                    {showError && (
                        <ErrorLabel content="Email ili lozinka nisu ispravni. Pokušajte ponovo." />
                    )}
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
                    <button className={styles.formButton}>Potvrdi</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
