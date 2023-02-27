import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { HeaderButton } from '../button/HeaderButton'
import { useRouter } from 'next/router'
import { DropdownMenuButton } from '../button/DropdownMenuButton'
import logo from 'public/static/assets/images/logo-moja-klopica.svg'
import profileIcon from 'public/static/assets/images/profileHeader.svg'
import logoutIcon from 'public/static/assets/images/logout.svg'
import editProfileIcon from 'public/static/assets/images/editProfile.svg'
import myReservationsIcon from 'public/static/assets/images/myReservations.svg'
import styles from './Header.module.scss'
import UserService from '@/service/User.service'
interface IHeaderProps {
    type: string
    selectedButton?: number
    openLoginModal?: (param: boolean) => void
    loggedIn?: boolean
    setLoggedIn?: (param: boolean) => void
}
interface LoggedInUser {
    id: number
    name: string
    surname: string
    phoneNumber: string
    role: string
}
const Header = ({
    type,
    selectedButton,
    openLoginModal,
    loggedIn,
    setLoggedIn,
}: IHeaderProps): JSX.Element => {
    const [active, setActive] = useState<number | undefined>(selectedButton)
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)
    const [user, setUser] = useState<LoggedInUser>()
    const router = useRouter()

    useEffect(() => {
        if (loggedIn) fetchLoggedInUser()
    }, [loggedIn])

    const fetchLoggedInUser = (): void => {
        UserService.getLoggedInUser()
            .then((res) => {
                setUser(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleClick = (buttonNumber: number, url: string): void => {
        setActive(buttonNumber)
        router.push(url)
    }

    const handleOpen = (): void => {
        setMenuIsOpen(!menuIsOpen)
    }

    const handleReservationClick = (
        buttonNumber: number,
        url: string
    ): void => {
        setActive(buttonNumber)
        if (loggedIn) {
            router.push(url)
            return
        }
        openLoginModal?.(true)
    }

    const logout = (): void => {
        localStorage.removeItem('token')
        setLoggedIn?.(false)
        router.push('/')
    }

    return (
        <div className={type === 'red' ? styles.redWrapper : styles.wrapper}>
            <div className={styles.logoWrapper}>
                <Image src={logo} alt="" className={styles.logoImage} />
            </div>
            <div className={styles.buttonWrapper}>
                <HeaderButton
                    active={active === 1}
                    onClick={() => handleClick(1, '/')}
                    content="Početna"
                    headerType={type}
                />
                <HeaderButton
                    active={active === 2}
                    onClick={() =>
                        handleReservationClick(2, '/mealReservation')
                    }
                    content="Rezerviši"
                    headerType={type}
                />
                <HeaderButton
                    active={active === 3}
                    onClick={() => handleClick(3, '/aboutUs')}
                    content="O nama"
                    headerType={type}
                />
                {loggedIn && (
                    <div className={styles.profileIconWrapper}>
                        <Image
                            src={profileIcon}
                            alt=""
                            className={styles.profileIcon}
                            onClick={handleOpen}
                        />
                        {menuIsOpen && (
                            <div className={styles.dropdownMenu}>
                                <div className={styles.dropDownButtonWrapper}>
                                    <DropdownMenuButton
                                        content="Moje rezervacije"
                                        src={myReservationsIcon}
                                        handleClick={() =>
                                            router.push('/myReservations')
                                        }
                                    />
                                    <DropdownMenuButton
                                        content="Izmena profila"
                                        src={editProfileIcon}
                                        handleClick={() =>
                                            router.push(
                                                `/editProfile/${user?.id}`
                                            )
                                        }
                                    />
                                    <DropdownMenuButton
                                        content="Odjavi me"
                                        src={logoutIcon}
                                        handleClick={() => logout()}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header
