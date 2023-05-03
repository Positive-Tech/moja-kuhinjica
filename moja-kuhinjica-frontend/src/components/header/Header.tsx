import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/utils/hooks'
import { userLogout } from '@/reduxStore/reducers/userReducer'
import { HeaderButton } from '../button/HeaderButton'
import { useRouter } from 'next/router'
import { DropdownMenuButton } from '../button/DropdownMenuButton'
import logo from 'public/static/assets/images/logo-moja-klopica.svg'
import profileIcon from 'public/static/assets/images/profileHeader.svg'
import logoutIcon from 'public/static/assets/images/logout.svg'
import editProfileIcon from 'public/static/assets/images/editProfile.svg'
import myReservationsIcon from 'public/static/assets/images/myReservations.svg'
import { routes, AUTH_TOKEN } from '@/constants/constants'
import { setRedirectToReservations } from '@/reduxStore/reducers/navigationReducer'
import { loadUser } from '@/reduxStore/reducers/userReducer'

const HEADER_TYPE = 'red'
interface IHeaderProps {
    type: string
    selectedButton?: number
    openLoginModal?: (shouldOpen: boolean) => void
}

const Header = ({
    type,
    selectedButton,
    openLoginModal,
}: IHeaderProps): JSX.Element => {
    const [active, setActive] = useState<number | undefined>(selectedButton)
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const isAuthorized = useAppSelector((state) => state.auth.isAuthorized)
    const user = useAppSelector((state) => state.auth.user)

    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const token = localStorage.getItem(AUTH_TOKEN)
        if (isAuthorized || token) dispatch(loadUser())
    }, [])

    useEffect(() => {
        const handler = (e: MouseEvent): void => {
            if (!menuRef.current?.contains(e.target as Node)) {
                setMenuIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
    })

    const handleUnauthorized = (): void => {
        openLoginModal?.(true)
        setActive(selectedButton)
        dispatch(setRedirectToReservations(true))
    }

    const handleClick = (
        buttonNumber: number | undefined,
        url: string
    ): void => {
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
        isAuthorized ? router.push(url) : handleUnauthorized()
    }

    const logout = (): void => {
        dispatch(userLogout())
        setMenuIsOpen(false)
        router.push(routes.HOME_PAGE)
    }

    return (
        <div
            className={
                type === HEADER_TYPE
                    ? 'headerWrapper headerWrapper--red'
                    : 'headerWrapper'
            }
        >
            <div className="headerWrapper__logoWrapper">
                <Image
                    src={logo}
                    alt=""
                    className="headerWrapper__logoWrapper__logoImage"
                />
            </div>
            <div className="headerWrapper__buttonWrapper">
                <HeaderButton
                    active={active === 1}
                    onClick={() => handleClick(1, routes.HOME_PAGE)}
                    content="Početna"
                    headerType={type}
                />
                <HeaderButton
                    active={active === 2}
                    onClick={() =>
                        handleReservationClick(2, routes.MEAL_RESERVATION_PAGE)
                    }
                    content="Rezerviši"
                    headerType={type}
                />
                <HeaderButton
                    active={active === 3}
                    onClick={() => handleClick(3, routes.ABOUT_US_PAGE)}
                    content="O nama"
                    headerType={type}
                />
                {isAuthorized && (
                    <div className="headerWrapper__buttonWrapper__profileIconWrapper">
                        <Image
                            src={profileIcon}
                            alt=""
                            className="headerWrapper__buttonWrapper__profileIconWrapper__profileIcon"
                            onClick={() => handleOpen()}
                        />
                        {menuIsOpen && (
                            <div
                                className={
                                    type === HEADER_TYPE
                                        ? 'headerWrapper__buttonWrapper__profileIconWrapper__dropdownMenu'
                                        : 'headerWrapper__buttonWrapper__profileIconWrapper__dropdownMenu headerWrapper__buttonWrapper__profileIconWrapper__dropdownMenu--home'
                                }
                                ref={menuRef}
                            >
                                <div className="headerWrapper__buttonWrapper__profileIconWrapper__dropDownButtonWrapper">
                                    <DropdownMenuButton
                                        content="Moje rezervacije"
                                        src={myReservationsIcon}
                                        handleClick={() =>
                                            router.push(
                                                routes.MY_RESERVATIONS_PAGE
                                            )
                                        }
                                    />
                                    <DropdownMenuButton
                                        content="Izmena profila"
                                        src={editProfileIcon}
                                        handleClick={() =>
                                            router.push(
                                                `${routes.EDIT_PROFILE_PAGE}/${user?.id}`
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
