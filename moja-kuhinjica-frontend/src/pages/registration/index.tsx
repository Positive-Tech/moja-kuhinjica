import React from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { FormInput } from '@/components/input/FormInput'
import styles from './RegistrationPage.module.scss'
import back from '../../../public/static/assets/images/backArrow.svg'
import profile from '../../../public/static/assets/images/profile.svg'
import email from '../../../public/static/assets/images/email.svg'
import password from '../../../public/static/assets/images/password.svg'
import mobile from '../../../public/static/assets/images/mobile.svg'
import google from '../../../public/static/assets/images/google.svg'
import mailSignUp from '../../../public/static/assets/images/mailSignUp.svg'
import { useRouter } from 'next/router'

const RegistrationPage = () => {
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
                    <label className={styles.formTitle}>Registrujte se</label>
                    <FormInput
                        register={register}
                        errors={errors}
                        name="name"
                        src={profile}
                        placeholder="Ime i prezime"
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
                        name="telephoneNumber"
                        src={mobile}
                        placeholder="Broj telefona"
                        type="text"
                        validationSchema={{
                            required: 'telephone number is required',
                            pattern: {
                                value: /^[0-9]{6,}$/,
                                message: 'invalid telephone number value',
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

export default RegistrationPage
