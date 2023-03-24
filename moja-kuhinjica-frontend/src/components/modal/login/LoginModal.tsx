import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from 'react-modal'
import { FieldValues } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '@/utils/hooks'
import { userLogin } from '@/reduxStore/reducers/userReducer'
import { FormInput } from '../../input/FormInput'
import { ErrorLabel } from '@/components/label/ErrorLabel'
import { Text } from '@/components/label/Text'
import { bgModal } from '../../../constants/constants'
import styles from './LoginModal.module.scss'
import email from 'public/static/assets/images/email.svg'
import password from 'public/static/assets/images/password.svg'
import { Oval } from 'react-loader-spinner'

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
    const [errorMessage, setErrorMessage] = useState<string>()
    const isLoading = useAppSelector(({ auth: { inProgress } }) => inProgress)

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
                },
                onError: (message: string) => {
                    setErrorMessage(message)
                },
            })
        )
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={bgModal}
            className={styles.modalContainerLogin}
            ariaHideApp={false}
        >
            <div className={styles.formContainer}>
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
                            required: 'Email je obavezan.',
                            pattern: {
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                message: 'Pogrešan format email adrese.',
                            },
                        }}
                    />
                    <FormInput
                        register={register}
                        errors={errors}
                        name="password"
                        src={password}
                        placeholder="Šifra"
                        type="password"
                        validationSchema={{
                            required: 'Šifra je obavezna.',
                        }}
                    />
                    <Text
                        content="Zaboravili ste šifru?"
                        style={styles.forgotPasswordLabel}
                        handleClick={() => {
                            closeModal()
                            openPasswordForgettingModal()
                        }}
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
        </Modal>
    )
}
