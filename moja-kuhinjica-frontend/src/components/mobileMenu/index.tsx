import React from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/utils/hooks'
import { userLogout } from '@/reduxStore/reducers/userReducer'
import Image from 'next/image'
import { DropdownMenuButton } from '@/components/button/DropdownMenuButton'
import closeIcon from 'public/static/assets/images/close.svg'
import homeIcon from 'public/static/assets/images/homeIcon.svg'
import reservationIcon from 'public/static/assets/images/reservationIcon.svg'
import aboutUsIcon from 'public/static/assets/images/aboutUsIcon.svg'
import myReservations from 'public/static/assets/images/myReservations.svg'
import editProfile from 'public/static/assets/images/editProfile.svg'
import logoutIcon from 'public/static/assets/images/logout.svg'
import profile from 'public/static/assets/images/profileHeader.svg'
import { routes } from '@/constants/constants'
import LanguageChanger from '../LanguageChanger'
import { useTranslation } from 'react-i18next'

interface IMenuProps {
    closeMenu: () => void
}

const Menu = ({ closeMenu }: IMenuProps): JSX.Element => {
    const { t } = useTranslation()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const isAuthorized = useAppSelector(
        ({ auth: { isAuthorized } }) => isAuthorized
    )
    const user = useAppSelector(({ auth: { user } }) => user)

    const navigate = (url: string): void => {
        closeMenu()
        router.push(url)
    }

    const logout = (): void => {
        dispatch(userLogout())
        navigate(routes.HOME_PAGE)
    }

    return (
        <div className="mobileMenuContainer">
            <div className="mobileMenuContainer__wrapper">
                <LanguageChanger />

                <div className="mobileMenuContainer__wrapper__closeButtonWrapper">
                    {isAuthorized && (
                        <div className="mobileMenuContainer__wrapper__closeButtonWrapper__userNameWrapper">
                            <div className="mobileMenuContainer__wrapper__closeButtonWrapper__pictureWrapper">
                                <Image
                                    src={profile}
                                    alt=""
                                    className="mobileMenuContainer__wrapper__closeButtonWrapper__pictureWrapper__profilePicture"
                                />
                            </div>
                            <label className="mobileMenuContainer__wrapper__closeButtonWrapper__userName">
                                {user?.name}&nbsp;
                                {user?.surname}
                            </label>
                        </div>
                    )}
                    <Image src={closeIcon} alt="" onClick={closeMenu} />
                </div>
                <div className="mobileMenuContainer__wrapper__buttonWrapper">
                    <DropdownMenuButton
                        content={t("Početna")}
                        src={homeIcon}
                        style="mobileMenuContainer__wrapper__buttonWrapper__button"
                        handleClick={() => navigate(routes.HOME_PAGE)}
                    />
                    <DropdownMenuButton
                        content={t("Rezerviši")}
                        src={reservationIcon}
                        style="mobileMenuContainer__wrapper__buttonWrapper__button"
                        handleClick={() =>
                            navigate(
                                isAuthorized
                                    ? routes.MEAL_RESERVATION_PAGE
                                    : routes.LOGIN_PAGE
                            )
                        }
                    />
                    {isAuthorized && (
                        <DropdownMenuButton
                            content={t("Moje rezervacije")}
                            src={myReservations}
                            style="mobileMenuContainer__wrapper__buttonWrapper__button"
                            handleClick={() =>
                                navigate(routes.MEAL_RESERVATION_PAGE)
                            }
                        />
                    )}
                    {isAuthorized && (
                        <DropdownMenuButton
                            content={t("Izmena profila")}
                            src={editProfile}
                            style="mobileMenuContainer__wrapper__buttonWrapper__button"
                            handleClick={() =>
                                navigate(
                                    `${routes.EDIT_PROFILE_PAGE}/${user?.id}`
                                )
                            }
                        />
                    )}
                    <DropdownMenuButton
                        content={t("O nama")}
                        src={aboutUsIcon}
                        style="mobileMenuContainer__wrapper__buttonWrapper__button"
                        handleClick={() => navigate(routes.ABOUT_US_PAGE)}
                    />
                    {isAuthorized && (
                        <DropdownMenuButton
                            content={t("Odjavi se")}
                            src={logoutIcon}
                            style="mobileMenuContainer__wrapper__buttonWrapper__button"
                            handleClick={() => logout()}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Menu
