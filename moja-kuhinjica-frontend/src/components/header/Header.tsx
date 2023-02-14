import React, { useState } from 'react'
import Image from 'next/image'
import { HeaderButton } from '../button/HeaderButton'
import { useRouter } from 'next/router'
import { DropdownMenuButton } from '../button/DropdownMenuButton'
import logo from '../../../public/static/assets/images/logo-moja-klopica.svg'
import profileIcon from '../../../public/static/assets/images/profileHeader.svg'
import logoutIcon from '../../../public/static/assets/images/logout.svg'
import editProfileIcon from '../../../public/static/assets/images/editProfile.svg'
import myReservationsIcon from '../../../public/static/assets/images/myReservations.svg'
import styles from './Header.module.scss'
interface IHeaderProps {
    type: string
    selectedButton?: number
    openLoginModal?: (param: boolean) => void
}
const Header = ({ type, selectedButton, openLoginModal }: IHeaderProps) => {
    const [active, setActive] = useState<number>(
        selectedButton ? selectedButton : 0
    )
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)
    const router = useRouter()
    const jwt = null

    const handleClick = (buttonNumber: number, url: string) => {
        setActive(buttonNumber)
        router.push(url)
    }

    const handleOpen = () => {
        setMenuIsOpen(!menuIsOpen)
    }

    const handleReservationClick = (buttonNumber: number, url: string) => {
        setActive(buttonNumber)
        if (!!jwt) router.push(url)
        openLoginModal?.(true)
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
                    onClick={() => handleReservationClick(2, '/reservation')}
                    content="Rezerviši"
                    headerType={type}
                />
                <HeaderButton
                    active={active === 3}
                    onClick={() => handleClick(3, '/aboutUs')}
                    content="O nama"
                    headerType={type}
                />
                {jwt == null && type === 'red' && (
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
                                            router.push('/editProfile')
                                        }
                                    />
                                    <DropdownMenuButton
                                        content="Odjavi me"
                                        src={logoutIcon}
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
