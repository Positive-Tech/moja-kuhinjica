import React from 'react'
import { useForm } from 'react-hook-form'
import Modal from 'react-modal'
import { FieldValues } from 'react-hook-form'
import { FormInput } from '../../input/FormInput'
import { bgModal } from '../../../constants/constants'
import styles from './LoginModal.module.scss'
import email from '../../../../public/static/assets/images/email.svg'
import password from '../../../../public/static/assets/images/password.svg'
import UserService from '@/service/User.service'

interface ILoginModalProps {
    modalIsOpen: boolean
    closeModal: (param: boolean) => void
}
export interface RegistrationFormFields {
    email: string
    password: string
}
export const LoginModal = ({
    modalIsOpen,
    closeModal,
}: ILoginModalProps): JSX.Element => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const login = (data: FieldValues): void => {
        UserService.login(data).then(
            (res) => console.log(res)
            // localStorage.setItem('token', res.access_token)
        )
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => closeModal(false)}
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
                    <button type="submit" className={styles.formButton}>
                        Potvrdi
                    </button>
                </form>
            </div>
        </Modal>
    )
}
