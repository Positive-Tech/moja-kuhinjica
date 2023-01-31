import React from 'react'
import { useState } from 'react'
import { Footer } from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import { TabButton } from '@/components/button/TabButton'
import styles from './AboutUs.module.scss'

const AboutUs = () => {
    const [active, setActive] = useState(0)
    return (
        <div className={styles.colDiv}>
            <div className={styles.wrapper}></div>
            <label className={styles.title}>DUNDA</label>
            <Header type="main" />

            <div className={styles.menuRowDiv}>
                <TabButton
                    active={active === 1}
                    onClick={() => setActive(1)}
                    content="O nama"
                />
                <TabButton
                    active={active === 2}
                    onClick={() => setActive(2)}
                    content="FAQ"
                />
                <TabButton
                    active={active === 3}
                    onClick={() => setActive(3)}
                    content="Politika privatnosti"
                />
                <TabButton
                    active={active === 4}
                    onClick={() => setActive(4)}
                    content="Uslovi korišćenja"
                />
            </div>
            <Footer />
        </div>
    )
}

export default AboutUs
