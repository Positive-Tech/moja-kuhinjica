import { axiosInstance } from 'src/config/axios'
import { Component } from 'react'

export default class AboutUsService extends Component {
    public static async getFAQ(): Promise<any> {
        return await axiosInstance.get('/faq')
    }
}
