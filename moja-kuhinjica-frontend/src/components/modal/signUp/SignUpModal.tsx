import React from 'react'
import Modal from 'react-modal'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { FormInput } from '@/components/input/FormInput'
import styles from './SignUpModal.module.scss'
import { bgModal } from '@/constants/constants'
import profile from '../../../../public/static/assets/images/profile.svg'
import email from '../../../../public/static/assets/images/email.svg'
import password from '../../../../public/static/assets/images/password.svg'
import mobile from '../../../../public/static/assets/images/mobile.svg'
import google from '../../../../public/static/assets/images/google.svg'
import mailSignUp from '../../../../public/static/assets/images/mailSignUp.svg'

interface ISignUpModalProps {
    modalIsOpen: boolean
    closeModal: (param: boolean) => void
}
export const SignUpModal = ({
    modalIsOpen,
    closeModal,
}: ISignUpModalProps): JSX.Element => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    const onSubmit = (data: any): void => {
        reset()
    }
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => closeModal(false)}
            style={bgModal}
            className={styles.modalContainer}
            ariaHideApp={false}
        >
            <div className={styles.formContainer}>
                <form
                    className={styles.formDiv}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <label className={styles.formTitle}>Registrujte se</label>
                    <FormInput
                        register={register}
                        errors={errors}
                        name="name"
                        src={profile}
                        placeholder="Ime i prezime"
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
                        name="telephoneNumber"
                        src={mobile}
                        placeholder="Broj telefona"
                        type="text"
                        validationSchema={{
                            required: 'telephone number is required',
                            pattern: {
                                value: /^[0-9]{6,}$/,
                                message: 'invalid telephone number value',
                            },
                        }}
                    />
                    <button className={styles.formButton}>Potvrdi</button>
                    <div className={styles.separatorWrapper}>
                        <div className={styles.separator}></div>
                        <label className={styles.separatorLabel}>ili</label>
                        <div className={styles.separator}></div>
                    </div>
                    <div className={styles.buttonWrapper2}>
                        <Image
                            src={google}
                            alt=""
                            className={styles.buttonImage}
                        />
                        <Image
                            src={mailSignUp}
                            alt=""
                            className={styles.buttonImage}
                        />
                    </div>
                </form>
            </div>
        </Modal>
    )
}
