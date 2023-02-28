import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Menu.module.scss'
import closeIcon from '../../../public/static/assets/images/close.svg'
import { DropdownMenuButton } from '@/components/button/DropdownMenuButton'
import homeIcon from '../../../public/static/assets/images/homeIcon.svg'
import reservationIcon from '../../../public/static/assets/images/reservationIcon.svg'
import aboutUsIcon from '../../../public/static/assets/images/aboutUsIcon.svg'
import myReservations from '../../../public/static/assets/images/myReservations.svg'
import editProfile from '../../../public/static/assets/images/editProfile.svg'
import logoutIcon from '../../../public/static/assets/images/logout.svg'
import profile from '../../../public/static/assets/images/profileHeader.svg'

import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/utils/hooks'
import { userLogout } from '@/reduxStore/actions/userActions'
interface IMenuProps {
    closeMenu: () => void
}
interface LoggedInUser {
    id: number
    name: string
    surname: string
    phoneNumber: string
    role: string
}

const Menu = ({ closeMenu }: IMenuProps): JSX.Element => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const isAuthorized = useAppSelector((state) => state.auth.isAuthorized)
    const user = useAppSelector((state) => state.auth.user)

    // useEffect(() => {
    //     if (loggedIn) fetchLoggedInUser()
    // }, [loggedIn])

    // const fetchLoggedInUser = (): void => {
    //     UserService.getLoggedInUser()
    //         .then((res) => {
    //             setUser(res.data)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    const navigate = (url: string): void => {
        closeMenu()
        router.push(url)
    }

    const logout = (): void => {
        dispatch(userLogout())
        navigate('/')
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.closeButtonWrapper}>
                    {isAuthorized && (
                        <div className={styles.userNameWrapper}>
                            <div className={styles.pictureWrapper}>
                                <Image
                                    src={profile}
                                    alt=""
                                    className={styles.profilePicture}
                                />
                            </div>
                            <label className={styles.userName}>
                                {user?.name}&nbsp;
                                {user?.surname}
                            </label>
                        </div>
                    )}
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
                        handleClick={() => navigate('/mealReservation')}
                    />
                    {isAuthorized && (
                        <DropdownMenuButton
                            content="Moje rezervacije"
                            src={myReservations}
                            style={styles.button}
                            handleClick={() => navigate('/myReservations')}
                        />
                    )}
                    {isAuthorized && (
                        <DropdownMenuButton
                            content="Izmena profila"
                            src={editProfile}
                            style={styles.button}
                            handleClick={() =>
                                navigate(`/editProfile/${user?.id}`)
                            }
                        />
                    )}
                    <DropdownMenuButton
                        content="O nama"
                        src={aboutUsIcon}
                        style={styles.button}
                    />
                    {isAuthorized && (
                        <DropdownMenuButton
                            content="Odjavi se"
                            src={logoutIcon}
                            style={styles.button}
                            handleClick={() => logout()}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Menu
