import axios from 'axios'
import { Component } from 'react'
import { FieldValues } from 'react-hook-form'

export default class UserService extends Component {
    public static async login(data: FieldValues) {
        try {
            let res = await axios.post(
                'http://dev-dunda-alb-333980606.us-east-1.elb.amazonaws.com/api' +
                    '/auth/login',
                data
            )
        } catch (err) {
            console.log(err)
        }
    }
}
