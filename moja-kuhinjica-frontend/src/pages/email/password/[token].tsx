import React, { useState } from 'react'
import styles from '../EmailPages.module.scss'
import passwordIcon from 'public/static/assets/images/password.svg'
import { Title } from '@/components/label/Title'
import { FormInput } from '@/components/input/FormInput'
import { FieldValues, useForm } from 'react-hook-form'
import { ErrorLabel } from '@/components/label/ErrorLabel'
import { useRouter } from 'next/router'
import UserService from '@/service/User.service'

const ResetPasswordPage = (): JSX.Element => {
    const [showError, setShowError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const router = useRouter()
    const { token } = router.query

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const validate = (data: FieldValues): void => {
        if (data.password === data.confirmPassword) {
            delete data.confirmPassword
            data.token = token
            resetPassword(data)
            reset()
        } else {
            setErrorMessage('Šifre se ne poklapaju. Pokušajte ponovo.')
            setShowError(true)
        }
    }

    const resetPassword = (data: FieldValues): void => {
        setShowError(false)
        UserService.resetPassword(data)
            .then((res) => {
                router.push('/email/verification/reset')
            })
            .catch((err) => {
                console.log(err)
                setErrorMessage(err.response.data.message)
                setShowError(true)
            })
    }

    return (
        <div className={styles.container}>
            <div className={styles.resetPassWrapper}>
                <Title
                    content="Resetovanje šifre"
                    style={styles.resetPassTitle}
                />
                <div className={styles.formWrapper}>
                    <form
                        onSubmit={handleSubmit((data) => validate(data))}
                        className={styles.formDiv}
                    >
                        {showError && <ErrorLabel content={errorMessage} />}
                        <FormInput
                            register={register}
                            errors={errors}
                            name="password"
                            src={passwordIcon}
                            placeholder="Unesi novu šifru"
                            type="password"
                            validationSchema={{
                                required: 'Šifra je obavezna.',
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    message:
                                        'Šifra mora da sadrži minimum 8 karaktera i barem jedan broj.',
                                },
                            }}
                            style={styles.passwordInput}
                        />
                        <FormInput
                            register={register}
                            errors={errors}
                            name="confirmPassword"
                            src={passwordIcon}
                            placeholder="Potvrdi novu šifru"
                            type="password"
                            validationSchema={{
                                required: 'Šifra je obavezna.',
                            }}
                            style={styles.passwordInput}
                        />
                        <button type="submit" className={styles.formButton}>
                            Resetuj šifru
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default ResetPasswordPage
