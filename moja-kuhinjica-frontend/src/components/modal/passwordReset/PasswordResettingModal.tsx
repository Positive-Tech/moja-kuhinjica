import React, { useState } from 'react'
import Modal from 'react-modal'
import { Text } from '@/components/label/Text'
import { bgModal } from 'src/constants/constants'
import styles from './PasswordResettingModal.module.scss'
import UserService from '@/service/User.service'
import { Oval } from 'react-loader-spinner'

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
                setIsLoading(false)
            })
            .catch((err) => {
                setIsLoading(false)
                console.log(err)
            })
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
                    {isLoading && (
                        <Oval
                            height={40}
                            width={40}
                            color="#c10016"
                            wrapperStyle={{}}
                            wrapperClass={styles.spinner}
                            visible={true}
                            ariaLabel="oval-loading"
                            secondaryColor="#c10016"
                            strokeWidth={4}
                            strokeWidthSecondary={4}
                        />
                    )}
                </div>
            </div>
        </Modal>
    )
}
