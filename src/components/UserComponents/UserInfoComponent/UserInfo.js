import React, {memo} from 'react'
import './UserInfo.css'

function UserInfo({user}) {
    const group = {
        'admin': 'Quản trị viên',
        'staff': 'Nhân viên',
        'manager': 'Quản lý'
    }

    return (
        <div className="user-info-section">
            <div className="user-info-label">
                <h4>Họ tên</h4>
                <h4>username</h4>
                <h4>Email</h4>
                <h4>Địa chỉ</h4>
                <h4>Số điện thoại</h4>
                {(user.groups && user.groups.length > 0) &&<h4>Chức vụ</h4>}
            </div>
            
            <div className="user-info-detail">
                <h4>{`${user.first_name} ${user.last_name}`}</h4>
                <h4>{user.username}</h4>
                <h4>{user.email}</h4>
                <h4>{(user.address && user.address !== 'null') ? user.address : 'Chưa cập nhật'}</h4>
                <h4>{(user.phone_number && user.phone_number !== 'null') ? user.phone_number : 'Chưa cập nhật'}</h4>
                {(user.groups && user.groups.length > 0) &&<h4>{group[user.groups[0].name]}</h4>}
            </div>
        </div>
    )
}

export default memo(UserInfo)