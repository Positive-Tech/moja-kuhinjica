import React from 'react'
import Modal from 'react-modal'
import Image from 'next/image'
import { bgModal } from '@/constants/constants'
import success from 'public/static/assets/images/success.svg'
import successFilled from 'public/static/assets/images/successFilled.svg'
import { useTranslation } from 'react-i18next'

interface ISignUpNotificationModalProps {
    modalIsOpen: boolean
    closeModal: () => void
    type?: string
    title: string
    buttonText: string
    email?: string
}
export const SuccessNotificationModal = ({
    modalIsOpen,
    closeModal,
    type,
    title,
    buttonText,
    email,
}: ISignUpNotificationModalProps): JSX.Element => {
    const { t } = useTranslation()
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
                    <Image src={successFilled} alt="" />
                    <label
                        className={
                            'modalContainer__formContainer__formDiv__formTitle'
                        }
                    >
                        {title}
                    </label>
                    {type === 'registration' && (
                        <div className="modalContainer__formContainer__formDiv__formTitle__contentDiv">
                            <Image src={success} alt="" />
                            <label className="modalContainer__formContainer__formDiv__formTitle__contentDiv__contentLabel">
                                {t("Poslat je email na")} {email}. {t("Potrebno je kliknuti na link u poruci kako bi aktivirali Vas profil.")}
                            </label>
                        </div>
                    )}
                    <button
                        className="modalContainer__formContainer__formDiv__formTitle__formButton"
                        onClick={closeModal}
                    >
                        {t(buttonText)}
                    </button>
                </div>
            </div>
        </Modal>
    )
}
