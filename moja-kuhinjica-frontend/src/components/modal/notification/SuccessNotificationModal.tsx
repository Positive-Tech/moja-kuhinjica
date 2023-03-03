import React from 'react'
import Modal from 'react-modal'
import Image from 'next/image'
import { bgModal } from '@/constants/constants'
import styles from './SuccessNotificationModal.module.scss'
import success from 'public/static/assets/images/success.svg'
import successFilled from 'public/static/assets/images/successFilled.svg'

interface ISignUpNotificationModalProps {
    modalIsOpen: boolean
    closeModal: () => void
    type?: string
    title: string
    buttonText: string
    email?: string
}
export const SuccessNotificationModal = ({
    modalIsOpen,
    closeModal,
    type,
    title,
    buttonText,
    email,
}: ISignUpNotificationModalProps): JSX.Element => {
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={bgModal}
            className={styles.modalContainer}
            ariaHideApp={false}
        >
            <div className={styles.formContainer}>
                <div className={styles.formDiv}>
                    <Image src={successFilled} alt="" />
                    <label className={styles.formTitle}>{title}</label>
                    {type === 'registration' && (
                        <div className={styles.contentDiv}>
                            <Image src={success} alt="" />
                            <label className={styles.contentLabel}>
                                Poslat je email na {email}. Potrebno je kliknuti
                                na link u poruci kako bi aktivirali Vas profil.
                            </label>
                        </div>
                    )}
                    <button className={styles.formButton} onClick={closeModal}>
                        {buttonText}
                    </button>
                </div>
            </div>
        </Modal>
    )
}
