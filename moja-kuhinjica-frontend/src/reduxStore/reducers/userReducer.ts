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
    inProgress: boolean
    isAuthorized: boolean
    errorMessage: string
}

const initialState: UserState = {
    user: {
        id: null,
        name: '',
        surname: '',
        phoneNumber: '',
        role: '',
    },
    inProgress: false,
    isAuthorized: false,
    errorMessage: '',
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
        case ActionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isAuthorized: true,
                inProgress: false,
                errorMessage: null,
            }
        case ActionTypes.USER_LOGIN_FAILED:
            return {
                ...state,
                inProgress: false,
                errorMessage: action.payload,
            }
        case ActionTypes.USER_LOGIN_IN_PROGRESS:
            return {
                ...state,
                inProgress: true,
            }
        case ActionTypes.USER_LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                isAuthorized: false,
                authErrorMessage: null,
            }
        default:
            return state
    }
}
