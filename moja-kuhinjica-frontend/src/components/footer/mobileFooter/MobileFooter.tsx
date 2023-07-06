import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { routes } from '@/constants/constants'
import Image from 'next/image'
import location from 'public/static/assets/images/blackLocation.svg'
import earth from 'public/static/assets/images/blackEarth.svg'
import circle from 'public/static/assets/images/blackCircle.svg'
import { useTranslation } from 'react-i18next'
interface IMobileFooterProps {
    style?: string
    selectedButton?: number
}
export const MobileFooter = ({
    style,
    selectedButton,
}: IMobileFooterProps): JSX.Element => {
    const { t } = useTranslation()
    const [active, setActive] = useState<number | undefined>(selectedButton)
    const router = useRouter()

    const handleClick = (
        buttonNumber: number | undefined,
        url: string
    ): void => {
        setActive(buttonNumber)
        router.push(url)
    }
    return (
        <div className={`mobileFooterContainer ${style}`}>
            <div className="mobileFooterContainer__wrapper">
                <button
                    className="mobileFooterContainer__wrapper__mobileButton"
                    onClick={() => handleClick(1, routes.HOME_PAGE)}
                >
                    {t('Početna')}
                </button>
                <button
                    className="mobileFooterContainer__wrapper__mobileButton"
                    onClick={() => handleClick(2, routes.MEAL_RESERVATION_PAGE)}
                >
                    {t('Ponuda')}
                </button>
                <button
                    className="mobileFooterContainer__wrapper__mobileButton"
                    onClick={() => handleClick(3, routes.ABOUT_US_PAGE)}
                >
                    {t('O nama')}
                </button>
                <div className="mobileFooterContainer__wrapper__bottomDiv">
                    <Image
                        className="mobileFooterContainer__wrapper__bottomDiv__footerImage"
                        src={location}
                        alt=""
                    />

                    <label className="mobileFooterContainer__wrapper__bottomDiv__footerLabel">
                        {t('Srbija')}
                    </label>
                    <Image
                        className="mobileFooterContainer__wrapper__bottomDiv__footerImage"
                        src={earth}
                        alt=""
                    />
                    <label className="mobileFooterContainer__wrapper__bottomDiv__footerLabel">
                        {t('Srpski')}
                    </label>
                    <Image
                        className="mobileFooterContainer__wrapper__bottomDiv__footerImage"
                        src={circle}
                        alt=""
                    />
                    <label className="mobileFooterContainer__wrapper__bottomDiv__footerLabel">
                        {t('Moja klopica 2022')}
                    </label>
                </div>
            </div>
        </div>
    )
}
