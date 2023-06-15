import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../reduxStore/store'
import '../styles/globals.scss'
import '../styles/styles.scss'
import SessionExpiredModalWrapper from '@/components/modal/session-expired-wrapper'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
            <SessionExpiredModalWrapper />
        </Provider>
    )
}
