import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import Modal from 'react-modal'
import UserService from '@/service/User.service'
import { FormInput } from '@/components/input/FormInput'
import { ErrorLabel } from '@/components/label/ErrorLabel'
import { bgModal } from 'src/constants/constants'
import passwordIcon from 'public/static/assets/images/password.svg'
import { Oval } from 'react-loader-spinner'

interface IChangePasswordModalProps {
    modalIsOpen: boolean
    closeModal: () => void
}
export const PasswordChangeModal = ({
    modalIsOpen,
    closeModal,
}: IChangePasswordModalProps): JSX.Element => {
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
        if (data.newPassword === data.confirmPassword) {
            delete data.confirmPassword
            setShowError(false)
            changePassword(data)
        } else {
            setErrorMessage('Šifre se ne poklapaju. Pokušajte ponovo.')
            setShowError(true)
        }
    }

    const changePassword = (data: FieldValues): void => {
        setIsLoading(true)
        UserService.changePassword(data)
            .then((res) => {
                // notification
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
                        Promeni šifru
                    </label>
                    {showError && <ErrorLabel content={errorMessage} />}
                    <FormInput
                        register={register}
                        errors={errors}
                        name="oldPassword"
                        src={passwordIcon}
                        placeholder="Stara šifra"
                        type="password"
                        validationSchema={{
                            required: 'Obavezno polje.',
                        }}
                        style="modalContainer__formContainer__formDiv__passwordInput"
                    />
                    <FormInput
                        register={register}
                        errors={errors}
                        name="newPassword"
                        src={passwordIcon}
                        placeholder="Nova šifra"
                        type="password"
                        validationSchema={{
                            required: 'Obavezno polje.',
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*[\d\p{P}]).{8,}$/u,
                                message:
                                    'Šifra mora da sadrži minimum 8 karaktera i barem jedan broj.',
                            },
                        }}
                        style="modalContainer__formContainer__formDiv__passwordInput"
                    />
                    <FormInput
                        register={register}
                        errors={errors}
                        name="confirmPassword"
                        src={passwordIcon}
                        placeholder="Potvrdi novu šifru"
                        type="password"
                        validationSchema={{
                            required: 'Obavezno polje.',
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
                                Potvrdi
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </Modal>
    )
}
