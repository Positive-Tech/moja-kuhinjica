import React from 'react'
import Modal from 'react-modal'
import Image from 'next/image'
import styles from './SuccessNotificationModal.module.scss'
import { bgModal } from '@/constants/constants'
import success from '../../../../public/static/assets/images/success.svg'
import successFilled from '../../../../public/static/assets/images/successFilled.svg'

interface ISignUpNotificationModalProps {
    modalIsOpen: boolean
    closeModal: (param: boolean) => void
    type?: string
    title: string
    buttonText: string
}
export const SuccessNotificationModal = ({
    modalIsOpen,
    closeModal,
    type,
    title,
    buttonText,
}: ISignUpNotificationModalProps): JSX.Element => {
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
                    <Image src={successFilled} alt="" />
                    <label className={styles.formTitle}>{title}</label>
                    {type === 'registration' && (
                        <div className={styles.contentDiv}>
                            <Image src={success} alt="" />
                            <label className={styles.contentLabel}>
                                Poslat je email na peraperic@gmail.com. Potrebno
                                je kliknuti na link u poruci kako bi aktivirali
                                Vas profil.
                            </label>
                        </div>
                    )}
                    <button
                        className={styles.formButton}
                        onClick={() => closeModal(false)}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </Modal>
    )
}
