import { ICartItem, IMeal, IMealType } from '@/service/Restaurant.service'
import { createAction, createReducer, current } from '@reduxjs/toolkit'
import { stat } from 'fs'
import { ActionTypes } from '../constants/actionTypes'

interface RestaurantState {
    cartItems: ICartItem[]
}

const initialState: RestaurantState = {
    cartItems: [],
}

export const addItemToCart = createAction<ICartItem>(
    ActionTypes.ADD_ITEM_TO_CART
)
export const incrementMealAmount = createAction<IMeal>(
    ActionTypes.INCREMENT_MEAL_AMOUNT
)

export const restaurantReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addItemToCart, (state, action) => {
            state.cartItems = [...state.cartItems, action.payload]
        })
        .addCase(incrementMealAmount, (state, action) => {
            let items: any = []
            current(state).cartItems.map((item) => {
                item.meal.id === action.payload.id
                    ? items.push({ ...item, amount: item.amount + 1 })
                    : items.push(item)
            })
            state.cartItems = items
        })
})
