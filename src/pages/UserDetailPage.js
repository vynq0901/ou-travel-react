import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import UserDetail from '../components/UserComponents/UserDetailComponent/UserDetail'
import { useSelector } from 'react-redux'


function UserDetailPage() {
    const currentUser = useSelector((state) => state.user)
    const history = useHistory()

    useEffect(() => {
        if(!currentUser.isLoggedIn) history.push('/')
    })
    
    return (
        <React.Fragment>
            <UserDetail />
        </React.Fragment>
    );
}

export default UserDetailPage