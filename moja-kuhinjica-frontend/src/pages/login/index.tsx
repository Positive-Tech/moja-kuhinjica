import React from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { FormInput } from '@/components/input/FormInput'
import back from '../../../public/static/assets/images/backArrow.svg'
import email from '../../../public/static/assets/images/email.svg'
import password from '../../../public/static/assets/images/password.svg'

import styles from './LoginPage.module.scss'

const LoginPage = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data: any) => {
        reset()
    }
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Image src={back} alt="" onClick={() => router.back()} />
                <form
                    className={styles.formDiv}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <label className={styles.formTitle}>Ulogujte se</label>
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
