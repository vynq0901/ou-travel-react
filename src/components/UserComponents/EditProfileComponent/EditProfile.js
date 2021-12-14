import React, { useEffect, useState } from 'react'
import './EditProfile.css'
import {useForm} from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import userApi from '../../../APIController/UserAPI'
import LinearProgress from '@mui/material/LinearProgress'
import TextField from '@mui/material/TextField'

function EditProfile({close, user,id,access_token}) {
    const { register, handleSubmit, setValue} = useForm()
    const [loading, setLoading] = useState(false)
    const [errorFile, setErrorFile] = useState(false)

    useEffect(() => {
        setValue('first_name',user.first_name)
        setValue('last_name',user.last_name)
        user.address !== 'null' && setValue('address',user.address)
        user.phone_number !== 'null' && setValue('phone_number',user.phone_number)
    })
    
    const onsubmit = async (data) => {
        try {
            setLoading(true)
            let formData = new FormData()
            Object.keys(data).forEach((key) => {
                if(data[key] !== '') formData.append(key, `${data[key]}`)
            })
            await userApi.updateProfile(formData,access_token,id)
            close(false)
        } catch {
            setLoading(false)
            setErrorFile(true)
        }

    }
    
    return (
        <div className="noti-overlay">
            <div className="edit-profile-form radius-10">
                <form className="edit-profile-form-container" onSubmit={handleSubmit(onsubmit)} autoComplete="off">
                    <div className="edit-profile-name-input">
                        <TextField  
                            {...register('first_name')}
                            id="standard-basic"
                            label="Họ" 
                            variant="standard"  
                            className="edit-profile-name-input-first"
                        />
                        <TextField  
                            {...register('last_name')}
                            id="standard-basic"
                            label="Tên" 
                            variant="standard"
                            className="edit-profile-name-input-last"   
                        />
                    </div>
                    <div className="edit-profile-item">
                        <TextField  
                            {...register('address')} 
                            id="standard-basic" 
                            label="Địa chỉ" 
                            variant="standard"
                            className="edit-profile-input"
                        />
                    </div>

                    <div className="edit-profile-item">
                        <TextField 
                            {...register("phone_number")} 
                            id="standard-basic" 
                            label="Số điện thoại" 
                            variant="standard"
                            className="edit-profile-input"
                        />
                    </div>
                    {errorFile && <div className="error-msg">Thông tin không hợp lệ</div>}
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

export default EditProfile