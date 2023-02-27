import { axiosInstance } from 'src/config/axios'
import { Component } from 'react'
import { FieldValues } from 'react-hook-form'
export default class UserService extends Component {
    public static async login(data: FieldValues): Promise<any> {
        return await axiosInstance.post('/auth/login', data)
    }

    public static async signIn(data: FieldValues): Promise<any> {
        return await axiosInstance.post('/client', data)
    }

    public static async getLoggedInUser(): Promise<any> {
        return await axiosInstance.get('/auth/profile')
    }

    public static async getUserById(
        id: string | string[] | undefined
    ): Promise<any> {
        return await axiosInstance.get(`/client/${id}`)
    }
}
