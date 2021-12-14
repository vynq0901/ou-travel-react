import { createSlice } from "@reduxjs/toolkit"
import Cookies from "universal-cookie"

const cookies = new Cookies()
const user = cookies.get('user')
const initState = user ? {isLoggedIn: true, user} : {isLoggedIn: false, user:null}


export const userSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        setUser: (state,action) => {
            state.isLoggedIn = true
            state.user = action.payload
        },

        logout: (state) => {
            state.isLoggedIn = false
            state.user = null
            cookies.remove('user', { path: '/' })
            cookies.remove('access_token', { path: '/' })
        }
    }
})

export const {setUser, logout} = userSlice.actions
export default userSlice.reducer