import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import Modal from 'react-modal'
import UserService from '@/service/User.service'
import { FormInput } from '@/components/input/FormInput'
import { ErrorLabel } from '@/components/label/ErrorLabel'
import { bgModal } from 'src/constants/constants'
import passwordIcon from 'public/static/assets/images/password.svg'
import { Oval } from 'react-loader-spinner'
import { useTranslation } from 'react-i18next'

interface IChangePasswordModalProps {
    modalIsOpen: boolean
    closeModal: () => void
}
export const PasswordChangeModal = ({
    modalIsOpen,
    closeModal,
}: IChangePasswordModalProps): JSX.Element => {
    const { t } = useTranslation()
    const [showError, setShowError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const validate = (data: FieldValues): void => {
        if (data.newPassword !== data.confirmPassword) {
            setErrorMessage('Šifre se ne poklapaju. Pokušajte ponovo.')
            setShowError(true)
        } else if (data.oldPassword === data.newPassword) {
            setErrorMessage('Nova šifra ne može biti ista kao stara')
            setShowError(true)
        } else {
            delete data.confirmPassword
            setShowError(false)
            changePassword(data)
        }
    }

    const changePassword = (data: FieldValues): void => {
        setIsLoading(true)
        UserService.changePassword(data)
            .then(() => {
                reset()
                closeModal()
                setIsLoading(false)
            })
            .catch((err) => {
                setErrorMessage(err.response.data.message)
                setShowError(true)
                reset()
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
                <form
                    className="modalContainer__formContainer__formDiv"
                    onSubmit={handleSubmit((data) => validate(data))}
                >
                    <label className="modalContainer__formContainer__formDiv__formTitle">
                        {t('Promeni šifru')}
                    </label>
                    {showError && <ErrorLabel content={errorMessage} />}
                    <FormInput
                        register={register}
                        errors={errors}
                        name="oldPassword"
                        src={passwordIcon}
                        placeholder={t('Stara šifra') as string}
                        type="password"
                        validationSchema={{
                            required: t('Obavezno polje.'),
                        }}
                        style="modalContainer__formContainer__formDiv__passwordInput"
                    />
                    <FormInput
                        register={register}
                        errors={errors}
                        name="newPassword"
                        src={passwordIcon}
                        placeholder={t('Nova šifra') as string}
                        type="password"
                        validationSchema={{
                            required: t('Obavezno polje.'),
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                message: t(
                                    'Šifra mora da sadrži minimum 8 karaktera i barem jedan broj.'
                                ),
                            },
                        }}
                        style="modalContainer__formContainer__formDiv__passwordInput"
                    />
                    <FormInput
                        register={register}
                        errors={errors}
                        name="confirmPassword"
                        src={passwordIcon}
                        placeholder={t('Potvrdi novu šifru') as string}
                        type="password"
                        validationSchema={{
                            required: t('Obavezno polje.'),
                        }}
                        style="modalContainer__formContainer__formDiv__passwordInput"
                    />
                    <div className="modalContainer__formContainer__formDiv__buttonWrapper">
                        {isLoading ? (
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
                        ) : (
                            <button
                                type="submit"
                                className="modalContainer__formContainer__formDiv__buttonWrapper__formButton"
                            >
                                {t('Potvrdi')}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </Modal>
    )
}
