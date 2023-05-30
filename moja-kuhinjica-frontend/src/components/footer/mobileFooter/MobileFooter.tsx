import React from 'react'
import Image from 'next/image'
import location from 'public/static/assets/images/blackLocation.svg'
import earth from 'public/static/assets/images/blackEarth.svg'
import circle from 'public/static/assets/images/blackCircle.svg'
import { useTranslation } from 'react-i18next'
interface IMobileFooterProps {
    style?: string
}
export const MobileFooter = ({ style }: IMobileFooterProps): JSX.Element => {
    const { t } = useTranslation()
    return (
        <div className={`mobileFooterContainer ${style}`}>
            <div className="mobileFooterContainer__wrapper">
                <button className="mobileFooterContainer__wrapper__mobileButton">
                    {t("Početna")}
                </button>
                <button className="mobileFooterContainer__wrapper__mobileButton">
                    {t("Ponuda")}
                </button>
                <button className="mobileFooterContainer__wrapper__mobileButton">
                    {t("O nama")}
                </button>
                <div className="mobileFooterContainer__wrapper__bottomDiv">
                    <Image
                        className="mobileFooterContainer__wrapper__bottomDiv__footerImage"
                        src={location}
                        alt=""
                    />

                    <label className="mobileFooterContainer__wrapper__bottomDiv__footerLabel">
                        {t("Srbija")}
                    </label>
                    <Image
                        className="mobileFooterContainer__wrapper__bottomDiv__footerImage"
                        src={earth}
                        alt=""
                    />
                    <label className="mobileFooterContainer__wrapper__bottomDiv__footerLabel">
                        {t("Srpski")}
                    </label>
                    <Image
                        className="mobileFooterContainer__wrapper__bottomDiv__footerImage"
                        src={circle}
                        alt=""
                    />
                    <label className="mobileFooterContainer__wrapper__bottomDiv__footerLabel">
                        {t("Moja klopica 2022")}
                    </label>
                </div>
            </div>
        </div>
    )
}
