import React, { useState } from 'react'
import Image from 'next/image'
import styles from './Header.module.scss'
import logo from '../../../public/static/assets/images/logo-moja-klopica.svg'
import { HeaderButton } from '../button/HeaderButton'
import { useRouter } from 'next/router'
interface IHeaderProps {
    type: string
    selectedButton: number
    openLoginModal?: (param: boolean) => void
}
const Header = ({ type, selectedButton, openLoginModal }: IHeaderProps) => {
    const [active, setActive] = useState<number>(selectedButton)
    const router = useRouter()

    const handleClick = (buttonNumber: number, url: string) => {
        setActive(buttonNumber)
        router.push(url)
    }

    const handleReservationClick = (buttonNumber: number, url: string) => {
        setActive(buttonNumber)
        const jwt = null
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
            </div>
        </div>
    )
}

export default Header
