import React from 'react'
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

export const LoginModal = ({ modalIsOpen, closeModal }: ILoginModalProps) => {
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => closeModal(false)}
            style={bgModal}
            className={styles.modalContainerLogin}
            ariaHideApp={false}
        >
            <div className={styles.formContainer}>
                <div className={styles.formDiv}>
                    <label className={styles.formTitle}>Ulogujte se</label>
                    <FormInput src={email} content="Email" type="text" />
                    <FormInput src={password} content="Šifra" type="password" />
                    <button className={styles.formButton}>Potvrdi</button>
                </div>
            </div>
        </Modal>
    )
}
