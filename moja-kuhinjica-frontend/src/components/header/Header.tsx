import React, { useState } from 'react'
import Image from 'next/image'
import styles from './Header.module.scss'
import logo from '../../../public/static/assets/images/logo-moja-klopica.svg'
import { HeaderButton } from '../button/HeaderButton'

const Header = () => {
    const [active, setActive] = useState(1)

    return (
        <div className={styles.wrapper}>
            <div className={styles.logoWrapper}>
                <Image src={logo} alt="" className={styles.logoImage} />
            </div>
            <div className={styles.buttonWrapper}>
                <HeaderButton
                    active={active}
                    setActive={setActive}
                    buttonNumber={1}
                    content="Početna"
                />
                <HeaderButton
                    active={active}
                    setActive={setActive}
                    buttonNumber={2}
                    content="Ponuda"
                />
                <HeaderButton
                    active={active}
                    setActive={setActive}
                    buttonNumber={3}
                    content="O nama"
                />
            </div>
        </div>
    )
}

export default Header
