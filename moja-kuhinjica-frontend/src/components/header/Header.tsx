import React, { useState } from 'react'
import Image from 'next/image'
import styles from './Header.module.scss'
import logo from '../../../public/static/assets/images/logo-moja-klopica.svg'

const Header = () => {
    const [active, setActive] = useState(1)

    return (
        <div className={styles.wrapper}>
            <div className={styles.logoWrapper}>
                <Image src={logo} alt="" className={styles.logoImage} />
            </div>
            <div className={styles.buttonWrapper}>
                <button
                    className={
                        active === 1
                            ? styles.navButtonSelected
                            : styles.navButton
                    }
                    onClick={() => setActive(1)}
                >
                    Početna
                </button>
                <button
                    className={
                        active === 2
                            ? styles.navButtonSelected
                            : styles.navButton
                    }
                    onClick={() => setActive(2)}
                >
                    Meni
                </button>
                <button
                    className={
                        active === 3
                            ? styles.navButtonSelected
                            : styles.navButton
                    }
                    onClick={() => setActive(3)}
                >
                    O nama
                </button>
            </div>
        </div>
    )
}

export default Header
