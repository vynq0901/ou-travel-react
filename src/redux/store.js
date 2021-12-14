import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/UserSlice'

const reducer = {
    user: userReducer,
}

const store = configureStore({
    reducer: reducer,
})

export default store