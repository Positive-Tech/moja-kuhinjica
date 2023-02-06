import { useRef, useState } from 'react'
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
import scrollArrow from '../../public/static/assets/images/scrollArrow.svg'
import styles from '../styles/Home.module.scss'

const Home = () => {
    const [active, setActive] = useState<number>(2)
    const router = useRouter()
    const ref = useRef<HTMLDivElement>(null)

    const handleClick = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
    const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false)
    const [showNotification, setShowNotification] = useState<boolean>(false)

    return (
        <div className={styles.colDiv}>
            <Header
                type="main"
                selectedButton={1}
                openLoginModal={setShowLoginModal}
            />
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <label className={styles.title}>dunda</label>
                    <label className={styles.content}>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing.
                    </label>
                    <div className={styles.buttonWrapper}>
                        <HomePageButton
                            content="Registrujte se"
                            setShowModal={setShowSignUpModal}
                        />
                        <HomePageButton
                            content="Ulogujte se"
                            setShowModal={setShowLoginModal}
                        />
                    </div>
                </div>
                <div className={styles.scrollDiv}>
                    <div className={styles.scrollLabelWrapper}>
                        <label
                            className={styles.scrollLabel}
                            onClick={handleClick}
                        >
                            Ponuda
                        </label>
                        <Image
                            className={styles.scrollIcon}
                            src={scrollArrow}
                            alt=""
                            onClick={handleClick}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.menuWrapper} ref={ref}>
                <div className={styles.menuColDiv}>
                    <div className={styles.restaurantButtonWrapper}>
                        <button
                            className={styles.restaurantButton}
                            onClick={() => router.push('/restaurant/profile')}
                        >
                            Restoran Top FOOD 021
                        </button>
                    </div>
                    <label className={styles.titleLabel}>
                        Dnevni meni - 21/01/2023
                    </label>
                    <div className={styles.menuRowDiv}>
                        <TabButton
                            active={active === 1}
                            onClick={() => setActive(1)}
                            content="Ponedeljak"
                        />
                        <TabButton
                            active={active === 2}
                            onClick={() => setActive(2)}
                            content="Utorak"
                        />
                        <TabButton
                            active={active === 3}
                            onClick={() => setActive(3)}
                            content="Sreda"
                        />
                        <TabButton
                            active={active === 4}
                            onClick={() => setActive(4)}
                            content="Četvrtak"
                        />
                        <TabButton
                            active={active === 5}
                            onClick={() => setActive(5)}
                            content="Petak"
                        />
                        <TabButton
                            active={active === 6}
                            onClick={() => setActive(6)}
                            content="Subota"
                        />
                    </div>
                    <div className={styles.grid}>
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
            <Footer />
            <LoginModal
                modalIsOpen={showLoginModal}
                closeModal={() => setShowLoginModal(false)}
            />
            <SignUpModal
                modalIsOpen={showSignUpModal}
                closeModal={() => setShowSignUpModal(false)}
            />
            <SuccessNotificationModal
                modalIsOpen={showNotification}
                closeModal={() => setShowNotification(false)}
                type="registration"
                title="registracija uspešna"
                buttonText="zatvori"
            />
        </div>
    )
}

export default Home
