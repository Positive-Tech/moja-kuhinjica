import React from 'react'
import Image from 'next/image'
import { Footer } from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import { LabelWithIcon } from '@/components/label/LabelWithIcon'
import styles from './Profile.module.scss'
import restaurantMap from '../../../public/static/assets/images/map.svg'
import clock from '../../../public/static/assets/images/clock.svg'
import location from '../../../public/static/assets/images/location.svg'
import telephone from '../../../public/static/assets/images/telephone.svg'
import restaurantPic from '../../../public/static/assets/images/restaurantGallery.svg'

const Profile = () => {
    return (
        <div className={styles.colDiv}>
            <Header type="profile" selectedButton={0} />
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.colDiv1}>
                        <div className={styles.rowDiv1}>
                            <div className={styles.contentContainer}>
                                <label className={styles.name}>
                                    Restoran Top Food 021
                                </label>
                                <LabelWithIcon
                                    src={clock}
                                    content="Ponedeljak-Petak, 12h-15h"
                                />
                                <LabelWithIcon
                                    src={location}
                                    content="Svetozara Miletića 26, 21000 Novi Sad"
                                />
                                <LabelWithIcon
                                    src={telephone}
                                    content="0644226471"
                                />
                                <label className={styles.description}>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nullam mi elit, commodo nec
                                    ante id, ornare efficitur dui. Nulla in quam
                                    sed ex aliquam feugiat. In varius risus est,
                                    sed placerat tortor mollis a. Donec nec
                                    aliquet ante. Duis dictum, enim vel feugiat
                                    ultrices, sapien massa lobortis erat, non
                                    mollis libero nisl quis quam. Nunc tristique
                                    eget metus a dictum.
                                </label>
                            </div>

                            <Image
                                src={restaurantMap}
                                alt=""
                                className={styles.mapImage}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.galleryWrapper}>
                <div className={styles.galleryColDiv}>
                    <label className={styles.title}>Galerija</label>
                    <div className={styles.grid}>
                        <Image src={restaurantPic} alt="" />
                        <Image src={restaurantPic} alt="" />
                        <Image src={restaurantPic} alt="" />
                        <Image src={restaurantPic} alt="" />
                        <Image src={restaurantPic} alt="" />
                        <Image src={restaurantPic} alt="" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile
