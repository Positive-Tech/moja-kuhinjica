import UserService from '@/service/User.service'
import { ActionTypes } from '../constants/actionTypes'

export const loadUser = () => async (dispatch: any) => {
    const { data } = await UserService.getLoggedInUser()
    dispatch({
        type: ActionTypes.LOAD_USER,
        payload: data,
    })
}

export const userLogin =
    ({ inputData, onSuccess, onError }: any) =>
    async (dispatch: any) => {
        dispatch({
            type: ActionTypes.USER_LOGIN,
        })

        try {
            const { data } = await UserService.login(inputData)
            localStorage.setItem('token', data.access_token)

            dispatch({
                type: ActionTypes.USER_LOGIN_SUCCESS,
            })
            onSuccess()
        } catch (err) {
            console.log(err)
            dispatch({
                type: ActionTypes.USER_LOGIN_FAILED,
                payload: err.response.data.message,
            })
            onError(err.response.data.message)
        }
    }

export const userLogout = (): { type: string } => {
    localStorage.removeItem('token')

    return {
        type: ActionTypes.USER_LOGOUT,
    }
}
