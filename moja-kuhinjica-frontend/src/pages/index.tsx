import { useRef, useState } from 'react'
import Image from 'next/image'
import Header from '@/components/header/Header'
import { HomePageButton } from '@/components/button/HomePageButton'
import { MenuItem } from '@/components/menu/MenuItem'
import { Footer } from '@/components/footer/Footer'
import { LoginModal } from '@/components/modal/login/LoginModal'
import { SignUpModal } from '@/components/modal/signUp/SignUpModal'
import { SignUpNotificationModal } from '@/components/modal/signUp/SignUpNotificationModal'
import scrollArrow from '../../public/static/assets/images/scrollArrow.svg'
import styles from '../styles/Home.module.scss'
import { DayButton } from '@/components/button/DayButton'

const today = new Date()

const Home = () => {
    const [active, setActive] = useState(today.getDay())
    const ref = useRef<HTMLDivElement>(null)

    const handleClick = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false)
    const [showNotification, setNotification] = useState(false)

    return (
        <div className={styles.colDiv}>
            <div className={styles.wrapper}>
                <Header />
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
                        <button className={styles.restaurantButton}>
                            Restoran Top FOOD 021
                        </button>
                    </div>
                    <label className={styles.titleLabel}>
                        Dnevni meni - {today.toLocaleString().split(',')[0]}
                    </label>
                    <div className={styles.menuRowDiv}>
                        <DayButton
                            active={active}
                            setActive={setActive}
                            buttonNumber={1}
                            content="Ponedeljak"
                        />
                        <DayButton
                            active={active}
                            setActive={setActive}
                            buttonNumber={2}
                            content="Utorak"
                        />
                        <DayButton
                            active={active}
                            setActive={setActive}
                            buttonNumber={3}
                            content="Sreda"
                        />
                        <DayButton
                            active={active}
                            setActive={setActive}
                            buttonNumber={4}
                            content="Četvrtak"
                        />
                        <DayButton
                            active={active}
                            setActive={setActive}
                            buttonNumber={5}
                            content="Petak"
                        />
                        <DayButton
                            active={active}
                            setActive={setActive}
                            buttonNumber={6}
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
            <SignUpNotificationModal
                modalIsOpen={showNotification}
                closeModal={() => setNotification(false)}
            />
        </div>
    )
}

export default Home
