import UserService from '@/service/User.service'
import { ActionTypes } from '../constants/actionTypes'

export const setLoggedInUser = () => async (dispatch: any) => {
    const { data } = await UserService.getLoggedInUser()
    dispatch({
        type: ActionTypes.SET_LOGGED_IN_USER,
        payload: data,
    })
}

export const userLogin = (inputData: any) => async (dispatch: any) => {
    try {
        const { data } = await UserService.login(inputData)
        localStorage.setItem('token', data.access_token)

        dispatch({
            type: ActionTypes.USER_LOGIN,
            payload: {
                token: data.access_token,
            },
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: ActionTypes.ERROR,
            payload: err,
        })
    }
}

export const userLogout = (): { type: string } => {
    localStorage.removeItem('token')

    return {
        type: ActionTypes.USER_LOGOUT,
    }
}
