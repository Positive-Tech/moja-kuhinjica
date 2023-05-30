import React from 'react'
import Image from 'next/image'
import logo from 'public/static/assets/images/logo-footer.svg'
import circle from 'public/static/assets/images/c-circle.svg'
import location from 'public/static/assets/images/locationFooter.svg'
import earth from 'public/static/assets/images/earth.svg'
import Link from 'next/link'
import { routes } from '@/constants/constants'

export const Footer = (): JSX.Element => {
    return (
        <div className="footerWrapper">
            <div className="footerWrapper__rowDiv1">
                <div className="footerWrapper__rowDiv1__rowDiv2">
                    <div className="footerWrapper__rowDiv1__rowDiv2__imageWrapper">
                        <Image src={logo} alt="" />
                    </div>
                    <Image
                        className="footerWrapper__rowDiv1__rowDiv2__footerImage"
                        src={location}
                        alt=""
                    />

                    <label className="footerWrapper__rowDiv1__rowDiv2__footerLabel">
                        Srbija
                    </label>
                    <Image
                        className="footerWrapper__rowDiv1__rowDiv2__footerImage"
                        src={earth}
                        alt=""
                    />
                    <label className="footerWrapper__rowDiv1__rowDiv2__footerLabel">
                        Srpski
                    </label>
                </div>
                <div className="footerWrapper__rowDiv1__rowDiv3">
                    <label className="footerWrapper__rowDiv1__rowDiv3__footerLabel">
                        <Link
                            className="footerWrapper__rowDiv1__rowDiv3__footerLabel__textLink"
                            href={{
                                pathname: routes.ABOUT_US_PAGE,
                                query: { activeTab: '4' },
                            }}
                        >
                            Uslovi korišćenja
                        </Link>
                    </label>

                    <label className="footerWrapper__rowDiv1__rowDiv3__footerLabel">
                        <Link
                            className="footerWrapper__rowDiv1__rowDiv3__footerLabel__textLink"
                            href={{
                                pathname: routes.ABOUT_US_PAGE,
                                query: { activeTab: '3' },
                            }}
                        >
                            Politika privatnosti
                        </Link>
                    </label>

                    <label className="footerWrapper__rowDiv1__rowDiv3__footerLabel">
                        <Link
                            className="footerWrapper__rowDiv1__rowDiv3__footerLabel__textLink"
                            href={{
                                pathname: routes.ABOUT_US_PAGE,
                                query: { activeTab: '2' },
                            }}
                        >
                            FAQ
                        </Link>
                    </label>

                    <Image
                        className="footerWrapper__rowDiv1__rowDiv3__footerImage"
                        src={circle}
                        alt=""
                    />

                    <label className="footerWrapper__rowDiv1__rowDiv3__footerLabel">
                        <Link
                            className="footerWrapper__rowDiv1__rowDiv3__footerLabel__textLink"
                            href="/"
                        >
                            Moja klopica 2022
                        </Link>
                    </label>
                </div>
            </div>
        </div>
    )
}
