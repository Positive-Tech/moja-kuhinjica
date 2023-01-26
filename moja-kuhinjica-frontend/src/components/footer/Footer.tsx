import React from 'react'
import Image from 'next/image'
import styles from './Footer.module.scss'
import logo from '../../../public/static/assets/images/logo-moja-klopica.svg'
import appleStoreButton from '../../../public/static/assets/images/appStore.svg'
import playStoreButton from '../../../public/static/assets/images/playStore.svg'
import circle from '../../../public/static/assets/images/c-circle.svg'
import location from '../../../public/static/assets/images/locationFooter.svg'
import earth from '../../../public/static/assets/images/earth.svg'
import { SVGFooterSeparator } from '../svg/SVGFooterSeparator'

export const Footer = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.colDiv1}>
                <div className={styles.rowDiv1}>
                    <div className={styles.imageWrapper}>
                        <Image src={logo} alt="" />
                    </div>
                    <div className={styles.rowDiv2}>
                        <button className={styles.navButton}>Početna</button>
                        <button className={styles.navButton}>Meni</button>
                        <button className={styles.navButton}>O nama</button>
                    </div>
                    <div className={styles.colDiv3}>
                        <Image
                            className={styles.footerButton}
                            src={appleStoreButton}
                            alt=""
                        />
                        <Image
                            className={styles.footerButton}
                            src={playStoreButton}
                            alt=""
                        />
                    </div>
                </div>
                <div className={styles.rowDiv3}>
                    <SVGFooterSeparator />
                </div>
                <div className={styles.rowDiv4}>
                    <div className={styles.rowDiv6}>
                        <Image
                            className={styles.footerImage}
                            src={location}
                            alt=""
                        />

                        <label className={styles.footerLabel}>Srbija</label>
                        <Image
                            className={styles.footerImage}
                            src={earth}
                            alt=""
                        />
                        <label className={styles.footerLabel}>Srpski</label>
                    </div>
                    <div className={styles.rowDiv5}>
                        <label className={styles.footerLabel}>
                            Uslovi korišćenja
                        </label>
                        <label className={styles.footerLabel}>
                            Politika privatnosti
                        </label>
                        <label className={styles.footerLabel}>FAQ</label>
                        <Image
                            className={styles.footerImage}
                            src={circle}
                            alt=""
                        />
                        <label className={styles.footerLabel}>
                            Moja klopica 2022
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
