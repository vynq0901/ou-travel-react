import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import userApi from '../../../APIController/UserAPI'
import './LoginForm.css'
import {useDispatch } from 'react-redux'
import {setUser} from '../../../redux/reducers/UserSlice'
import NotificationPopup from '../NotificationPopupComponent/NotificationPopup'
import Cookies from "universal-cookie"
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function LoginForm() {
    const { register, handleSubmit} = useForm()
    const [errorInfo,setErrorInfo] = useState(false)
    const [success, setSuccess] = useState(false)
    const dispatch = useDispatch()
    const cookies = new Cookies()
    const history = useHistory()
    const {t} = useTranslation()
    const btnStyle = {
        margin: '0px'
    }

    const errorStyle = {
        display: "block"
    }

    const onSubmit = async (data) => {
        try {
            const res = await userApi.login(data.username,data.password)
            cookies.set('access_token',res.access_token, { path: '/' })
            cookies.set('user',res.current_user, { path: '/' })
            dispatch(setUser(cookies.get('user')))
            setSuccess(true)
            setTimeout(() => localStorage.getItem('url') ? history.push(localStorage.getItem('url')): history.push('/'),2000)
        } 
        catch {
            setErrorInfo(true)
        }
        
    }

    return (
        <div className="login-form-container radius-10">
            <h4 className="login-form-header radius-top-10">{t("loginForm.1")}</h4>
            <form onSubmit={handleSubmit(onSubmit)} className="login-form-content" action="/">
                <input  
                    {...register('username', {required: true})} 
                    className="login-form-input" 
                    placeholder={t("loginForm.2")}
                    required
                />
                <input 
                    type="password" {...register("password", { required: true })} 
                    className="login-form-input" 
                    placeholder={t("loginForm.3")}
                    required
                />
                <div className="incorrect" style={errorInfo ? errorStyle : null}>{t("loginForm.5")}</div>
                <input type="submit" id="submit-btn" value={t("loginForm.1")} style={errorInfo ? btnStyle : null}/>
                
                <div className="register-context">
                    <span>{t("loginForm.4")} </span><Link to="/register">{t("register")}</Link>
                </div>
            </form>
            {success && <NotificationPopup action={{type:'Đăng nhập', direct:'trước đó'}}/>}
        </div>
    )
}

export default LoginForm