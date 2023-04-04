import React from 'react'
import Modal from 'react-modal'
import { bgModal } from '@/constants/constants'
import styles from '../notification/SuccessNotificationModal.module.scss'

interface IReservationConfirmationModalProps {
    modalIsOpen: boolean
    closeModal: () => void
    confirmOrder: () => void
    title: string
    buttonText: string
    text?: string
}
export const ReservationConfirmationModal = ({
    modalIsOpen,
    closeModal,
    confirmOrder,
    title,
    text,
}: IReservationConfirmationModalProps): JSX.Element => {
    return (
        <Modal
            isOpen={modalIsOpen}
            style={bgModal}
            className={styles.modalContainer}
            ariaHideApp={false}
        >
            <div className={styles.formContainer}>
                <div className={styles.formDiv}>
                    <label className={styles.formTitle}>{title}</label>

                    <div className={styles.contentDiv}>
                        <label className={styles.contentLabel}>{text}</label>
                    </div>
                    <div className={styles.confirmationModalButtons}>
                        <button
                            className={styles.formButton}
                            onClick={confirmOrder}
                        >
                            Potvrdi
                        </button>
                        <button
                            className={styles.formButton}
                            onClick={closeModal}
                        >
                            Otkaži
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
