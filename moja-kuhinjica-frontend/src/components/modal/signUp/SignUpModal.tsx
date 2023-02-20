import React, { use, useState } from 'react'
import Modal from 'react-modal'
import { useForm, FieldValues } from 'react-hook-form'
import { FormInput } from '@/components/input/FormInput'
import styles from './SignUpModal.module.scss'
import { bgModal } from '@/constants/constants'
import profile from '../../../../public/static/assets/images/profile.svg'
import email from '../../../../public/static/assets/images/email.svg'
import password from '../../../../public/static/assets/images/password.svg'
import mobile from '../../../../public/static/assets/images/mobile.svg'
import UserService from '@/service/User.service'
import { ErrorLabel } from '@/components/label/ErrorLabel'

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
    const [showError, setShowError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const signIn = (inputData: FieldValues): void => {
        console.log(inputData)
        const res = UserService.signIn(inputData)
            .then((res) => {
                closeModal()
                reset()
                openNotificationModal(inputData.email)
            })
            .catch((err) => {
                setErrorMessage(err.message)
                setShowError(true)
                console.log(err)
            })
    }

    const validate = (data: FieldValues): void => {
        if (data.password === data.confirmPassword) {
            delete data.confirmPassword
            data.phoneNumber = '+381' + data.phoneNumber
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
            className={styles.modalContainer}
            ariaHideApp={false}
        >
            <div className={styles.formContainer}>
                <form
                    className={styles.formDiv}
                    onSubmit={handleSubmit((data) => validate(data))}
                >
                    <label className={styles.formTitle}>Registrujte se</label>
                    {showError && <ErrorLabel content={errorMessage} />}
                    <FormInput
                        register={register}
                        errors={errors}
                        name="name"
                        src={profile}
                        placeholder="Ime"
                        type="text"
                        validationSchema={{
                            required: 'name is required',
                            pattern: {
                                value: /[A-Za-z]/,
                                message: 'invalid name value',
                            },
                        }}
                    />
                    <FormInput
                        register={register}
                        errors={errors}
                        name="surname"
                        src={profile}
                        placeholder="Prezime"
                        type="text"
                        validationSchema={{
                            required: 'surname is required',
                            pattern: {
                                value: /[A-Za-z]/,
                                message: 'invalid surname value',
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
                            required: 'email is required',
                            pattern: {
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                message: 'invalid email value',
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
                            required: 'password is required',
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                message: 'invalid password value',
                            },
                        }}
                    />
                    <FormInput
                        register={register}
                        errors={errors}
                        name="confirmPassword"
                        src={password}
                        placeholder="Potvrdi šifru"
                        type="password"
                        validationSchema={{
                            required: 'confirmed password is required',
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                message: 'invalid confirmed password value',
                            },
                        }}
                    />
                    <FormInput
                        register={register}
                        errors={errors}
                        name="phoneNumber"
                        src={mobile}
                        placeholder=""
                        type="text"
                        validationSchema={{
                            required: 'telephone number is required',
                            pattern: {
                                value: /^[0-9]{6,}$/,
                                message: 'invalid telephone number value',
                            },
                        }}
                        isPhoneNumber={true}
                    />
                    <button type="submit" className={styles.formButton}>
                        Potvrdi
                    </button>
                </form>
            </div>
        </Modal>
    )
}
