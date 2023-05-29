import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useForm, FieldValues } from 'react-hook-form'
import UserService from '@/service/User.service'
import { FormInput } from '@/components/input/FormInput'
import { ErrorLabel } from '@/components/label/ErrorLabel'
import back from 'public/static/assets/images/backArrow.svg'
import profile from 'public/static/assets/images/profile.svg'
import email from 'public/static/assets/images/email.svg'
import password from 'public/static/assets/images/password.svg'
import mobile from 'public/static/assets/images/mobile.svg'
import successFilled from 'public/static/assets/images/successFilled.svg'
import success from 'public/static/assets/images/success.svg'
import { Oval } from 'react-loader-spinner'
import { routes } from '@/constants/constants'
import { t } from 'i18next'

const RegistrationPage = (): JSX.Element => {
    const [showError, setShowError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
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
        setIsLoading(true)
        UserService.signIn(inputData)
            .then((res) => {
                setUserEmail(inputData.email)
                setShowNotification(true)
                reset()
                setIsLoading(false)
            })
            .catch((err) => {
                setErrorMessage(err.message)
                setShowError(true)
                setIsLoading(false)
                console.log(err)
            })
    }

    const validate = (data: FieldValues): void => {
        if (data.password === data.confirmPassword) {
            delete data.confirmPassword
            data.phoneNumber = `+381${data.phoneNumber}`
            setShowError(false)
            signIn(data)
        } else {
            setErrorMessage('Šifre se ne poklapaju. Pokušajte ponovo.')
            setShowError(true)
        }
    }

    return (
        <div className="registrationContainer">
            {!showNotification && (
                <div className="registrationContainer__wrapper">
                    <Image src={back} alt="" onClick={() => router.back()} />
                    <form
                        className="registrationContainer__wrapper__formDiv"
                        onSubmit={handleSubmit((data) => validate(data))}
                    >
                        <label className="registrationContainer__wrapper__formDiv__formTitle">
                            {t("Registrujte se")}
                        </label>
                        {showError && <ErrorLabel content={errorMessage} />}
                        <div className="registrationContainer__wrapper__formDiv__inputWrapper">
                            <FormInput
                                register={register}
                                errors={errors}
                                name="name"
                                src={profile}
                                placeholder={t("Ime") as string}
                                type="text"
                                validationSchema={{
                                    required: t('Ime je obavezno.'),
                                    pattern: {
                                        value: /^[A-Za-z\s]+$/,
                                        message:
                                            t('Ime može da sadrži samo slova.'),
                                    },
                                }}
                                style="registrationContainer__wrapper__formDiv__inputWrapper__input"
                            />
                            <FormInput
                                register={register}
                                errors={errors}
                                name="surname"
                                src={profile}
                                placeholder={t("Prezime") as string}
                                type="text"
                                validationSchema={{
                                    required: t('Prezime je obavezno.'),
                                    pattern: {
                                        value: /^[A-Za-z\s]+$/,
                                        message:
                                            t('Prezime može da sadrži samo slova.'),
                                    },
                                }}
                                style="registrationContainer__wrapper__formDiv__inputWrapper__input"
                            />
                            <FormInput
                                register={register}
                                errors={errors}
                                name="email"
                                src={email}
                                placeholder="Email"
                                type="text"
                                validationSchema={{
                                    required: t('Email adresa je obavezna.'),
                                    pattern: {
                                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                        message:
                                            t('Pogrešan format za email adresu.'),
                                    },
                                }}
                                style="registrationContainer__wrapper__formDiv__inputWrapper__input"
                            />
                            <FormInput
                                register={register}
                                errors={errors}
                                name="password"
                                src={password}
                                placeholder={t("Šifra") as string}
                                type="password"
                                validationSchema={{
                                    required: t('Šifra je obavezna.'),
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                        message:
                                            t('Šifra mora da sadrži minimum 8 karaktera i barem jedan broj.'),
                                    },
                                }}
                                style="registrationContainer__wrapper__formDiv__inputWrapper__input"
                            />
                            <FormInput
                                register={register}
                                errors={errors}
                                name="confirmPassword"
                                src={password}
                                placeholder={t("Potvrdi šifru") as string}
                                type="password"
                                validationSchema={{
                                    required: t('Ponovljena šifra je obavezna.'),
                                }}
                                style="registrationContainer__wrapper__formDiv__inputWrapper__input"
                            />
                            <FormInput
                                register={register}
                                errors={errors}
                                name="phoneNumber"
                                src={mobile}
                                placeholder=""
                                type="number"
                                validationSchema={{
                                    required: t('Broj telefona je obavezan.'),
                                    pattern: {
                                        value: /^[0-9]{6,}$/,
                                        message:
                                            t('Broj telefona sadrži minimalno 6 brojeva.'),
                                    },
                                }}
                                style="registrationContainer__wrapper__formDiv__inputWrapper__input"
                                isPhoneNumber={true}
                            />
                        </div>
                        <div className="registrationContainer__wrapper__formDiv__inputWrapper__buttonWrapper">
                            {isLoading ? (
                                <Oval
                                    height={40}
                                    width={40}
                                    color="#c10016"
                                    wrapperStyle={{}}
                                    wrapperClass="registrationContainer__wrapper__formDiv__inputWrapper__buttonWrapper__spinner"
                                    visible={true}
                                    ariaLabel="oval-loading"
                                    secondaryColor="#c10016"
                                    strokeWidth={4}
                                    strokeWidthSecondary={4}
                                />
                            ) : (
                                <button
                                    type="submit"
                                    className="registrationContainer__wrapper__formDiv__inputWrapper__buttonWrapper__formButton"
                                >
                                    {t("Potvrdi")}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            )}
            {showNotification && (
                <div className="registrationContainer__notificationContainer">
                    <div className="registrationContainer__notificationContainer__notificationDiv">
                        <Image src={successFilled} alt="" />

                        <div className="registrationContainer__notificationContainer__notificationDiv__contentDiv">
                            <Image src={success} alt="" />
                            <label className="registrationContainer__notificationContainer__notificationDiv__contentDiv__contentLabel">
                                {t("Poslat je email na")} {userEmail}. {t("Potrebno je kliknuti na link u poruci kako bi aktivirali Vam profil.")}
                            </label>
                        </div>
                        <button
                            className="registrationContainer__notificationContainer__notificationDiv__notificationButton"
                            onClick={() => router.push(routes.HOME_PAGE)}
                        >
                            {t("zatvori")}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default RegistrationPage
