import React, { useState } from 'react'
import Modal from 'react-modal'
import { Text } from '@/components/label/Text'
import { bgModal } from 'src/constants/constants'
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
        UserService.forgotPassword({ email })
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
            className="modalContainer"
            ariaHideApp={false}
        >
            <div className="modalContainer__formContainer">
                <div className="modalContainer__formContainer__formDiv">
                    <label className="modalContainer__formContainer__formDiv__formTitle">
                        Proverite svoj email
                    </label>
                    <Text
                        content={infoContent}
                        style="modalContainer__formContainer__formDiv__infoLabel"
                    />
                    {!isLoading && (
                        <div className="modalContainer__formContainer__formDiv__labelWrapper">
                            <Text
                                content="Nije Vam stigao email?"
                                style="modalContainer__formContainer__formDiv__labelWrapper__mailLabel"
                            />
                            <Text
                                content="Pošalji ponovo"
                                style="modalContainer__formContainer__formDiv__labelWrapper__mailLabel modalContainer__formContainer__formDiv__labelWrapper__mailLabel--button"
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
                            wrapperClass="modalContainer__formContainer__formDiv__buttonWrapper__spinner"
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
