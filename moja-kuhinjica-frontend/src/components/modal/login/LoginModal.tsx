import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from 'react-modal'
import { FieldValues } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '@/utils/hooks'
import { userLogin } from '@/reduxStore/reducers/userReducer'
import { FormInput } from '../../input/FormInput'
import { ErrorLabel } from '@/components/label/ErrorLabel'
import { Text } from '@/components/label/Text'
import { bgModal, routes } from '../../../constants/constants'
import email from 'public/static/assets/images/email.svg'
import password from 'public/static/assets/images/password.svg'
import { Oval } from 'react-loader-spinner'
import { useRouter } from 'next/router'
import { setRedirectToReservations } from '@/reduxStore/reducers/navigationReducer'
import { useTranslation } from 'react-i18next'

interface ILoginModalProps {
    modalIsOpen: boolean
    closeModal: () => void
    openPasswordForgettingModal: () => void
}
export interface RegistrationFormFields {
    email: string
    password: string
}
export const LoginModal = ({
    modalIsOpen,
    closeModal,
    openPasswordForgettingModal,
}: ILoginModalProps): JSX.Element => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()
    const [errorMessage, setErrorMessage] = useState<string>()
    const isLoading = useAppSelector(({ auth: { inProgress } }) => inProgress)
    const router = useRouter()
    const [rememberMe, setRememberMe] = useState<boolean>(true)

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
                    closeModal()
                    reset()
                    router.push(routes.MEAL_RESERVATION_PAGE)
                    dispatch(setRedirectToReservations(false))
                },
                onError: (message: string) => {
                    setErrorMessage(message)
                },
            })
        )
    }

    useEffect(() => {
        if (rememberMe) localStorage.setItem('rememberMe', '')
        if (!rememberMe) localStorage.removeItem('rememberMe')
    }, [rememberMe])

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={bgModal}
            className="modalContainer"
            ariaHideApp={false}
        >
            <div className="modalContainer__formContainer">
                <form
                    className="modalContainer__formContainer__formDiv"
                    onSubmit={handleSubmit((data) => login(data))}
                >
                    <label className="modalContainer__formContainer__formDiv__formTitle">
                        {t('Ulogujte se')}
                    </label>
                    {errorMessage && <ErrorLabel content={errorMessage} />}
                    <FormInput
                        register={register}
                        errors={errors}
                        name="email"
                        src={email}
                        placeholder="Email"
                        type="text"
                        validationSchema={{
                            required: t('Email je obavezan.'),
                            pattern: {
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                message: t('Pogrešan format email adrese.'),
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
                        }}
                    />
                    <div className="remember-me">
                        <input
                            id="cb1"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                            type="checkbox"
                        />
                        <p>{t('Zapamti me')}</p>
                    </div>
                    <Text
                        content={t('Zaboravili ste šifru?')}
                        style="modalContainer__formContainer__formDiv__forgotPasswordLabel"
                        handleClick={() => {
                            closeModal()
                            openPasswordForgettingModal()
                        }}
                    />
                    <div className="modalContainer__formContainer__formDiv__buttonWrapper">
                        {isLoading ? (
                            <Oval
                                height={40}
                                width={40}
                                color="#c10016"
                                wrapperStyle={{}}
                                wrapperClass="modalContainer__formContainer__formDiv__buttonWrapper__spinner"
                                visible={true}
                                ariaLabel="oval-loading"
                                secondaryColor="#c10016"
                                strokeWidth={4}
                                strokeWidthSecondary={4}
                            />
                        ) : (
                            <button
                                type="submit"
                                className="modalContainer__formContainer__formDiv__buttonWrapper__formButton"
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
