import { FormInput } from '@/components/input/FormInput'
import { ErrorLabel } from '@/components/label/ErrorLabel'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from 'react-modal'
import { bgModal } from '../../../constants/constants'
import styles from './ChangePasswordModal.module.scss'
import passwordIcon from 'public/static/assets/images/password.svg'

interface IChangePasswordModalProps {
    modalIsOpen: boolean
    closeModal: () => void
}
export const ChangePasswordModal = ({
    modalIsOpen,
    closeModal,
}: IChangePasswordModalProps): JSX.Element => {
    const [showError, setShowError] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

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
                    onSubmit={handleSubmit((data) => console.log(data))}
                >
                    <label className={styles.formTitle}>Promeni šifru</label>
                    {showError && (
                        <ErrorLabel content="Email ili lozinka nisu ispravni. Pokušajte ponovo." />
                    )}
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
                            required: 'pass is required',
                        }}
                        style={styles.passwordInput}
                    />
                    <FormInput
                        register={register}
                        errors={errors}
                        name="confirmedPassword"
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
