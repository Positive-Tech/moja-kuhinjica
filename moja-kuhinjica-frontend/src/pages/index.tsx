import { useRef, useState } from 'react'
import Image from 'next/image'
import Header from '@/components/header/Header'
import { MenuItem } from '@/components/menu/MenuItem'
import { Footer } from '@/components/footer/Footer'
import styles from '../styles/Home.module.scss'
import scrollArrow from '../../public/static/assets/images/scrollArrow.svg'

const today = new Date()

const Home = () => {
    const [active, setActive] = useState(today.getDay())
    const ref = useRef<HTMLDivElement>(null)

    const handleClick = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
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
                        <button className={styles.button}>
                            Registrujte se
                        </button>
                        <button className={styles.button}>Ulogujte se</button>
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
        </div>
    )
}

export default Home
