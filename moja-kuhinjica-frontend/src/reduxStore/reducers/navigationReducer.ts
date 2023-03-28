import { routes } from '@/constants/constants'
import { createAction, createReducer } from '@reduxjs/toolkit'
import { ActionTypes } from '../constants/actionTypes'

interface NavigationState {
    redirectToReservations: boolean
}

const initialNavigationState: NavigationState = {
    redirectToReservations: false,
}

export const setRedirectToReservations = createAction<boolean>(
    ActionTypes.SET_REDIRECT_TO_RESERVATIONS
)

export const navigationReducer = createReducer(
    initialNavigationState,
    (builder) => {
        builder.addCase(setRedirectToReservations, (state, action) => {
            state.redirectToReservations = action.payload
        })
    }
)
