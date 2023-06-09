import React, { useState } from 'react'
import Modal from 'react-modal'
import { useForm, FieldValues } from 'react-hook-form'
import UserService from '@/service/User.service'
import { FormInput } from '@/components/input/FormInput'
import { ErrorLabel } from '@/components/label/ErrorLabel'
import { bgModal } from '@/constants/constants'
import profile from 'public/static/assets/images/profile.svg'
import email from 'public/static/assets/images/email.svg'
import password from 'public/static/assets/images/password.svg'
import mobile from 'public/static/assets/images/mobile.svg'
import { Oval } from 'react-loader-spinner'
import { useTranslation } from 'react-i18next'

interface ISignUpModalProps {
    modalIsOpen: boolean
    closeModal: () => void
    openNotificationModal: (email: string) => void
}
export const SignUpModal = ({
    modalIsOpen,
    closeModal,
    openNotificationModal,
}: ISignUpModalProps): JSX.Element => {
    const { t } = useTranslation()
    const [showError, setShowError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
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
                closeModal()
                reset()
                openNotificationModal(inputData.email)
                setIsLoading(false)
            })
            .catch((err) => {
                setErrorMessage('')
                if (err.response?.data?.message) 
                    setErrorMessage(err.response.data.message)
                 else 
                    setErrorMessage('An error occurred. Please try again later.')
                setShowError(true)
                setIsLoading(false)
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
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={bgModal}
            className="signUpModalContainer"
            ariaHideApp={false}
        >
            <div className="signUpModalContainer__formContainer">
                <form
                    className="signUpModalContainer__formContainer__formDiv"
                    onSubmit={handleSubmit((data) => validate(data))}
                >
                    <label className="signUpModalContainer__formContainer__formDiv__formTitle">
                        {t('Registrujte se')}
                    </label>
                    {showError && <ErrorLabel content={errorMessage} />}
                    <div className="signUpModalContainer__formContainer__formDiv__inputWrapper">
                        <FormInput
                            register={register}
                            errors={errors}
                            name="name"
                            src={profile}
                            placeholder={t('Ime')}
                            type="text"
                            validationSchema={{
                                required: t('Ime je obavezno.'),
                                pattern: {
                                    value: /^[A-Za-zČčĆćĐđŠšŽžабвгдђежзијклљмнњопрстћуфхцчџшАБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ\s]+$/,
                                    message: 'Ime može da sadrži samo slova.',
                                },
                            }}
                        />
                        <FormInput
                            register={register}
                            errors={errors}
                            name="surname"
                            src={profile}
                            placeholder={t('Prezime')}
                            type="text"
                            validationSchema={{
                                required: t('Prezime je obavezno.'),
                                pattern: {
                                    value: /^[A-Za-zČčĆćĐđŠšŽžабвгдђежзијклљмнњопрстћуфхцчџшАБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ\s]+$/,
                                    message: t(
                                        'Prezime može da sadrži samo slova.'
                                    ),
                                },
                            }}
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
                                    message: 'Pogrešan format za email adresu.',
                                },
                            }}
                        />
                        <FormInput
                            register={register}
                            errors={errors}
                            name="password"
                            src={password}
                            placeholder={t('Šifra')}
                            type="password"
                            validationSchema={{
                                required: t('Šifra je obavezna.'),
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*[\d\p{P}]).{8,}$/u,
                                    message: t(
                                        'Šifra mora da sadrži minimum 8 karaktera i barem jedan broj.'
                                    ),
                                },
                            }}
                        />
                        <FormInput
                            register={register}
                            errors={errors}
                            name="confirmPassword"
                            src={password}
                            placeholder={t('Potvrdi šifru')}
                            type="password"
                            validationSchema={{
                                required: t('Ponovljena šifra je obavezna.'),
                            }}
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
                                    message: t(
                                        'Broj telefona sadrži minimalno 6 brojeva.'
                                    ),
                                },
                            }}
                            isPhoneNumber={true}
                        />
                    </div>
                    <div className="signUpModalContainer__formContainer__formDiv__buttonWrapper">
                        {isLoading ? (
                            <Oval
                                height={40}
                                width={40}
                                color="#c10016"
                                wrapperStyle={{}}
                                wrapperClass="signUpModalContainer__formContainer__formDiv__buttonWrapper__spinner"
                                visible={true}
                                ariaLabel="oval-loading"
                                secondaryColor="#c10016"
                                strokeWidth={4}
                                strokeWidthSecondary={4}
                            />
                        ) : (
                            <button
                                type="submit"
                                className="signUpModalContainer__formContainer__formDiv__buttonWrapper__formButton"
                            >
                                {t('Potvrdi')}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </Modal>
    )
}
