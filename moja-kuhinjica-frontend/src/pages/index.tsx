import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Header from '@/components/header/Header'
import { HomePageButton } from '@/components/button/HomePageButton'
import { MenuItem } from '@/components/menu/MenuItem'
import { Footer } from '@/components/footer/Footer'
import { LoginModal } from '@/components/modal/login/LoginModal'
import { TabButton } from '@/components/button/TabButton'
import { SignUpModal } from '@/components/modal/signUp/SignUpModal'
import { SuccessNotificationModal } from '@/components/modal/notification/SuccessNotificationModal'
import { MobileFooter } from '@/components/footer/mobileFooter/MobileFooter'
import Menu from 'src/components/mobileMenu'
import scrollArrowIcon from 'public/static/assets/images/scrollArrow.svg'
import burgerMenuIcon from 'public/static/assets/images/burgerMenu.svg'
import styles from 'src/styles/Home.module.scss'
import { MOBILE_WIDTH } from 'src/constants/constants'
import UserService from '@/service/User.service'

interface LoggedInUser {
    id: number
    name: string
    surname: string
    phoneNumber: string
    role: string
}

const Home = (): JSX.Element => {
    const [active, setActive] = useState<number>(2)
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
    const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false)
    const [showNotification, setShowNotification] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const [userEmail, setUserEmail] = useState<string>('')
    const router = useRouter()
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        isLoggedIn()
    }, [])

    useEffect(() => {
        handleWindowResize()
        window.addEventListener('resize', handleWindowResize)
        if (windowWidth < MOBILE_WIDTH) setIsMobile(true)
        else setIsMobile(false)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [windowWidth])

    const handleClick = (): void => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleWindowResize = (): void => {
        setWindowWidth(window.innerWidth)
    }
    const isLoggedIn = (): void => {
        setLoggedIn(localStorage.getItem('token') != null ? true : false)
    }

    const handleSignUpClick = (): void => {
        if (isMobile) router.push('/registration')
        else setShowSignUpModal(true)
    }

    const handleLoginClick = (): void => {
        if (isMobile) router.push('/login')
        else setShowLoginModal(true)
    }

    const showNotificationModal = (email: string): void => {
        setUserEmail(email)
        setShowNotification(true)
    }

    return (
        <div className={styles.colDiv}>
            {showMenu && (
                <Menu
                    closeMenu={() => setShowMenu(false)}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                />
            )}
            <Header
                type="main"
                selectedButton={1}
                openLoginModal={setShowLoginModal}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
            />
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <Image
                        src={burgerMenuIcon}
                        alt=""
                        className={styles.menuIcon}
                        onClick={() => setShowMenu(true)}
                    />
                    <label className={styles.title}>dunda</label>
                    <label className={styles.content}>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing.
                    </label>
                    {!loggedIn && (
                        <div className={styles.buttonWrapper}>
                            <HomePageButton
                                content="Registrujte se"
                                onClick={handleSignUpClick}
                            />
                            <HomePageButton
                                content="Ulogujte se"
                                onClick={handleLoginClick}
                            />
                        </div>
                    )}
                </div>
                <div className={styles.scrollDiv}>
                    <div className={styles.labelForScrollWrapper}>
                        <label
                            className={styles.labelForScroll}
                            onClick={handleClick}
                        >
                            Ponuda
                        </label>
                        <Image
                            className={styles.labelForScrollIcon}
                            src={scrollArrowIcon}
                            alt=""
                            onClick={handleClick}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.menuWrapper} ref={ref}>
                <div className={styles.menuColDiv}>
                    <div className={styles.restaurantTitleWrapper}>
                        <label className={styles.restaurantTitle}>
                            Restoran Top FOOD 021
                        </label>
                        <label
                            onClick={() => router.push('/restaurant/profile')}
                            className={styles.restaurantInfoLabel}
                        >
                            opste informacije
                        </label>
                    </div>
                    <label className={styles.titleLabel}>
                        Dnevni meni - 21/01/2023
                    </label>
                    <div className={styles.menuRowDiv}>
                        <TabButton
                            active={active === 1}
                            onClick={() => setActive(1)}
                            content="PON"
                        />
                        <TabButton
                            active={active === 2}
                            onClick={() => setActive(2)}
                            content="UTO"
                        />
                        <TabButton
                            active={active === 3}
                            onClick={() => setActive(3)}
                            content="SRE"
                        />
                        <TabButton
                            active={active === 4}
                            onClick={() => setActive(4)}
                            content="ČET"
                        />
                        <TabButton
                            active={active === 5}
                            onClick={() => setActive(5)}
                            content="PET"
                        />
                        <TabButton
                            active={active === 6}
                            onClick={() => setActive(6)}
                            content="SUB"
                        />
                    </div>
                    <div className={styles.menuGridDiv}>
                        <MenuItem />
                        <MenuItem />
                        <MenuItem />
                        <MenuItem />
                        <MenuItem />
                        <MenuItem />
                        <MenuItem />
                    </div>
                </div>
            </div>
            {isMobile ? <MobileFooter /> : <Footer />}
            <LoginModal
                modalIsOpen={showLoginModal}
                closeModal={() => setShowLoginModal(false)}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
            />
            <SignUpModal
                modalIsOpen={showSignUpModal}
                closeModal={() => setShowSignUpModal(false)}
                openNotificationModal={(email) => showNotificationModal(email)}
            />
            <SuccessNotificationModal
                modalIsOpen={showNotification}
                closeModal={() => setShowNotification(false)}
                type="registration"
                title=""
                buttonText="zatvori"
                email={userEmail}
            />
        </div>
    )
}

export default Home
