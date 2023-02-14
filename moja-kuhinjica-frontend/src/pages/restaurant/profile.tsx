import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Footer } from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import { LabelWithIcon } from '@/components/label/LabelWithIcon'
import { LoginModal } from '@/components/modal/login/LoginModal'
import { MobileHeader } from '@/components/header/mobileHeader/MobileHeader'
import { MobileFooter } from '@/components/footer/mobileFooter/MobileFooter'
import Menu from '@/components/mobileMenu'
import restaurantMap from 'public/static/assets/images/map.svg'
import clock from 'public/static/assets/images/clock.svg'
import location from 'public/static/assets/images/location.svg'
import telephone from 'public/static/assets/images/telephone.svg'
import restaurantPic from 'public/static/assets/images/restaurantGallery.svg'
import styles from './Profile.module.scss'
import { MOBILE_WIDTH } from '@/constants/constants'

const Profile = (): JSX.Element => {
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const [showMenu, setShowMenu] = useState<boolean>(false)

    const handleWindowResize = (): void => {
        setWindowWidth(window.innerWidth)
    }

    useEffect(() => {
        handleWindowResize()
        window.addEventListener('resize', handleWindowResize)
        if (windowWidth < MOBILE_WIDTH) setIsMobile(true)
        else setIsMobile(false)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [windowWidth])

    return (
        <div className={styles.colDiv}>
            {showMenu && <Menu closeMenu={() => setShowMenu(false)} />}
            {isMobile ? (
                <MobileHeader handleClick={() => setShowMenu(true)} />
            ) : (
                <Header
                    type="red"
                    selectedButton={0}
                    openLoginModal={setShowLoginModal}
                />
            )}
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.mainContainer}>
                        <div className={styles.mainWrapper}>
                            <div className={styles.contentContainer}>
                                <label className={styles.name}>
                                    Restoran Top Food 021
                                </label>
                                <LabelWithIcon
                                    src={clock}
                                    content="Ponedeljak-Petak, 12h-15h"
                                    style={styles.infoLabel}
                                />
                                <LabelWithIcon
                                    src={location}
                                    style={styles.infoLabel}
                                    content="Svetozara Miletića 26, 21000 Novi Sad"
                                />
                                <LabelWithIcon
                                    style={styles.infoLabel}
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
                            <div className={styles.pictureWrapper}>
                                <Image
                                    src={restaurantMap}
                                    alt=""
                                    className={styles.mapImage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.galleryWrapper}>
                <label className={styles.title}>Galerija</label>
                <div className={styles.galleryColDiv}>
                    {!isMobile && (
                        <div className={styles.grid}>
                            <Image
                                src={restaurantPic}
                                alt=""
                                className={styles.gridImage}
                            />
                            <Image
                                src={restaurantPic}
                                alt=""
                                className={styles.gridImage}
                            />
                            <Image
                                src={restaurantPic}
                                alt=""
                                className={styles.gridImage}
                            />
                            <Image
                                src={restaurantPic}
                                alt=""
                                className={styles.gridImage}
                            />
                            <Image
                                src={restaurantPic}
                                alt=""
                                className={styles.gridImage}
                            />
                            <Image
                                src={restaurantPic}
                                alt=""
                                className={styles.gridImage}
                            />
                        </div>
                    )}
                    {isMobile && <div className={styles.gallerySlider}></div>}
                </div>
            </div>
            {isMobile ? <MobileFooter /> : <Footer />}
            <LoginModal
                modalIsOpen={showLoginModal}
                closeModal={() => setShowLoginModal(false)}
            />
        </div>
    )
}

export default Profile
