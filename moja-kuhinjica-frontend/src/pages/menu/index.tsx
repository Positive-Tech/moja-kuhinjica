import React from 'react'
import Image from 'next/image'
import styles from './Menu.module.scss'
import closeIcon from '../../../public/static/assets/images/close.svg'
import { DropdownMenuButton } from '@/components/button/DropdownMenuButton'
import homeIcon from '../../../public/static/assets/images/homeIcon.svg'
import reservationIcon from '../../../public/static/assets/images/reservationIcon.svg'
import aboutUsIcon from '../../../public/static/assets/images/aboutUsIcon.svg'
import { useRouter } from 'next/router'
interface IMenuProps {
    closeMenu: () => void
}
const Menu = ({ closeMenu }: IMenuProps) => {
    const router = useRouter()

    const goToHomePage = () => {
        closeMenu()
        router.push('/')
    }
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.closeButtonWrapper}>
                    <Image src={closeIcon} alt="" onClick={closeMenu} />
                </div>
                <div className={styles.buttonWrapper}>
                    <DropdownMenuButton
                        content="Početna"
                        src={homeIcon}
                        style={styles.button}
                        handleClick={() => goToHomePage()}
                    />
                    <DropdownMenuButton
                        content="Rezerviši"
                        src={reservationIcon}
                        style={styles.button}
                    />
                    <DropdownMenuButton
                        content="O nama"
                        src={aboutUsIcon}
                        style={styles.button}
                    />
                </div>
            </div>
        </div>
    )
}

export default Menu
