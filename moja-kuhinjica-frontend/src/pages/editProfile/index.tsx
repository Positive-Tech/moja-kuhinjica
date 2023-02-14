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
import password from '../../../public/static/assets/images/password.svg'
import mobile from 'public/static/assets/images/mobile.svg'
import profileIcon from 'public/static/assets/images/profileHeader.svg'
import { MOBILE_WIDTH } from '@/constants/constants'
import styles from './EditProfilePage.module.scss'

const EditProfilePage = (): JSX.Element => {
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const [showMenu, setShowMenu] = useState<boolean>(false)

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

    useEffect(() => {
        handleWindowResize()
        window.addEventListener('resize', handleWindowResize)
        if (windowWidth < MOBILE_WIDTH) setIsMobile(true)
        else setIsMobile(false)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [windowWidth])

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
                                placeholder="Ime i prezime"
                                type="text"
                                validationSchema={{
                                    required: 'name is required',
                                    pattern: {
                                        value: /[A-Za-z]/,
                                        message: 'invalid name value',
                                    },
                                }}
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
                            />
                            <FormInput
                                register={register}
                                errors={errors}
                                name="password"
                                src={password}
                                placeholder="Šifra"
                                type="password"
                                validationSchema={{
                                    required: 'password is required',
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                        message: 'invalid password value',
                                    },
                                }}
                            />
                            <FormInput
                                register={register}
                                errors={errors}
                                name="telephoneNumber"
                                src={mobile}
                                placeholder="Broj telefona"
                                type="text"
                                validationSchema={{
                                    required: 'telephone number is required',
                                    pattern: {
                                        value: /^[0-9]{6,}$/,
                                        message:
                                            'invalid telephone number value',
                                    },
                                }}
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
