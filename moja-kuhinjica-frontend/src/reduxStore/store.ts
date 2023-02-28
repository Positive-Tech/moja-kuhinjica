import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import reducers from './reducers/index'

const initialState = {}
const middleware = [thunk]
const store = configureStore({
    reducer: reducers,
    middleware: middleware,
    preloadedState: initialState,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
