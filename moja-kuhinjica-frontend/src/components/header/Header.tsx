import React, { useState } from 'react'
import Image from 'next/image'
import styles from './Header.module.scss'
import logo from '../../../public/static/assets/images/logo-moja-klopica.svg'
import { HeaderButton } from '../button/HeaderButton'
import { useRouter } from 'next/router'
interface IHeaderProps {
    type: string
}
const Header = ({ type }: IHeaderProps) => {
    const [active, setActive] = useState(type === 'main' ? 1 : 0)
    const router = useRouter()

    const handleClick = (buttonNumber: number, url: string) => {
        setActive(buttonNumber)
        router.push(url)
    }

    return (
        <div
            className={
                type === 'profile' ? styles.profileWrapper : styles.wrapper
            }
        >
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
                    onClick={() => handleClick(2, '/')}
                    content="Ponuda"
                    headerType={type}
                />
                <HeaderButton
                    active={active === 3}
                    onClick={() => handleClick(3, '/')}
                    content="O nama"
                    headerType={type}
                />
            </div>
        </div>
    )
}

export default Header
