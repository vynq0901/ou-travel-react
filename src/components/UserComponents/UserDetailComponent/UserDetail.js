import React, { useEffect, useState } from 'react'
import './UserDetail.css'
import UserInfo from '../UserInfoComponent/UserInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCamera } from "@fortawesome/free-solid-svg-icons"
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import userApi from '../../../APIController/UserAPI'
import { useSelector } from 'react-redux'
import Cookies from "universal-cookie"
import BookingHistory from '../BookingHistoryComponent/BookingHistory'
import ChangeAvatarForm from '../ChangeAvatarFormComponent/ChangeAvatarForm'
import EditProfile from '../EditProfileComponent/EditProfile'
import Loader from '../../LoaderComponent/Loader'
import ChangePasswordForm from '../ChangePasswordFormComponent/ChangePasswordForm'

function UserDetail() {
    const [value, setValue] = useState('1')
    const currentUser = useSelector((state) => state.user)
    const [user,setUser] = useState({})
    const [avatarForm, setAvatarForm] = useState(false)
    const [editForm, setEditForm] = useState(false)
    const [changePassForm, setChangePassForm] = useState(false)
    const [loading, setLoading] = useState(true)
    const cookies = new Cookies()

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const access_token = cookies.get('access_token')

    useEffect(() => {
        if(currentUser.isLoggedIn) {
            const getUser = async () => {
                const res = await userApi.getUserInfo(currentUser.user.id,access_token)
                setUser(res)
                setLoading(false)
            }
            getUser()
        }
    }, [currentUser,access_token,avatarForm,editForm])

    return (
        <div className="user-detail-section">
            {loading ? <div className="user-detail-loader"><Loader /></div> : <div className="container-center">
                <div className="overview-detail center-item">
                    <div className="overview-detail-left">
                        <div className="user-detail-avatar">
                            <img src={user.avatar} alt="avatar" className="user-avatar main-avatar"/>
                            <div className="edit-avatar" onClick={() => setAvatarForm(true)}>
                                <FontAwesomeIcon icon={faCamera} />
                            </div>
                        </div>
                        <div className="user-detail-name">
                            <h1>{currentUser.isLoggedIn && `${user.first_name} ${user.last_name}`}</h1>
                        </div>
                    </div>  

                    <div className="edit-profile">
                        <button 
                            id="edit-profile-btn" 
                            className="radius-10"
                            onClick={() => setEditForm(true)}
                        >Chỉnh sửa trang cá nhân</button>
                        <button 
                            id="edit-profile-btn" 
                            className="radius-10"
                            onClick={() => setChangePassForm(true)}
                        >Đổi mật khẩu</button>
                    </div>
                </div>

                <div className="user-detail-tab-panel center-item radius-10">
                    <TabContext value={value} >
                        <Tabs 
                            value={value}
                            onChange={handleChange}
                            variant='fullWidth'
                        >
                            <Tab label="Thông tin cá nhân" value="1" />
                            <Tab label="Lịch sử đặt Tour" value="2" />
                        </Tabs>

                        <TabPanel value="1"><UserInfo user={user}/></TabPanel>
                        <TabPanel value="2"><BookingHistory history={user.booking_history} /></TabPanel>
                    </TabContext>
                </div>
            </div>
            }
            {avatarForm && <ChangeAvatarForm close={setAvatarForm} id_user={user.id}/>}
            {editForm && <EditProfile user={user} id={currentUser.user.id} access_token={access_token} close={setEditForm}/>}
            {changePassForm && <ChangePasswordForm close={setChangePassForm} id={currentUser.user.id} access_token={access_token}/>}
        </div>
    )
}

export default UserDetail