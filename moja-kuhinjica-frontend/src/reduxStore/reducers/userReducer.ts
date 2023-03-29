import UserService, { ILoggedInUser } from '@/service/User.service'
import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { FieldValues } from 'react-hook-form'
import { ActionTypes } from '../constants/actionTypes'

interface ILoginPayoload {
    inputData: FieldValues
    onSuccess: () => void
    onError: (error: string) => void
}

interface UserState {
    user: ILoggedInUser | null
    inProgress: boolean
    isAuthorized: boolean
    errorMessage: string | null | undefined
}

const initialState: UserState = {
    user: {
        id: '',
        name: '',
        surname: '',
        phoneNumber: '',
        role: '',
    },
    inProgress: false,
    isAuthorized: false,
    errorMessage: null,
}

export const userLogout = createAction(ActionTypes.USER_LOGOUT)
export const userLogin = createAsyncThunk<
    { access_token: string },
    {
        inputData: FieldValues
        onSuccess: () => void
        onError: (error: string) => void
    },
    { rejectValue: string }
>(
    ActionTypes.USER_LOGIN,
    async (
        { inputData, onSuccess, onError }: ILoginPayoload,
        { rejectWithValue }
    ) => {
        try {
            const { data } = await UserService.login(inputData)
            localStorage.setItem('token', data.access_token)
            onSuccess()

            return { access_token: data.access_token }
        } catch (err) {
            onError(err.response.data.message)
            return rejectWithValue(err.response.data.message)
        }
    }
)
export const loadUser = createAsyncThunk(ActionTypes.LOAD_USER, async () => {
    const data = await UserService.getLoggedInUser()
    return data
})

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(userLogout, (state) => {
            localStorage.removeItem('token')
            state.user = null
            state.isAuthorized = false
            state.errorMessage = null
        })
        .addCase(userLogin.fulfilled, (state, action) => {
            const isAuthorized = Boolean(action.payload)
            state.inProgress = false
            state.isAuthorized = isAuthorized
            state.errorMessage = isAuthorized ? null : 'Invalid response'
        })
        .addCase(userLogin.rejected, (state, action) => {
            state.inProgress = false
            state.errorMessage = action.error.message
        })
        .addCase(userLogin.pending, (state) => {
            state.inProgress = true
        })
        .addCase(loadUser.fulfilled, (state, action) => {
            state.user = action.payload
        })
})
