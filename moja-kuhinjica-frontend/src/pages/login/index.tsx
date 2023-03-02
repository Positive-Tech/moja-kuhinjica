import React, { useState } from 'react'
import Image from 'next/image'
import { useForm, FieldValues } from 'react-hook-form'
import { useRouter } from 'next/router'
import { FormInput } from '@/components/input/FormInput'
import back from 'public/static/assets/images/backArrow.svg'
import email from 'public/static/assets/images/email.svg'
import password from 'public/static/assets/images/password.svg'
import styles from './LoginPage.module.scss'
import { ErrorLabel } from '@/components/label/ErrorLabel'
import { Text } from '@/components/label/Text'
import { useAppDispatch } from 'src/utils/hooks'
import { userLogin } from '@/reduxStore/actions/userActions'

const LoginPage = (): JSX.Element => {
    const [errorMessage, setErrorMessage] = useState<string>()
    const dispatch: any = useAppDispatch()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const login = (inputData: FieldValues): void => {
        dispatch(
            userLogin({
                inputData,
                onSuccess: () => {
                    router.push('/')
                    reset()
                },
                onError: (message: string) => {
                    setErrorMessage(message)
                },
            })
        )
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
                    {errorMessage && <ErrorLabel content={errorMessage} />}
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
                        }}
                        style={styles.input}
                    />
                    <Text
                        content="Zaboravili ste šifru?"
                        style={styles.forgotPasswordLabel}
                    />
                    <button className={styles.formButton}>Potvrdi</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
