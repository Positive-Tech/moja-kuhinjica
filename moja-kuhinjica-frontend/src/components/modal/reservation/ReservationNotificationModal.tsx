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
    linkText?: string,
    route?: string
}
export const ReservationNotificationModal = ({
    modalIsOpen,
    closeModal,
    title,
    buttonText,
    text,
    isError,
    linkMyReservations,
    linkText,
    route
}: IReservationNotificationModalProps): JSX.Element => {
    const router = useRouter()
    const { t } = useTranslation()

    const handleRedirect = (link: string = routes.HOME_PAGE): void => {
        router.push(link);
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
                                    onClick={() => handleRedirect(route)}
                                 >
                                    {' ' + t(linkText ?? '')}
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
