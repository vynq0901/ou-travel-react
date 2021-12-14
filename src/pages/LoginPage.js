import React, { useEffect } from "react"
import Login from "../components/UserComponents/LoginComponent/Login"
import Cookies from "universal-cookie"
import { useHistory } from "react-router"


export default function LoginPage({type}) {
    const history = useHistory()
    const cookies = new Cookies()

    useEffect(() => {
        if(cookies.get('user')) history.push('/')
    })

    return (
        <div>
            <Login type={type}/>
        </div>
    )
}