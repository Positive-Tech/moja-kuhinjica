import React, { useState } from 'react'
import Modal from 'react-modal'
import { FieldValues, useForm } from 'react-hook-form'
import UserService from '@/service/User.service'
import { ErrorLabel } from '@/components/label/ErrorLabel'
import { FormInput } from '@/components/input/FormInput'
import { Text } from '@/components/label/Text'
import { bgModal } from 'src/constants/constants'
import emailIcon from 'public/static/assets/images/email.svg'
import { Oval } from 'react-loader-spinner'

interface IPasswordForgettingModalProps {
    modalIsOpen: boolean
    closeModal: () => void
    openNotificationModal: () => void
    setMessage: (param: string) => void
    setUserEmail: (param: string) => void
}
export const PasswordForgettingModal = ({
    modalIsOpen,
    closeModal,
    openNotificationModal,
    setMessage,
    setUserEmail,
}: IPasswordForgettingModalProps): JSX.Element => {
    const [showError, setShowError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const resetPassword = (data: FieldValues): void => {
        setIsLoading(true)
        UserService.forgotPassword(data)
            .then((res) => {
                setMessage(res.data)
                setUserEmail(data.email)
                reset()
                closeModal()
                openNotificationModal()
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
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
                    onSubmit={handleSubmit((data) => resetPassword(data))}
                >
                    <label className="modalContainer__formContainer__formDiv__formTitle">
                        Zaboravili ste šifru?
                    </label>
                    <Text
                        content="Ne brinite, mi ćemo Vam poslati instrukcije za resetovanje."
                        style="modalContainer__formContainer__formDiv__infoLabel"
                    />
                    {showError && <ErrorLabel content={errorMessage} />}
                    <FormInput
                        register={register}
                        errors={errors}
                        name="email"
                        src={emailIcon}
                        placeholder="Email"
                        type="text"
                        validationSchema={{
                            required: 'Obavezno polje.',
                            pattern: {
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                message: 'Pogrešan format za email adresu.',
                            },
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
                                Resetuj šifru
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </Modal>
    )
}
