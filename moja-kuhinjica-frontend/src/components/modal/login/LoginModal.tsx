import React from 'react'
import { useState } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import Modal from 'react-modal'
import { FormInput } from '../../input/FormInput'
import { bgModal } from '../../../constants/constants'
import styles from './LoginModal.module.scss'
import email from '../../../../public/static/assets/images/email.svg'
import password from '../../../../public/static/assets/images/password.svg'

interface ILoginModalProps {
    modalIsOpen: boolean
    closeModal: (param: boolean) => void
}
export type RegistrationFormFields = {
    email: string
    password: string
}
export const LoginModal = ({ modalIsOpen, closeModal }: ILoginModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    const onSubmit = (data: any) => {
        reset()
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
                    onSubmit={handleSubmit(onSubmit)}
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
