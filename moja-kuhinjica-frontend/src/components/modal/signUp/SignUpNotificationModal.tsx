import React from 'react'
import Modal from 'react-modal'
import Image from 'next/image'
import styles from './SignUpModal.module.scss'
import { bgModal } from '@/constants/constants'
import success from '../../../../public/static/assets/images/success.svg'
import successFilled from '../../../../public/static/assets/images/successFilled.svg'

interface ISignUpNotificationModalProps {
    modalIsOpen: boolean
    closeModal: (param: boolean) => void
}
export const SignUpNotificationModal = ({
    modalIsOpen,
    closeModal,
}: ISignUpNotificationModalProps) => {
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => closeModal(false)}
            style={bgModal}
            className={styles.modalContainerSuccessfulRegistration}
            ariaHideApp={false}
        >
            <div className={styles.formContainer}>
                <div className={styles.formDiv}>
                    <Image src={successFilled} alt="" />
                    <label className={styles.formTitle}>
                        registracija uspešna
                    </label>
                    <div className={styles.contentDiv}>
                        <Image src={success} alt="" />
                        <label className={styles.contentLabel}>
                            Poslat je email na peraperic@gmail.com. Potrebno je
                            kliknuti na link u poruci kako bi aktivirali Vas
                            profil.
                        </label>
                    </div>
                    <button
                        className={styles.formButton}
                        onClick={() => closeModal(false)}
                    >
                        zatvori
                    </button>
                </div>
            </div>
        </Modal>
    )
}
