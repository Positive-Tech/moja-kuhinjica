import React from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import uuid from 'react-uuid'
import AboutUsService from '@/service/AboutUs.service'
import { Footer } from '@/components/footer/Footer'
import { MobileFooter } from '@/components/footer/mobileFooter/MobileFooter'
import Header from '@/components/header/Header'
import { QuestionLabel } from '@/components/label/QuestionLabel'
import { TabButton } from '@/components/button/TabButton'
import { MobileHeader } from '@/components/header/mobileHeader/MobileHeader'
import Menu from 'src/components/mobileMenu'
import { MOBILE_WIDTH } from '@/constants/constants'
import burgerMenuIcon from 'public/static/assets/images/burgerMenu.svg'
import aboutUsPic from 'public/static/assets/images/aboutUs.png'
import { LoginModal } from '@/components/modal/login/LoginModal'
import { PasswordForgettingModal } from '@/components/modal/passwordForgetting/PasswordForgettingModal'
import { PasswordResettingModal } from '@/components/modal/passwordReset/PasswordResettingModal'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

interface Question {
    id: number
    question: string
    answer: string
    deletedDate: string
}

const BUTTON_ONE = 1
const BUTTON_TWO = 2
const BUTTON_THREE = 3
const BUTTON_FOUR = 4

const AboutUs = (): JSX.Element => {
    const { t } = useTranslation()
    const [active, setActive] = useState<number>(1)
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [questions, setQuestions] = useState<Question[]>()
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
    const [showPasswordForgettingModal, setShowPasswordForgettingModal] =
        useState<boolean>(false)
    const [showPasswordResettingModal, setShowPasswordResettingModal] =
        useState<boolean>(false)
    const [userEmail, setUserEmail] = useState<string>('')
    const [resetPasswordMessage, setResetPasswordMessage] = useState<string>('')

    const router = useRouter()

    const { activeTab } = router.query

    useEffect(() => {
        setActive(Number(activeTab))
    }, [activeTab])

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
        <div className="aboutUs">
            {showMenu && <Menu closeMenu={() => setShowMenu(false)} />}

            <div className="aboutUs__topWrapper">
                <label className="aboutUs__topWrapper__aboutUsTitle">
                    DUNDA
                </label>
            </div>
            {isMobile ? (
                <MobileHeader
                    handleClick={() => setShowMenu(true)}
                    showProfileIcon={false}
                    style="aboutUs__aboutUsHeader"
                    src={burgerMenuIcon}
                />
            ) : (
                <Header
                    type="main"
                    selectedButton={BUTTON_THREE}
                    openLoginModal={setShowLoginModal}
                />
            )}
            <div className="aboutUs__bottomWrapper">
                <div className="aboutUs__bottomWrapper__menuRowDiv">
                    <TabButton
                        active={active === BUTTON_ONE}
                        onClick={() => setActive(BUTTON_ONE)}
                        content={t("O nama") as string}
                        style="aboutUs__bottomWrapper__menuRowDiv__tabButton"
                    />
                    <TabButton
                        active={active === BUTTON_TWO}
                        onClick={() => setActive(BUTTON_TWO)}
                        style="aboutUs__bottomWrapper__menuRowDiv__tabButton"
                        content="FAQ"
                    />
                    <TabButton
                        active={active === BUTTON_THREE}
                        onClick={() => setActive(BUTTON_THREE)}
                        style="aboutUs__bottomWrapper__menuRowDiv__tabButton"
                        content={t("Politika privatnosti") as string}
                    />
                    <TabButton
                        active={active === BUTTON_FOUR}
                        onClick={() => setActive(BUTTON_FOUR)}
                        style="aboutUs__bottomWrapper__menuRowDiv__tabButton"
                        content={t("Uslovi korišćenja") as string}
                    />
                </div>
                <LoginModal
                    modalIsOpen={showLoginModal}
                    closeModal={() => setShowLoginModal(false)}
                    openPasswordForgettingModal={() =>
                        setShowPasswordForgettingModal(true)
                    }
                />
                <PasswordForgettingModal
                    modalIsOpen={showPasswordForgettingModal}
                    closeModal={() => setShowPasswordForgettingModal(false)}
                    openNotificationModal={() =>
                        setShowPasswordResettingModal(true)
                    }
                    setMessage={setResetPasswordMessage}
                    setUserEmail={setUserEmail}
                />
                <PasswordResettingModal
                    modalIsOpen={showPasswordResettingModal}
                    closeModal={() => setShowPasswordResettingModal(false)}
                    infoContent={resetPasswordMessage}
                    email={userEmail}
                />
                <div className="aboutUs__tabWrapper">
                    {active === 1 && (
                        <div className="aboutUs__tabWrapper__aboutUsContainer">
                            <div className="aboutUs__tabWrapper__aboutUsContainer__aboutUsWrapper">
                                <div className="aboutUs__tabWrapper__aboutUsContainer__aboutUsWrapper__pictureWrapper">
                                    <Image
                                        src={aboutUsPic}
                                        alt=""
                                        className="aboutUs__tabWrapper__aboutUsContainer__aboutUsWrapper__pictureWrapper__aboutUsPicture"
                                    />
                                </div>
                                <div className="aboutUs__tabWrapper__aboutUsContainer__aboutUsWrapper__content">
                                    <label className="aboutUs__tabWrapper__aboutUsContainer__aboutUsWrapper__content__contentTitle">
                                        Lorem ipsum?
                                    </label>
                                    <label className="aboutUs__tabWrapper__aboutUsContainer__aboutUsWrapper__content__contentText">
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
                        <div className="aboutUs__FAQContainer">
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
                        <div className="aboutUs__privacyInfoContainer">
                            <label className="aboutUs__privacyInfoContainer__infoTitle">
                                DUNDA {t("Obaveštenje o privatnosti")}
                            </label>
                            <label className="aboutUs__privacyInfoContainer__infoText">
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
                        <div className="aboutUs__privacyInfoContainer">
                            <label className="aboutUs__privacyInfoContainer__infoTitle">
                                DUNDA {t("Uslovi korišćenja")}
                            </label>
                            <label className="aboutUs__privacyInfoContainer__infoText">
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
                {isMobile ? (
                    <MobileFooter style="aboutUs__footer" />
                ) : (
                    <Footer />
                )}
            </div>
        </div>
    )
}

export default AboutUs
