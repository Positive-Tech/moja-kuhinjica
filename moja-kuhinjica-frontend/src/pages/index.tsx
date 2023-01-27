import { useRef, useState } from 'react'
import Modal from 'react-modal'
import Image from 'next/image'
import Header from '@/components/header/Header'
import { MenuItem } from '@/components/menu/MenuItem'
import { Footer } from '@/components/footer/Footer'
import styles from '../styles/Home.module.scss'
import scrollArrow from '../../public/static/assets/images/scrollArrow.svg'
import { bgModal } from '@/constants/constants'
import { FormInput } from '@/components/input/FormInput'
import email from '../../public/static/assets/images/email.svg'
import password from '../../public/static/assets/images/password.svg'
import mobile from '../../public/static/assets/images/mobile.svg'
import profile from '../../public/static/assets/images/profile.svg'

const today = new Date()

const Home = () => {
    const [active, setActive] = useState(today.getDay())
    const ref = useRef<HTMLDivElement>(null)

    const handleClick = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const [loginModalIsOpen, setIsOpenLogin] = useState(false)
    const [signInModalIsOpen, setIsOpenSignIn] = useState(false)

    const openLoginModal = () => {
        setIsOpenLogin(true)
    }

    const closeLoginModal = () => {
        setIsOpenLogin(false)
    }

    const openSignInModal = () => {
        setIsOpenSignIn(true)
    }

    const closeSignInModal = () => {
        setIsOpenSignIn(false)
    }

    return (
        <div className={styles.colDiv}>
            <div className={styles.wrapper}>
                <Header />
                <div className={styles.container}>
                    <label className={styles.title}>moja klopica</label>
                    <label className={styles.content}>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing.
                    </label>
                    <div className={styles.buttonWrapper}>
                        <button
                            className={styles.button}
                            onClick={openSignInModal}
                        >
                            Registrujte se
                        </button>
                        <button
                            className={styles.button}
                            onClick={openLoginModal}
                        >
                            Ulogujte se
                        </button>
                    </div>
                </div>
                <div className={styles.scrollDiv}>
                    <div className={styles.scrollLabelWrapper}>
                        <label
                            className={styles.scrollLabel}
                            onClick={handleClick}
                        >
                            Dnevni meni
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
                    <label className={styles.titleLabel}>
                        Dnevni meni - {today.toLocaleString().split(',')[0]}
                    </label>
                    <div className={styles.menuRowDiv}>
                        <button
                            onClick={() => setActive(1)}
                            className={
                                active === 1
                                    ? styles.dayButtonSelected
                                    : styles.dayButton
                            }
                        >
                            Ponedeljak
                        </button>
                        <button
                            onClick={() => setActive(2)}
                            className={
                                active === 2
                                    ? styles.dayButtonSelected
                                    : styles.dayButton
                            }
                        >
                            Utorak
                        </button>
                        <button
                            onClick={() => setActive(3)}
                            className={
                                active === 3
                                    ? styles.dayButtonSelected
                                    : styles.dayButton
                            }
                        >
                            Sreda
                        </button>
                        <button
                            onClick={() => setActive(4)}
                            className={
                                active === 4
                                    ? styles.dayButtonSelected
                                    : styles.dayButton
                            }
                        >
                            Cetvrtak
                        </button>
                        <button
                            onClick={() => setActive(5)}
                            className={
                                active === 5
                                    ? styles.dayButtonSelected
                                    : styles.dayButton
                            }
                        >
                            Petak
                        </button>
                        <button
                            onClick={() => setActive(6)}
                            className={
                                active === 6
                                    ? styles.dayButtonSelected
                                    : styles.dayButton
                            }
                        >
                            Subota
                        </button>
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
            <Modal
                isOpen={loginModalIsOpen}
                onRequestClose={closeLoginModal}
                style={bgModal}
                className={styles.modalContainer}
            >
                <div className={styles.formContainer}>
                    <div className={styles.formDiv}>
                        <label className={styles.formTitle}>Ulogujte se</label>
                        <FormInput src={email} content="Email" type="text" />
                        <FormInput
                            src={password}
                            content="Šifra"
                            type="password"
                        />
                        <button className={styles.formButton}>Potvrdi</button>
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={signInModalIsOpen}
                onRequestClose={closeSignInModal}
                style={bgModal}
                className={styles.modalContainer}
            >
                <div className={styles.formContainer}>
                    <div className={styles.formDiv}>
                        <label className={styles.formTitle}>
                            Registrujte se
                        </label>
                        <FormInput
                            src={profile}
                            content="Ime i prezime"
                            type="text"
                        />
                        <FormInput src={email} content="Email" type="text" />
                        <FormInput
                            src={password}
                            content="Šifra"
                            type="password"
                        />
                        <FormInput
                            src={mobile}
                            content="Broj telefona"
                            type="text"
                        />
                        <button className={styles.formButton}>Potvrdi</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Home
