import React, {memo, useEffect, useRef, useState} from 'react'
import './ChangeAvatarForm.css'
import {useForm} from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faTimes } from "@fortawesome/free-solid-svg-icons"
import LinearProgress from '@mui/material/LinearProgress'
import userApi from '../../../APIController/UserAPI'
import Cookies from 'universal-cookie'


function ChangeAvatarForm({close,id_user}) {
    const { register, handleSubmit} = useForm()
    const [avatar,setAvatar] = useState()
    const [loading, setLoading] = useState(false)
    const [errorFile, setErrorFile] = useState(false)
    const submitButton = useRef()
    const label = useRef()
    const cookies = new Cookies()

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview)
        }
    },[avatar])

    const onsubmit = async (data) => {
        try {
            submitButton.current.disabled = true
            setLoading(true)
            const formData = new FormData()
            formData.append('avatar',avatar)
            await userApi.updateAvatar(formData,cookies.get('access_token'),id_user)
            close(false)
        } catch {
            submitButton.current.disabled = false
            setErrorFile(true)
            setLoading(false)
        }
    }

    const handleReviewAvatar = (e) => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)

        if(!avatar) {
            label.current.classList.add('hiding-label')
        }

        setAvatar(file)
    }

    return (
        <div className="noti-overlay">
            <div className = "change-avatar-form radius-10">
                <form onSubmit={handleSubmit(onsubmit)}>
                    <div className="label-choose-avatar">
                        {avatar && <img src={avatar.preview} alt="preview" id="preview-avatar" />}
                        <label htmlFor="up-load" ref={label}><FontAwesomeIcon icon={faCamera} /></label>
                        <input 
                            type="file" 
                            {...register("avatar", { required: true })} 
                            accept="image/*"
                            id="up-load" 
                            required 
                            onChange={(e) => {handleReviewAvatar(e)}}
                        />
                        <div>Chọn ảnh</div>

                    </div>
                    
                    <div className="submit-change-avatar-section" >
                        {avatar && <input type="submit" className="radius-10" value="Lưu" ref={submitButton}/>}
                    </div>
                </form>
                <button className="change-avatar-cancel-button" onClick={() => close(false)}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                {loading && <div className="image-loader"><LinearProgress /></div>}
                {errorFile && <div className="error-msg">Ảnh không hợp lệ</div>}
            </div>
        </div>
    )
}

export default memo(ChangeAvatarForm)