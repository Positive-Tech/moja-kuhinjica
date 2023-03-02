import React from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import uuid from 'react-uuid'
import { Footer } from '@/components/footer/Footer'
import { MobileFooter } from '@/components/footer/mobileFooter/MobileFooter'
import Header from '@/components/header/Header'
import { QuestionLabel } from '@/components/label/QuestionLabel'
import { TabButton } from '@/components/button/TabButton'
import { MOBILE_WIDTH } from '@/constants/constants'
import { MobileHeader } from '@/components/header/mobileHeader/MobileHeader'
import Menu from 'src/components/mobileMenu'
import burgerMenuIcon from 'public/static/assets/images/burgerMenu.svg'
import aboutUsPic from 'public/static/assets/images/aboutUs.png'
import styles from './AboutUs.module.scss'
import AboutUsService from '@/service/AboutUs.service'

interface Question {
    id: number
    question: string
    answer: string
    deletedDate: string
}
const AboutUs = (): JSX.Element => {
    const [active, setActive] = useState<number>(1)
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [questions, setQuestions] = useState<Question[]>()

    useEffect(() => {
        handleWindowResize()
        window.addEventListener('resize', handleWindowResize)
        if (windowWidth < MOBILE_WIDTH) setIsMobile(true)
        else setIsMobile(false)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [windowWidth])

    useEffect(() => {
        fetchFAQs()
    }, [])

    const fetchFAQs = (): void => {
        AboutUsService.getFAQ()
            .then((res) => {
                setQuestions(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleWindowResize = (): void => {
        setWindowWidth(window.innerWidth)
    }

    return (
        <div className={styles.colDiv}>
            {showMenu && <Menu closeMenu={() => setShowMenu(false)} />}

            <div className={styles.wrapper}>
                <label className={styles.title}>DUNDA</label>
            </div>
            {isMobile ? (
                <MobileHeader
                    handleClick={() => setShowMenu(true)}
                    showProfileIcon={false}
                    style={styles.aboutUsHeader}
                    src={burgerMenuIcon}
                />
            ) : (
                <Header type="main" selectedButton={3} />
            )}
            <div className={styles.bottomWrapper}>
                <div className={styles.menuRowDiv}>
                    <TabButton
                        active={active === 1}
                        onClick={() => setActive(1)}
                        content="O nama"
                        style={styles.tabButton}
                    />
                    <TabButton
                        active={active === 2}
                        onClick={() => setActive(2)}
                        style={styles.tabButton}
                        content="FAQ"
                    />
                    <TabButton
                        active={active === 3}
                        onClick={() => setActive(3)}
                        style={styles.tabButton}
                        content="Politika privatnosti"
                    />
                    <TabButton
                        active={active === 4}
                        onClick={() => setActive(4)}
                        style={styles.tabButton}
                        content="Uslovi korišćenja"
                    />
                </div>
                <div className={styles.tabWrapper}>
                    {active === 1 && (
                        <div className={styles.aboutUsContainer}>
                            <div className={styles.aboutUsWrapper}>
                                <div className={styles.pictureWrapper}>
                                    <Image
                                        src={aboutUsPic}
                                        alt=""
                                        className={styles.aboutUsPicture}
                                    />
                                </div>
                                <div className={styles.content}>
                                    <label className={styles.contentTitle}>
                                        Lorem ipsum?
                                    </label>
                                    <label className={styles.contentText}>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Nullam mi elit, commodo
                                        nec ante id, ornare efficitur dui.
                                        Nullam mi elit, commodo nec ante id,
                                        ornare effiLorem ipsum dolor sit amet,
                                        consectetur adipiscing elit. Nullam mi
                                        elit, commodo nec ante id, ornare
                                        efficitur dui.
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                    {active === 2 && (
                        <div className={styles.FAQContainer}>
                            {questions &&
                                questions.map((element) => {
                                    return (
                                        <QuestionLabel
                                            key={uuid()}
                                            question={element.question}
                                            answer={element.answer}
                                        />
                                    )
                                })}
                        </div>
                    )}
                    {active === 3 && (
                        <div className={styles.privacyInfoContainer}>
                            <label className={styles.infoTitle}>
                                DUNDA Obaveštenje o privatnosti
                            </label>
                            <label className={styles.infoText}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Vivamus quis dolor nec dui
                                auctor lobortis. Ut placerat velit eu placerat
                                molestie. Suspendisse auctor quis quam in
                                semper. Sed ornare laoreet vulputate. Cras sed
                                placerat elit, vitae mattis sapien. Mauris a ex
                                eu eros tempor congue. Sed eget lacinia massa,
                                sit amet ullamcorper erat. Nam elementum dui ut
                                ante porta venenatis at a dolor. Proin
                                vestibulum felis non aliquet posuere. Donec quis
                                pharetra odio. Sed rhoncus tellus leo, in
                                elementum turpis iaculis ac. Nullam ut magna
                                felis. Sed egestas dui id eleifend ullamcorper.
                                Curabitur nisi lorem, bibendum et eleifend et,
                                gravida et erat. Maecenas ac varius ipsum.
                                Nullam blandit enim leo, a tristique justo
                                scelerisque sit amet. Sed dui dolor, convallis
                                id elementum non, mollis eget massa. Proin et
                                egestas nisi. Donec feugiat nibh quis arcu
                                rutrum efficitur. Nam eget venenatis odio, at
                                mattis lectus. Donec commodo id metus a
                                tristique. Vestibulum at dui quis risus
                            </label>
                        </div>
                    )}
                    {active === 4 && (
                        <div className={styles.privacyInfoContainer}>
                            <label className={styles.infoTitle}>
                                DUNDA Uslovi korišćenja
                            </label>
                            <label className={styles.infoText}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Vivamus quis dolor nec dui
                                auctor lobortis. Ut placerat velit eu placerat
                                molestie. Suspendisse auctor quis quam in
                                semper. Sed ornare laoreet vulputate. Cras sed
                                placerat elit, vitae mattis sapien. Mauris a ex
                                eu eros tempor congue. Sed eget lacinia massa,
                                sit amet ullamcorper erat. Nam elementum dui ut
                                ante porta venenatis at a dolor. Proin
                                vestibulum felis non aliquet posuere. Donec quis
                                pharetra odio. Sed rhoncus tellus leo, in
                                elementum turpis iaculis ac. Nullam ut magna
                                felis. Sed egestas dui id eleifend ullamcorper.
                                Curabitur nisi lorem, bibendum et eleifend et,
                                gravida et erat. Maecenas ac varius ipsum.
                                Nullam blandit enim leo, a tristique justo
                                scelerisque sit amet. Sed dui dolor, convallis
                                id elementum non, mollis eget massa. Proin et
                                egestas nisi. Donec feugiat nibh quis arcu
                                rutrum efficitur. Nam eget venenatis odio, at
                                mattis lectus. Donec commodo id metus a
                                tristique. Vestibulum at dui quis risus
                            </label>
                        </div>
                    )}
                </div>
                {isMobile ? <MobileFooter style={styles.footer} /> : <Footer />}
            </div>
        </div>
    )
}

export default AboutUs
