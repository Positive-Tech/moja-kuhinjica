import { useRouter } from 'next/router'
import { FieldValues, useForm } from 'react-hook-form'
import React, { useState } from 'react'
import UserService from '@/service/User.service'
import { FormInput } from '@/components/input/FormInput'
import { ErrorLabel } from '@/components/label/ErrorLabel'
import { MobileHeader } from '@/components/header/mobileHeader/MobileHeader'
import Menu from '@/components/mobileMenu'
import { MobileFooter } from '@/components/footer/mobileFooter/MobileFooter'
import styles from './ChangePasswordPage.module.scss'
import passwordIcon from 'public/static/assets/images/password.svg'
import { Oval } from 'react-loader-spinner'

const ChangePasswordPage = (): JSX.Element => {
    const [showError, setShowError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const validate = (data: FieldValues): void => {
        if (data.newPassword === data.confirmPassword) {
            delete data.confirmPassword
            setShowError(false)
            changePassword(data)
        } else {
            setErrorMessage('Šifre se ne poklapaju. Pokušajte ponovo.')
            setShowError(true)
        }
    }

    const changePassword = (data: FieldValues): void => {
        setIsLoading(true)
        UserService.changePassword(data)
            .then((res) => {
                // notification for successful change
                reset()
                router.back()
                setIsLoading(false)
            })
            .catch((err) => {
                setErrorMessage(err.response.data.message)
                setShowError(true)
                reset()
                console.log(err)
                setIsLoading(false)
            })
    }

    return (
        <div className={styles.container}>
            {showMenu && <Menu closeMenu={() => setShowMenu(false)} />}
            <MobileHeader handleClick={() => setShowMenu(true)} />
            <div className={styles.wrapper}>
                <form
                    className={styles.formDiv}
                    onSubmit={handleSubmit((data) => validate(data))}
                >
                    <label className={styles.formTitle}>Promeni šifru</label>
                    {showError && <ErrorLabel content={errorMessage} />}
                    <FormInput
                        register={register}
                        errors={errors}
                        name="oldPassword"
                        src={passwordIcon}
                        placeholder="Stara šifra"
                        type="password"
                        validationSchema={{
                            required: 'Obavezno polje.',
                        }}
                        style={styles.input}
                    />
                    <FormInput
                        register={register}
                        errors={errors}
                        name="newPassword"
                        src={passwordIcon}
                        placeholder="Nova šifra"
                        type="password"
                        validationSchema={{
                            required: 'Obavezno polje.',
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                message:
                                    'Šifra mora da sadrži minimum 8 karaktera i barem jedan broj.',
                            },
                        }}
                        style={styles.input}
                    />
                    <FormInput
                        register={register}
                        errors={errors}
                        name="confirmPassword"
                        src={passwordIcon}
                        placeholder="Potvrdi novu šifru"
                        type="password"
                        validationSchema={{
                            required: 'Obavezno polje.',
                        }}
                        style={styles.input}
                    />
                    <div className={styles.buttonWrapper}>
                        {isLoading ? (
                            <Oval
                                height={40}
                                width={40}
                                color="#c10016"
                                wrapperStyle={{}}
                                wrapperClass={styles.spinner}
                                visible={true}
                                ariaLabel="oval-loading"
                                secondaryColor="#c10016"
                                strokeWidth={4}
                                strokeWidthSecondary={4}
                            />
                        ) : (
                            <button type="submit" className={styles.formButton}>
                                Potvrdi
                            </button>
                        )}
                    </div>
                </form>
            </div>
            <MobileFooter />
        </div>
    )
}

export default ChangePasswordPage
