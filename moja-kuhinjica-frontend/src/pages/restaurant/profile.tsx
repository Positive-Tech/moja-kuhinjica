import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Footer } from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import { LabelWithIcon } from '@/components/label/LabelWithIcon'
import { MobileHeader } from '@/components/header/mobileHeader/MobileHeader'
import { MobileFooter } from '@/components/footer/mobileFooter/MobileFooter'
import Menu from '@/components/mobileMenu'
import restaurantMap from 'public/static/assets/images/map.svg'
import clock from 'public/static/assets/images/clock.svg'
import location from 'public/static/assets/images/location.svg'
import telephone from 'public/static/assets/images/telephone.svg'
import restaurantPic from 'public/static/assets/images/restaurantGallery.svg'
import { MOBILE_WIDTH } from '@/constants/constants'
import { useTranslation } from 'react-i18next'

const Profile = (): JSX.Element => {
    const { t } = useTranslation()
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
        <div className="profilePage">
            {showMenu && <Menu closeMenu={() => setShowMenu(false)} />}
            {isMobile ? (
                <MobileHeader handleClick={() => setShowMenu(true)} />
            ) : (
                <Header type="red" selectedButton={0} />
            )}
            <div className="profilePage__wrapper">
                <div className="profilePage__wrapper__container">
                    <div className="profilePage__wrapper__container__mainContainer">
                        <div className="profilePage__wrapper__container__mainContainer__mainWrapper">
                            <div className="profilePage__wrapper__container__mainContainer__mainWrapper__contentContainer">
                                <label className="profilePage__wrapper__container__mainContainer__mainWrapper__contentContainer__name">
                                    Restoran Top Food 021
                                </label>

                                <LabelWithIcon
                                    src={clock}
                                    content="Ponedeljak-Petak, 12h-15h"
                                    style="profilePage__wrapper__container__mainContainer__mainWrapper__contentContainer__infoLabel"
                                />
                                <LabelWithIcon
                                    src={location}
                                    style="profilePage__wrapper__container__mainContainer__mainWrapper__contentContainer__infoLabel"
                                    content="Svetozara Miletića 26, 21000 Novi Sad"
                                />
                                <LabelWithIcon
                                    style="profilePage__wrapper__container__mainContainer__mainWrapper__contentContainer__infoLabel"
                                    src={telephone}
                                    content="0644226471"
                                />
                                <label className="profilePage__wrapper__container__mainContainer__mainWrapper__contentContainer__description">
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
                            <div className="profilePage__wrapper__container__mainContainer__mainWrapper__pictureWrapper">
                                <Image
                                    src={restaurantMap}
                                    alt=""
                                    className="profilePage__wrapper__container__mainContainer__mainWrapper__pictureWrapper__mapImage"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="profilePage__galleryWrapper">
                <label className="profilePage__galleryWrapper__title">
                    {t('Galerija')}
                </label>
                <div className="profilePage__galleryWrapper__galleryColDiv">
                    {!isMobile && (
                        <div className="profilePage__galleryWrapper__galleryColDiv__grid">
                            <Image
                                src={restaurantPic}
                                alt=""
                                className="profilePage__galleryWrapper__galleryColDiv__grid__gridImage"
                            />
                            <Image
                                src={restaurantPic}
                                alt=""
                                className="profilePage__galleryWrapper__galleryColDiv__grid__gridImage"
                            />
                            <Image
                                src={restaurantPic}
                                alt=""
                                className="profilePage__galleryWrapper__galleryColDiv__grid__gridImage"
                            />
                            <Image
                                src={restaurantPic}
                                alt=""
                                className="profilePage__galleryWrapper__galleryColDiv__grid__gridImage"
                            />
                            <Image
                                src={restaurantPic}
                                alt=""
                                className="profilePage__galleryWrapper__galleryColDiv__grid__gridImage"
                            />
                            <Image
                                src={restaurantPic}
                                alt=""
                                className="profilePage__galleryWrapper__galleryColDiv__grid__gridImage"
                            />
                        </div>
                    )}
                    {isMobile && (
                        <div className="profilePage__galleryWrapper__galleryColDiv__gallerySlider">
                            <Image
                                src={restaurantPic}
                                alt=""
                                style={{ width: '200px', height: '180px' }}
                                className="profilePage__galleryWrapper__galleryColDiv__grid__gridImage"
                            />
                            <Image
                                src={restaurantPic}
                                alt=""
                                style={{ width: '200px', height: '180px' }}
                                className="profilePage__galleryWrapper__galleryColDiv__grid__gridImage"
                            />
                            <Image
                                src={restaurantPic}
                                alt=""
                                style={{ width: '200px', height: '180px' }}
                                className="profilePage__galleryWrapper__galleryColDiv__grid__gridImage"
                            />
                        </div>
                    )}
                </div>
            </div>
            {isMobile ? <MobileFooter /> : <Footer />}
        </div>
    )
}

export default Profile
