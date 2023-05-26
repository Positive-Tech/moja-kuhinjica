import React, { Component, ReactElement } from 'react'
import Modal from 'react-modal'
import { useTranslation } from 'react-i18next'

import { bgModal } from '@/constants/constants'

interface DisabledReservationModalProps {
    modalIsOpen: boolean
    closeModal: () => void
    title: string
    buttonText: string
    children?: ReactElement
}

export const DisabledReservationModal = ({
    modalIsOpen,
    closeModal,
    title,
    buttonText,
    children
}: DisabledReservationModalProps): JSX.Element => {
    const { t } = useTranslation();

    const getBody = () => {
        if (children) {
            return children;
        }

        return (
            <div>
                <label className="modalContainer__formContainer__formDiv__formTitle">
                    {t(title)}
                </label>
                <button
                    className="modalContainer__formContainer__formDiv__formTitle__formButton"
                    onClick={closeModal}
                >
                    {t(buttonText)}
                </button>
            </div>
        )
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
                       {getBody()}
                    </label>
                </div>
            </div>
        </Modal>
    )
}
