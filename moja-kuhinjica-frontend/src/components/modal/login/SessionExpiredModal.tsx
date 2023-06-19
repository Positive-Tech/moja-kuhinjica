import React from 'react'
import Modal from 'react-modal'
import { useTranslation } from 'react-i18next'
import { bgModal } from '@/constants/constants'

interface ISessionExpiredModalProps {
    modalIsOpen?: boolean
    closeModal?: () => void
    title: string
    buttonText: string
    text: string
}

export const SessionExpiredModal = ({
    modalIsOpen,
    closeModal,
    title,
    buttonText,
    text,
}: ISessionExpiredModalProps): JSX.Element => {
    const { t } = useTranslation()
    
    return (
        <Modal
            isOpen={!!modalIsOpen}
            style={bgModal}
            onRequestClose={closeModal}
            className="modalContainer"
            ariaHideApp={false}
        >
            <div className="modalContainer__formContainer">
                <div className="modalContainer__formContainer__formDiv">
                    <label className="modalContainer__formContainer__formDiv__formTitle">
                        {t(title)}
                    </label>

                    <div className="modalContainer__formContainer__formDiv__formTitle__contentDiv">
                        <label className="modalContainer__formContainer__formDiv__formTitle__contentDiv__contentLabel">
                            {t(text)}
                        </label>
                    </div>

                    <button
                        className="modalContainer__formContainer__formDiv__confirmationModalButtons__formButton"
                        onClick={closeModal}
                    >
                        {t(buttonText)}
                    </button>
                </div>
            </div>
        </Modal>
    )
}