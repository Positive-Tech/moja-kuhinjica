import { routes } from '@/constants/constants'
import { userLogout } from '@/reduxStore/reducers/userReducer'
import store from '@/reduxStore/store'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { Router, useRouter } from 'next/router'

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            const decodedToken: any = jwtDecode(token)
            const expirationTimestamp = decodedToken.exp
            const testTime = expirationTimestamp - 60 * 299.5
            const currentTime = Math.floor(Date.now() / 1000)

            if (testTime < currentTime) {
                // Token has expired, perform logout action
                alert('Session expired. You will be logged out.')
                store.dispatch(userLogout())
                useRouter().push(routes.HOME_PAGE)
            } else {
                config.headers.authorization = 'Bearer ' + token
            }
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)
