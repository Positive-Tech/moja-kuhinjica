import React from 'react'
import Modal from 'react-modal'
import { bgModal } from '@/constants/constants'

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
            onRequestClose={closeModal}
            className="modalContainer"
            ariaHideApp={false}
        >
            <div className="modalContainer__formContainer">
                <div className="modalContainer__formContainer__formDiv">
                    <label className="modalContainer__formContainer__formDiv__formTitle">
                        {title}
                    </label>

                    <div className="modalContainer__formContainer__formDiv__formTitle__contentDiv">
                        <label className="modalContainer__formContainer__formDiv__formTitle__contentDiv__contentLabel">
                            {text}
                        </label>
                    </div>
                    <div className="modalContainer__formContainer__formDiv__confirmationModalButtons">
                        <button
                            className="modalContainer__formContainer__formDiv__confirmationModalButtons__formButton"
                            onClick={confirmOrder}
                        >
                            Potvrdi
                        </button>
                        <button
                            className="modalContainer__formContainer__formDiv__confirmationModalButtons__formButton"
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
