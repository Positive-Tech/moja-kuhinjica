import Image from 'next/image'
import React from 'react'
import successIcon from 'public/static/assets/images/successFilled.svg'
import { Title } from '@/components/label/Title'
import { RegularButton } from '@/components/button/RegularButton'
import { useRouter } from 'next/router'
import { routes } from '@/constants/constants'

const RESET_TYPE = 'reset'
const REGISTRATION_TYPE = 'registration'

const VerificationPage = (): JSX.Element => {
    const router = useRouter()
    const { type } = router.query
    return (
        <div className="resetVerifyContainer">
            {(type === RESET_TYPE || type === REGISTRATION_TYPE) && (
                <div className="resetVerifyContainer__wrapper">
                    <Image
                        src={successIcon}
                        alt=""
                        className="resetVerifyContainer__wrapper__icon"
                    />
                    <Title
                        content={
                            type === REGISTRATION_TYPE
                                ? 'Vaš nalog je uspešno verifikovan'
                                : 'Vaša šifra je uspešno resetovana'
                        }
                        style="resetVerifyContainer__wrapper__title"
                    />
                    <div className="resetVerifyContainer__wrapper__buttonWrapper">
                        <RegularButton
                            content="Nazad na početnu"
                            style="resetVerifyContainer__wrapper__buttonWrapper__confirmButton"
                            onClick={() => router.push(routes.HOME_PAGE)}
                            isActive
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
export default VerificationPage
