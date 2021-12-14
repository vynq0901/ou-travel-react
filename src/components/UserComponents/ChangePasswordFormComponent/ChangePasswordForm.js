import React, { useState } from 'react'
import './ChangePasswordForm.css'
import {useForm} from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import LinearProgress from '@mui/material/LinearProgress'
import { TextField } from '@mui/material'
import userApi from '../../../APIController/UserAPI'

function ChangePasswordForm({close,access_token}) {
    const { register, handleSubmit, reset} = useForm()
    const [loading, setLoading] = useState(false)
    const [errorFile, setErrorFile] = useState({status: false, msg: ''})

    const onsubmit = async (data) => {
        setLoading(true)
        if(data.new_password !== data.new_password_confirm) {
            setErrorFile({status: true, msg:'Xác nhận mật khẩu chưa đúng'})
            setLoading(false)
        } else {
            try {
                delete data['new_password_confirm']
                await userApi.changePassword(data,access_token)
                setLoading(false)
                setErrorFile({status: true, msg:'Đổi mật khẩu thành công!'})
                reset({
                    new_password: '',
                    old_password: '',
                    new_password_confirm: ''
                })
            } catch {
                setLoading(false)
                setErrorFile({status: true, msg:'Mật khẩu cũ không đúng'})
            }
        }
    }

    return (
        <div className="noti-overlay">
            <div className="edit-profile-form radius-10">
                <form className="edit-profile-form-container" onSubmit={handleSubmit(onsubmit)} autoComplete="off">
                <div className="edit-profile-item">
                        <TextField  
                            {...register('old_password')} 
                            label="Mật khẩu cũ" 
                            variant="standard"
                            className="edit-profile-input"
                            type="password"
                            required
                        />
                </div>

                <div className="edit-profile-item">
                        <TextField  
                            {...register('new_password')} 
                            label="Mật khẩu mới" 
                            variant="standard"
                            className="edit-profile-input"
                            type="password"
                            required
                        />
                </div>

                <div className="edit-profile-item">
                        <TextField  
                            {...register('new_password_confirm')} 
                            label="Xác nhận mật khẩu mới" 
                            variant="standard"
                            className="edit-profile-input"
                            type="password"
                            required
                        />
                </div>

                {errorFile.status && <div className="error-msg">{errorFile.msg}</div>}
                <div className="edit-profile-form-submit">
                    <input type="submit" className="radius-10" value="Lưu" />
                </div>
                {loading && <div className="image-loader"><LinearProgress /></div>}
                </form>
                <button className="change-avatar-cancel-button" onClick={() => close(false)}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
            
        </div>
    )
}

export default ChangePasswordForm