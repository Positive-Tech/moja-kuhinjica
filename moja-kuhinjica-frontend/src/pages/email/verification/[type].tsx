import Image from 'next/image'
import React from 'react'
import styles from '../EmailPages.module.scss'
import successIcon from 'public/static/assets/images/successFilled.svg'
import { Title } from '@/components/label/Title'
import { RegularButton } from '@/components/button/RegularButton'
import { useRouter } from 'next/router'

const VerificationPage = (): JSX.Element => {
    const router = useRouter()
    const { type } = router.query
    return (
        <div className={styles.container}>
            {(type === 'reset' || type === 'registration') && (
                <div className={styles.wrapper}>
                    <Image src={successIcon} alt="" className={styles.icon} />
                    <Title
                        content={
                            type === 'registration'
                                ? 'Vaš nalog je uspešno verifikovan'
                                : 'Vaša šifra je uspešno resetovana'
                        }
                        style={styles.title}
                    />
                    <div className={styles.buttonWrapper}>
                        <RegularButton
                            content="Nazad na početnu"
                            style={styles.confirmButton}
                            onClick={() => router.push('/')}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
export default VerificationPage
