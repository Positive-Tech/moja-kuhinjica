import { IMeal } from '@/service/Restaurant.service'
import UserService from '@/service/User.service'
import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { ActionTypes } from '../constants/actionTypes'

interface RestaurantState {
    cartItems: {
        meal: IMeal
        amount: number
    }[]
}

const initialState: RestaurantState = {}

export const userLogout = createAction(ActionTypes.USER_LOGOUT)
export const userLogin = createAsyncThunk(
    ActionTypes.USER_LOGIN,
    async ({ inputData, onSuccess, onError }: any) => {
        try {
            const { data } = await UserService.login(inputData)
            localStorage.setItem('token', data.access_token)
            onSuccess()
        } catch (err) {
            console.log(err)
            onError(err.response.data.message)
        }
    }
)
export const loadUser = createAsyncThunk(ActionTypes.LOAD_USER, async () => {
    const { data } = await UserService.getLoggedInUser()
    return data
})

export const restaurantReducer = createReducer(initialState, (builder) => {})
