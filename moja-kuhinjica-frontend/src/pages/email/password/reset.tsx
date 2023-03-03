import React, { useState } from 'react'
import styles from '../EmailPages.module.scss'
import passwordIcon from 'public/static/assets/images/password.svg'
import { Title } from '@/components/label/Title'
import { useRouter } from 'next/router'
import { FormInput } from '@/components/input/FormInput'
import { FieldValues, useForm } from 'react-hook-form'
import { ErrorLabel } from '@/components/label/ErrorLabel'

const ResetPasswordPage = (): JSX.Element => {
    const [showError, setShowError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const validate = (data: FieldValues): void => {
        if (data.newPassword === data.confirmPassword) {
        } else {
            setErrorMessage('Šifre se ne poklapaju. Pokušajte ponovo.')
            setShowError(true)
        }
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
                            name="newPassword"
                            src={passwordIcon}
                            placeholder="Unesi novu šifru"
                            type="password"
                            validationSchema={{
                                required: 'password is required',
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    message: 'invalid password value',
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
                                required: 'pass is required',
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
