import React from 'react'
import Image from 'next/image'
import styles from './Footer.module.scss'
import logo from '../../../public/static/assets/images/logo-footer.svg'
import circle from '../../../public/static/assets/images/c-circle.svg'
import location from '../../../public/static/assets/images/locationFooter.svg'
import earth from '../../../public/static/assets/images/earth.svg'

export const Footer = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.rowDiv1}>
                <div className={styles.rowDiv2}>
                    <div className={styles.imageWrapper}>
                        <Image src={logo} alt="" />
                    </div>
                    <Image
                        className={styles.footerImage}
                        src={location}
                        alt=""
                    />

                    <label className={styles.footerLabel}>Srbija</label>
                    <Image className={styles.footerImage} src={earth} alt="" />
                    <label className={styles.footerLabel}>Srpski</label>
                </div>
                <div className={styles.rowDiv3}>
                    <label className={styles.footerLabel}>
                        Uslovi korišćenja
                    </label>
                    <label className={styles.footerLabel}>
                        Politika privatnosti
                    </label>
                    <label className={styles.footerLabel}>FAQ</label>
                    <Image className={styles.footerImage} src={circle} alt="" />
                    <label className={styles.footerLabel}>
                        Moja klopica 2022
                    </label>
                </div>
            </div>
        </div>
    )
}
