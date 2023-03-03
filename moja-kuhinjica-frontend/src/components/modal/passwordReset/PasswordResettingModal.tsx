import React from 'react'
import Modal from 'react-modal'
import { Text } from '@/components/label/Text'
import { bgModal } from 'src/constants/constants'
import styles from './PasswordResettingModal.module.scss'

interface IPasswordResettingModalProps {
    modalIsOpen: boolean
    closeModal: () => void
    infoContent: string
}
export const PasswordResettingModal = ({
    modalIsOpen,
    closeModal,
    infoContent,
}: IPasswordResettingModalProps): JSX.Element => {
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
                    <label className={styles.formTitle}>
                        Proverite svoj email
                    </label>
                    <Text content={infoContent} style={styles.infoLabel} />
                    <button className={styles.formButton}>Otvori email</button>
                    <div className={styles.labelWrapper}>
                        <Text
                            content="Nije Vam stigao email?"
                            style={styles.infoLabel}
                        />
                        <Text
                            content="Pošalji ponovo"
                            style={styles.buttonLabel}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}
