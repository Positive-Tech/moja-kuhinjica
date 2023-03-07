import { combineReducers } from 'redux'
import { userReducer2 } from './userReducer'

const reducers = combineReducers({
    auth: userReducer2,
})

export default reducers
