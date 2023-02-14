import React from 'react'
import Image from 'next/image'
import styles from './MobileFooter.module.scss'
import location from '../../../../public/static/assets/images/blackLocation.svg'
import earth from '../../../../public/static/assets/images/blackEarth.svg'
import circle from '../../../../public/static/assets/images/blackCircle.svg'

export const MobileFooter = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <button className={styles.mobileButton}>Početna</button>
                <button className={styles.mobileButton}>Ponuda</button>
                <button className={styles.mobileButton}>O nama</button>
                <div className={styles.bottomDiv}>
                    <Image
                        className={styles.footerImage}
                        src={location}
                        alt=""
                    />

                    <label className={styles.footerLabel}>Srbija</label>
                    <Image className={styles.footerImage} src={earth} alt="" />
                    <label className={styles.footerLabel}>Srpski</label>
                    <Image className={styles.footerImage} src={circle} alt="" />
                    <label className={styles.footerLabel}>
                        Moja klopica 2022
                    </label>
                </div>
            </div>
        </div>
    )
}
