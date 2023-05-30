import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { restaurantReducer } from './restaurantReducer'
import { navigationReducer } from './navigationReducer'

const reducers = combineReducers({
    auth: userReducer,
    restaurant: restaurantReducer,
    navigation: navigationReducer,
})

export default reducers
