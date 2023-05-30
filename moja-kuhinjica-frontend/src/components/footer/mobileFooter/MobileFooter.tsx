import React from 'react'
import Image from 'next/image'
import location from 'public/static/assets/images/blackLocation.svg'
import earth from 'public/static/assets/images/blackEarth.svg'
import circle from 'public/static/assets/images/blackCircle.svg'
interface IMobileFooterProps {
    style?: string
}
export const MobileFooter = ({ style }: IMobileFooterProps): JSX.Element => {
    return (
        <div className={`mobileFooterContainer ${style}`}>
            <div className="mobileFooterContainer__wrapper">
                <button className="mobileFooterContainer__wrapper__mobileButton">
                    Početna
                </button>
                <button className="mobileFooterContainer__wrapper__mobileButton">
                    Ponuda
                </button>
                <button className="mobileFooterContainer__wrapper__mobileButton">
                    O nama
                </button>
                <div className="mobileFooterContainer__wrapper__bottomDiv">
                    <Image
                        className="mobileFooterContainer__wrapper__bottomDiv__footerImage"
                        src={location}
                        alt=""
                    />

                    <label className="mobileFooterContainer__wrapper__bottomDiv__footerLabel">
                        Srbija
                    </label>
                    <Image
                        className="mobileFooterContainer__wrapper__bottomDiv__footerImage"
                        src={earth}
                        alt=""
                    />
                    <label className="mobileFooterContainer__wrapper__bottomDiv__footerLabel">
                        Srpski
                    </label>
                    <Image
                        className="mobileFooterContainer__wrapper__bottomDiv__footerImage"
                        src={circle}
                        alt=""
                    />
                    <label className="mobileFooterContainer__wrapper__bottomDiv__footerLabel">
                        Moja klopica 2022
                    </label>
                </div>
            </div>
        </div>
    )
}
