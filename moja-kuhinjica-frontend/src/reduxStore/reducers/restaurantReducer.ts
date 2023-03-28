import { ICartItem, IMeal } from '@/service/Restaurant.service'
import { createAction, createReducer, current } from '@reduxjs/toolkit'
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
export const changeMealAmount = createAction<{ meal: IMeal; amount: number }>(
    ActionTypes.CHANGE_MEAL_AMOUNT
)
export const removeCartItem = createAction<IMeal>(ActionTypes.REMOVE_CART_ITEM)
export const emptyCart = createAction(ActionTypes.EMPTY_CART)

export const restaurantReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addItemToCart, (state, action) => {
            state.cartItems = [...state.cartItems, action.payload]
        })
        .addCase(changeMealAmount, (state, action) => {
            const updatedCartItems = state.cartItems.map((item) => {
                if (item.meal.id === action.payload.meal.id) {
                    return {
                        ...item,
                        quantity: item.quantity + action.payload.amount,
                    }
                }
                return item
            })
            state.cartItems = updatedCartItems
        })
        .addCase(removeCartItem, (state, action) => {
            const updatedCartItems = state.cartItems.filter(
                (item) => item.meal.id !== action.payload.id
            )
            state.cartItems = updatedCartItems
        })
        .addCase(emptyCart, (state) => {
            state.cartItems = []
        })
})
