import React from 'react'
import Modal from 'react-modal'
import Image from 'next/image'
import { bgModal } from '@/constants/constants'
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
            className="modalContainer"
            ariaHideApp={false}
        >
            <div className="modalContainer__formContainer">
                <div className="modalContainer__formContainer__formDiv">
                    {!isError && <Image src={successFilled} alt="" />}
                    <label className="modalContainer__formContainer__formDiv__formTitle">
                        {title}
                    </label>

                    <div className="modalContainer__formContainer__formDiv__formTitle__contentDiv">
                        <label className="modalContainer__formContainer__formDiv__formTitle__contentDiv__contentLabel">
                            {text}
                        </label>
                    </div>

                    <button
                        className="modalContainer__formContainer__formDiv__confirmationModalButtons__formButton"
                        onClick={closeModal}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </Modal>
    )
}
