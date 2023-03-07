import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import type { RootState } from '../reduxStore/store'

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>

export const useAppDispatch = (): AppThunkDispatch =>
    useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
