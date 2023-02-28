import { Reducer } from '@reduxjs/toolkit'
import { ActionTypes } from '../constants/actionTypes'

interface UserState {
    user: {
        id: number | null
        name: string | null
        surname: string | null
        phoneNumber: string | null
        role: string | null
    } | null
    token: string | null
    isAuthorized: boolean
}

const initialState: UserState = {
    user: {
        id: null,
        name: '',
        surname: '',
        phoneNumber: '',
        role: '',
    },
    token: '',
    isAuthorized: false,
}

export const userReducer: Reducer<UserState> = (
    state = initialState,
    action: any
) => {
    switch (action.type) {
        case ActionTypes.SET_LOGGED_IN_USER:
            return {
                ...state,
                user: action.payload,
            }
        case ActionTypes.USER_LOGIN:
            return {
                ...state,
                token: action.payload.token,
                isAuthorized: true,
            }
        case ActionTypes.USER_LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                isAuthorized: false,
            }
        default:
            return state
    }
}
