import axios from 'axios'
import { Component } from 'react'
import { FieldValues } from 'react-hook-form'

export default class UserService extends Component {
    public static async login(data: FieldValues): Promise<any> {
        return await axios.post(
            process.env.NEXT_PUBLIC_BASE_URL + '/auth/login',
            data
        )
    }
}
