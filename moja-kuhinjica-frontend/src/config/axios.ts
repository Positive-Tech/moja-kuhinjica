import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.authorization = 'Bearer ' + token
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)
