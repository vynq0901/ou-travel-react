import React from 'react'
import LoginForm from '../LoginFormComponent/LoginForm'
import RegisterForm from '../RegisterFormComponent/RegisterForm'
import './Login.css'


function Login({type}) {
    
    return (
        <div className="login-bg">
            <div className="container-center">
                <div className="login-container">
                    {type === 'login' ? <LoginForm /> : <RegisterForm />}
                </div>
            </div>
        </div>
    )
}

export default Login