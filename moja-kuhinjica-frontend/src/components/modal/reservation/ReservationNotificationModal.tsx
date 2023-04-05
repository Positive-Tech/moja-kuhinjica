import React from 'react'
import Modal from 'react-modal'
import Image from 'next/image'
import { bgModal } from '@/constants/constants'
import styles from '../notification/SuccessNotificationModal.module.scss'
import successFilled from 'public/static/assets/images/successFilled.svg'

interface IReservationNotificationModalProps {
    modalIsOpen: boolean
    closeModal: () => void
    title: string
    buttonText: string
    text?: string
    isError?: boolean
}
export const ReservationNotificationModal = ({
    modalIsOpen,
    closeModal,
    title,
    buttonText,
    text,
    isError,
}: IReservationNotificationModalProps): JSX.Element => {
    return (
        <Modal
            isOpen={modalIsOpen}
            style={bgModal}
            onRequestClose={closeModal}
            className={styles.modalContainer}
            ariaHideApp={false}
        >
            <div className={styles.formContainer}>
                <div className={styles.formDiv}>
                    {!isError && <Image src={successFilled} alt="" />}
                    <label className={styles.formTitle}>{title}</label>

                    <div className={styles.contentDiv}>
                        <label className={styles.contentLabel}>{text}</label>
                    </div>

                    <button className={styles.formButton} onClick={closeModal}>
                        {buttonText}
                    </button>
                </div>
            </div>
        </Modal>
    )
}
