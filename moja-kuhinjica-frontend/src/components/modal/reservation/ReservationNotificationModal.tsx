import React from 'react'
import Modal from 'react-modal'
import Image from 'next/image'
import { bgModal } from '@/constants/constants'
import successFilled from 'public/static/assets/images/successFilled.svg'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { routes } from '../../../constants/constants'
interface IReservationNotificationModalProps {
    modalIsOpen: boolean
    closeModal: () => void
    title: string
    buttonText: string
    text?: string
    isError?: boolean,
    linkMyReservations?: boolean
}
export const ReservationNotificationModal = ({
    modalIsOpen,
    closeModal,
    title,
    buttonText,
    text,
    isError,
    linkMyReservations
}: IReservationNotificationModalProps): JSX.Element => {
    const router = useRouter()
    const { t } = useTranslation()

    const handleRedirect = (): void => {
        router.push(routes.MY_RESERVATIONS_PAGE)
    }

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
                        {t(title)}
                    </label>

                    <div className="modalContainer__formContainer__formDiv__formTitle__contentDiv">
                        <label className="modalContainer__formContainer__formDiv__formTitle__contentDiv__contentLabel">
                            {t(text ?? '')}
                            <br />
                            {linkMyReservations && (
                                <span
                                    className="modalContainer__formContainer__formDiv__formTitle__contentDiv__contentLabel__contentSpan"
                                    onClick={handleRedirect}
                                 >
                                    {' ' + t('Moje rezervacije')}
                                </span>
                            )}
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
