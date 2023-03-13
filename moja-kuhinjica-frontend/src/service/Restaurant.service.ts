import { axiosInstance } from 'src/config/axios'
import { Component } from 'react'

export interface IMenu {
    id: string
    date: string
    meals: IMeal[]
}
export interface IMeal {
    id: number
    title: string
    price: number
    description: string
    image: string
    type: IMealType
}
export interface IMealType {
    id: number
    name: string
}

export interface ICartItem {
    meal: IMeal
    amount: number
}
export default class RestaurantService extends Component {
    public static async fetchWeeklyMenus(): Promise<any> {
        return await axiosInstance.get('/restaurant/5/menu/week')
    }
}
