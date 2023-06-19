import { toggleSessionExpiredModal } from '@/reduxStore/reducers/userReducer'
import store from '@/reduxStore/store'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

interface IToken {
    email: string
    exp: number
    iat: number
    sub: number
}

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            const decodedToken: IToken = jwtDecode(token)
            const expirationTimestamp = decodedToken.exp
            const currentTime = Math.floor(Date.now() / 1000)

            if (expirationTimestamp < currentTime) {
                store.dispatch(toggleSessionExpiredModal(true))
            }
            config.headers.authorization = 'Bearer ' + token
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)
