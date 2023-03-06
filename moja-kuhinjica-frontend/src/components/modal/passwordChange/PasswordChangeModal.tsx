import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import Modal from 'react-modal'
import UserService from '@/service/User.service'
import { FormInput } from '@/components/input/FormInput'
import { ErrorLabel } from '@/components/label/ErrorLabel'
import { bgModal } from 'src/constants/constants'
import styles from './PasswordChangeModal.module.scss'
import passwordIcon from 'public/static/assets/images/password.svg'

interface IChangePasswordModalProps {
    modalIsOpen: boolean
    closeModal: () => void
}
export const PasswordChangeModal = ({
    modalIsOpen,
    closeModal,
}: IChangePasswordModalProps): JSX.Element => {
    const [showError, setShowError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

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
        UserService.changePassword(data)
            .then((res) => {
                // notification
                reset()
                closeModal()
            })
            .catch((err) => {
                setErrorMessage(err.response.data.message)
                setShowError(true)
                reset()
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
                            required: 'old pass is required',
                        }}
                        style={styles.passwordInput}
                    />
                    <FormInput
                        register={register}
                        errors={errors}
                        name="newPassword"
                        src={passwordIcon}
                        placeholder="Nova šifra"
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
                        Potvrdi
                    </button>
                </form>
            </div>
        </Modal>
    )
}
