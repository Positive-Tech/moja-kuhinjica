import React from 'react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { Footer } from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import { FormInput } from '@/components/input/FormInput'
import Menu from '../../components/mobileMenu'
import { MobileHeader } from '@/components/header/mobileHeader/MobileHeader'
import { MobileFooter } from '@/components/footer/mobileFooter/MobileFooter'
import email from 'public/static/assets/images/email.svg'
import profile from 'public/static/assets/images/profile.svg'
import mobile from 'public/static/assets/images/mobile.svg'
import profileIcon from 'public/static/assets/images/profileHeader.svg'
import { MOBILE_WIDTH } from '@/constants/constants'
import styles from './EditProfilePage.module.scss'
import UserService from '@/service/User.service'
import { useRouter } from 'next/router'

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
    const [user, setUser] = useState<User>(emptyUser)
    const router = useRouter()
    const { id } = router.query

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
        const res = UserService.getUserById(id)
            .then((res) => {
                let user = res.data
                user.phoneNumber = user.phoneNumber.split('+381')[1]
                setUser(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    const onSubmit = (data: any): void => {
        reset()
    }
    const handleWindowResize = (): void => {
        setWindowWidth(window.innerWidth)
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
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Image src={profileIcon} alt="" />
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
                                defaultValue={user?.surname}
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
                                defaultValue={user?.email}
                            />

                            <FormInput
                                register={register}
                                errors={errors}
                                name="phoneNumber"
                                src={mobile}
                                placeholder=""
                                type="text"
                                validationSchema={{
                                    required: 'telephone number is required',
                                    pattern: {
                                        value: /^[0-9]{6,}$/,
                                        message:
                                            'invalid telephone number value',
                                    },
                                }}
                                isPhoneNumber={true}
                                defaultValue={user?.phoneNumber}
                            />
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
