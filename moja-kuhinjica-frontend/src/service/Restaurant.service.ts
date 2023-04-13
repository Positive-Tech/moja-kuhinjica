import { axiosInstance } from 'src/config/axios'
import { Component } from 'react'
import { axiosRoutes } from '@/constants/constants'

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
    mealId: number
    quantity: number
}

export interface IOrder {
    date: string
    price: number
    restaurantId: number
    items: Array<{
        mealId: number
        quantity: number
    }>
}

export interface IMyReservations {
    id: number
    date: string
    price: number
    resolved: boolean
    restaurant: { restaurantId: number; restaurantName: string }
    client: { clientId: number; clientName: string }
    items: IReservationItem[]
}

export interface IReservationItem {
    id: number
    quantity: number
    mealName: string
    mealImage: string
}

export interface IReservationGroup {
    date: string
    reservations: IMyReservations[]
}

export default class RestaurantService extends Component {
    public static async fetchWeeklyMenus(): Promise<any> {
        return await axiosInstance.get(axiosRoutes.restaurant.GET_WEEKLY_MENU)
    }

    public static async createOrder(data: IOrder): Promise<any> {
        return await axiosInstance.post(
            axiosRoutes.restaurant.CREATE_ORDER,
            data
        )
    }

    public static async fetchMyReservations(isCurrent: boolean): Promise<any> {
        return await axiosInstance.get(
            axiosRoutes.restaurant.GET_MY_RESERVATIONS + isCurrent.toString()
        )
    }
}
