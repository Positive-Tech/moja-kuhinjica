import React from 'react'
import { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Image from 'next/image'
import UserService from '@/service/User.service'
import { Footer } from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import { FormInput } from '@/components/input/FormInput'
import Menu from '../../components/mobileMenu'
import { MobileHeader } from '@/components/header/mobileHeader/MobileHeader'
import { MobileFooter } from '@/components/footer/mobileFooter/MobileFooter'
import { PasswordChangeModal } from '@/components/modal/passwordChange/PasswordChangeModal'
import { MOBILE_WIDTH } from '@/constants/constants'
import email from 'public/static/assets/images/email.svg'
import profile from 'public/static/assets/images/profile.svg'
import mobile from 'public/static/assets/images/mobile.svg'
import profileIcon from 'public/static/assets/images/profileHeader.svg'
import passwordIcon from 'public/static/assets/images/password.svg'
import styles from './EditProfilePage.module.scss'

interface User {
    id: number
    name: string
    surname: string
    phoneNumber: string
    email: string
}
const emptyUser = {
    id: 0,
    name: '',
    surname: '',
    phoneNumber: '',
    email: '',
}
const EditProfilePage = (): JSX.Element => {
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [editName, setEditName] = useState<boolean>(false)
    const [editSurname, setEditSurname] = useState<boolean>(false)
    const [editPhoneNumber, setEditPhoneNumber] = useState<boolean>(false)
    const [user, setUser] = useState<User>(emptyUser)
    const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false)
    const router = useRouter()
    const { id } = router.query

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        if (!router.isReady) return
        fetchUser()
    }, [id])

    useEffect(() => {
        handleWindowResize()
        window.addEventListener('resize', handleWindowResize)
        if (windowWidth < MOBILE_WIDTH) setIsMobile(true)
        else setIsMobile(false)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [windowWidth])

    const fetchUser = (): void => {
        UserService.getUserById(id)
            .then((res) => {
                const user = res.data
                user.phoneNumber = user.phoneNumber.split('+381')[1]
                setUser(user)
                reset()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleWindowResize = (): void => {
        setWindowWidth(window.innerWidth)
    }

    const editUser = (data: FieldValues): void => {
        delete data.email
        data.phoneNumber = `+381${data.phoneNumber}`
        if (id) data.id = +id
        UserService.editUserProfile(data)
            .then((res) => {
                // alert('successfully edited')
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className={styles.colDiv}>
            {showMenu && <Menu closeMenu={() => setShowMenu(false)} />}

            {isMobile ? (
                <MobileHeader
                    handleClick={() => setShowMenu(true)}
                    showProfileIcon={false}
                />
            ) : (
                <Header type="red" selectedButton={0} />
            )}
            <div className={styles.container}>
                <label className={styles.titleLabel}>Izmena profila</label>
                <div className={styles.formContainer}>
                    <div className={styles.formWrapper}>
                        <form
                            className={styles.formDiv}
                            onSubmit={handleSubmit((data) => editUser(data))}
                        >
                            <Image src={profileIcon} alt="" />
                            <div className={styles.changePasswordWrapper}>
                                <Image
                                    src={passwordIcon}
                                    alt=""
                                    className={styles.passwordIcon}
                                />
                                <label
                                    className={styles.changePasswordLabel}
                                    onClick={() =>
                                        isMobile
                                            ? router.push('/passwordChange')
                                            : setShowPasswordModal(true)
                                    }
                                >
                                    Promeni šifru
                                </label>
                            </div>
                            <FormInput
                                register={register}
                                errors={errors}
                                name="name"
                                src={profile}
                                placeholder="Ime"
                                type="text"
                                validationSchema={{
                                    required: 'name is required',
                                    pattern: {
                                        value: /[A-Za-z]/,
                                        message: 'invalid name value',
                                    },
                                }}
                                defaultValue={user?.name}
                                isEditable={true}
                                style={
                                    editName
                                        ? styles.editableInput
                                        : styles.disabledInput
                                }
                                handleEditClick={() => setEditName(true)}
                                handleOnBlur={() => setEditName(false)}
                            />
                            <FormInput
                                register={register}
                                errors={errors}
                                name="surname"
                                src={profile}
                                placeholder="Prezime"
                                type="text"
                                validationSchema={{
                                    required: 'surname is required',
                                    pattern: {
                                        value: /[A-Za-z]/,
                                        message: 'invalid surname value',
                                    },
                                }}
                                isEditable={true}
                                style={
                                    editSurname
                                        ? styles.editableInput
                                        : styles.disabledInput
                                }
                                defaultValue={user?.surname}
                                handleOnBlur={() => setEditSurname(false)}
                                handleEditClick={() => setEditSurname(true)}
                            />
                            <FormInput
                                register={register}
                                errors={errors}
                                name="email"
                                src={email}
                                placeholder="Email"
                                type="text"
                                validationSchema={{
                                    required: 'email is required',
                                    pattern: {
                                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                        message: 'invalid email value',
                                    },
                                }}
                                style={styles.emailInput}
                                defaultValue={user?.email}
                            />

                            <FormInput
                                register={register}
                                errors={errors}
                                name="phoneNumber"
                                src={mobile}
                                placeholder=""
                                type="number"
                                validationSchema={{
                                    required: 'telephone number is required',
                                    pattern: {
                                        value: /^[0-9]{6,}$/,
                                        message:
                                            'invalid telephone number value',
                                    },
                                }}
                                isPhoneNumber={true}
                                isEditable={true}
                                style={
                                    editPhoneNumber
                                        ? styles.editableInput
                                        : styles.disabledInput
                                }
                                defaultValue={user?.phoneNumber}
                                handleOnBlur={() => setEditPhoneNumber(false)}
                                handleEditClick={() => setEditPhoneNumber(true)}
                            />
                            {showPasswordModal && (
                                <PasswordChangeModal
                                    modalIsOpen={showPasswordModal}
                                    closeModal={() =>
                                        setShowPasswordModal(false)
                                    }
                                />
                            )}
                            <button className={styles.formButton}>
                                Potvrdi
                            </button>
                        </form>
                    </div>
                </div>
                {isMobile ? <MobileFooter /> : <Footer />}
            </div>
        </div>
    )
}

export default EditProfilePage
