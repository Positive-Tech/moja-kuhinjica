import React from 'react'
import Modal from 'react-modal'
import Image from 'next/image'
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
export const SignUpModal = ({ modalIsOpen, closeModal }: ISignUpModalProps) => {
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => closeModal(false)}
            style={bgModal}
            className={styles.modalContainer}
            ariaHideApp={false}
        >
            <div className={styles.formContainer}>
                <div className={styles.formDiv}>
                    <label className={styles.formTitle}>Registrujte se</label>
                    <FormInput
                        src={profile}
                        placeholder="Ime i prezime"
                        type="text"
                    />
                    <FormInput src={email} placeholder="Email" type="text" />
                    <FormInput
                        src={password}
                        placeholder="Šifra"
                        type="password"
                    />
                    <FormInput
                        src={mobile}
                        placeholder="Broj telefona"
                        type="text"
                    />
                    <button className={styles.formButton}>Potvrdi</button>
                    <div className={styles.separatorWrapper}>
                        <div className={styles.separator}></div>
                        <label className={styles.separatorLabel}>ili</label>
                        <div className={styles.separator}></div>
                    </div>
                    <div className={styles.buttonWrapper2}>
                        <Image src={google} alt="" />
                        <Image src={mailSignUp} alt="" />
                    </div>
                </div>
            </div>
        </Modal>
    )
}
