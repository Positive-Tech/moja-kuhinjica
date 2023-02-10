import React from 'react'
import Image from 'next/image'
import styles from './Menu.module.scss'
import closeIcon from '../../../public/static/assets/images/close.svg'
import { DropdownMenuButton } from '@/components/button/DropdownMenuButton'
import homeIcon from '../../../public/static/assets/images/homeIcon.svg'
import reservationIcon from '../../../public/static/assets/images/reservationIcon.svg'
import aboutUsIcon from '../../../public/static/assets/images/aboutUsIcon.svg'
import myReservations from '../../../public/static/assets/images/myReservations.svg'
import editProfile from '../../../public/static/assets/images/editProfile.svg'
import logout from '../../../public/static/assets/images/logout.svg'
import profile from '../../../public/static/assets/images/profileHeader.svg'

import { useRouter } from 'next/router'
interface IMenuProps {
    closeMenu: () => void
}
const Menu = ({ closeMenu }: IMenuProps) => {
    const router = useRouter()

    const navigate = (url: string) => {
        closeMenu()
        router.push(url)
    }
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.closeButtonWrapper}>
                    <div className={styles.userNameWrapper}>
                        <div className={styles.pictureWrapper}>
                            <Image
                                src={profile}
                                alt=""
                                className={styles.profilePicture}
                            />
                        </div>
                        <label className={styles.userName}>Pera Peric</label>
                    </div>
                    <Image src={closeIcon} alt="" onClick={closeMenu} />
                </div>
                <div className={styles.buttonWrapper}>
                    <DropdownMenuButton
                        content="Početna"
                        src={homeIcon}
                        style={styles.button}
                        handleClick={() => navigate('/')}
                    />
                    <DropdownMenuButton
                        content="Rezerviši"
                        src={reservationIcon}
                        style={styles.button}
                    />
                    <DropdownMenuButton
                        content="Moje rezervacije"
                        src={myReservations}
                        style={styles.button}
                        handleClick={() => navigate('/myReservations')}
                    />
                    <DropdownMenuButton
                        content="Izmena profila"
                        src={editProfile}
                        style={styles.button}
                    />
                    <DropdownMenuButton
                        content="O nama"
                        src={aboutUsIcon}
                        style={styles.button}
                    />
                    <DropdownMenuButton
                        content="Odjavi se"
                        src={logout}
                        style={styles.button}
                    />
                </div>
            </div>
        </div>
    )
}

export default Menu
