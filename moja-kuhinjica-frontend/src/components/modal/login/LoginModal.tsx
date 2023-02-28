import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from 'react-modal'
import { FieldValues } from 'react-hook-form'
import { FormInput } from '../../input/FormInput'
import UserService from '@/service/User.service'
import { ErrorLabel } from '@/components/label/ErrorLabel'
import { bgModal } from '../../../constants/constants'
import styles from './LoginModal.module.scss'
import email from '../../../../public/static/assets/images/email.svg'
import password from '../../../../public/static/assets/images/password.svg'
import { Text } from '@/components/label/Text'

interface ILoginModalProps {
    modalIsOpen: boolean
    closeModal: () => void
    loggedIn: boolean
    setLoggedIn: (param: boolean) => void
}
export interface RegistrationFormFields {
    email: string
    password: string
}
export const LoginModal = ({
    modalIsOpen,
    closeModal,
    loggedIn,
    setLoggedIn,
}: ILoginModalProps): JSX.Element => {
    const [showError, setShowError] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const login = (inputData: FieldValues): void => {
        setShowError(false)
        UserService.login(inputData)
            .then((res) => {
                localStorage.setItem('token', res.data.access_token)
                setLoggedIn(true)
                closeModal()
                reset()
            })
            .catch((err) => {
                setShowError(true)
                console.log(err)
            })
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
                    {showError && (
                        <ErrorLabel content="Email ili lozinka nisu ispravni. Pokušajte ponovo." />
                    )}
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
                            required: 'pass is required',
                        }}
                    />
                    <Text
                        content="Zaboravili ste šifru?"
                        style={styles.forgotPasswordLabel}
                    />
                    <button type="submit" className={styles.formButton}>
                        Potvrdi
                    </button>
                </form>
            </div>
        </Modal>
    )
}
