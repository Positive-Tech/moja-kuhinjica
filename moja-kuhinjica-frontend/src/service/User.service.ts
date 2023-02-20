import { axiosInstance } from 'src/config/axios'
import { Component } from 'react'
import { FieldValues } from 'react-hook-form'

interface User {
    id: number
    name: string
    surname: string
    phoneNumber: string
    role: string
}
export default class UserService extends Component {
    public static async login(data: FieldValues): Promise<any> {
        return await axiosInstance.post(
            process.env.NEXT_PUBLIC_BASE_URL + '/auth/login',
            data
        )
    }
    public static async signIn(data: FieldValues): Promise<any> {
        return await axiosInstance.post(
            process.env.NEXT_PUBLIC_BASE_URL + '/client',
            data
        )
    }
    public static async getLoggedInUser(): Promise<any> {
        return await axiosInstance.get(
            process.env.NEXT_PUBLIC_BASE_URL + '/auth/profile'
        )
    }
    public static async getUserById(
        id: string | string[] | undefined
    ): Promise<any> {
        return await axiosInstance.get(
            process.env.NEXT_PUBLIC_BASE_URL + '/client/' + id
        )
    }
}
