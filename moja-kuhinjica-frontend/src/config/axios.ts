import { routes } from '@/constants/constants'
import { userLogout } from '@/reduxStore/reducers/userReducer'
import store from '@/reduxStore/store'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { useRouter } from 'next/router'

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
                // Token has expired, perform logout action
                alert('Session expired. You will be logged out.')
                store.dispatch(userLogout())
                useRouter().push(routes.HOME_PAGE)
            }
            config.headers.authorization = 'Bearer ' + token
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)
