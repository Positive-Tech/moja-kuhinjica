import React, { useState } from 'react'
import Modal from 'react-modal'
import { Text } from '@/components/label/Text'
import { bgModal } from 'src/constants/constants'
import styles from './PasswordResettingModal.module.scss'
import UserService from '@/service/User.service'

interface IPasswordResettingModalProps {
    modalIsOpen: boolean
    closeModal: () => void
    infoContent: string
    email: string
}
export const PasswordResettingModal = ({
    modalIsOpen,
    closeModal,
    infoContent,
    email,
}: IPasswordResettingModalProps): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const sendEmail = (): void => {
        setIsLoading(true)
        UserService.forgotPassword({ email: email })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        setIsLoading(false)
    }

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
                    {!isLoading && (
                        <div className={styles.labelWrapper}>
                            <Text
                                content="Nije Vam stigao email?"
                                style={styles.infoLabel}
                            />
                            <Text
                                content="Pošalji ponovo"
                                style={styles.buttonLabel}
                                handleClick={() => sendEmail()}
                            />
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    )
}
