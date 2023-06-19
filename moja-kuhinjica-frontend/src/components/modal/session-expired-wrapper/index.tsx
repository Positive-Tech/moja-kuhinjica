import { useAppSelector } from "@/utils/hooks"
import { SessionExpiredModal } from "../login/SessionExpiredModal"
import store from "@/reduxStore/store"
import { useRouter } from 'next/router'
import { routes } from '@/constants/constants'
import { toggleSessionExpiredModal, userLogout } from "@/reduxStore/reducers/userReducer"

const SessionExpiredModalWrapper = (): JSX.Element => {
    const isSessionExpired = useAppSelector((state) => state?.auth?.showSessionExpiredModal)
    const router = useRouter()

    const handleModalClose = (): void => {
        store.dispatch(userLogout())
        store.dispatch(toggleSessionExpiredModal(false))
        router.push(routes.HOME_PAGE)
    }

    return (
        <SessionExpiredModal 
            title = "Vaša sesija je istekla"
            text="Bićete odjavljeni."
            modalIsOpen={isSessionExpired}
            buttonText="Prijavite se"
            closeModal={handleModalClose}
        />
    )
} 

export default SessionExpiredModalWrapper