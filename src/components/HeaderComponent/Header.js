import React, { memo} from "react"
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faSignInAlt, faUserPlus, faSignOutAlt, faCog, faCaretDown, faUserCog, faChartBar } from "@fortawesome/free-solid-svg-icons"
import { useSelector, useDispatch } from 'react-redux'
import {logout} from '../../redux/reducers/UserSlice'
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next'
function Header() {
    const currentUser = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div className="header">
            <div className="container">
                <div className="left-items">
                    <p><FontAwesomeIcon icon={faPhone}/> (+84)854157567</p>
                    <p><FontAwesomeIcon icon={faEnvelope}/> vy.nq0901@gmail.com</p>
                </div>
                {
                    currentUser.user
                    ? <div className="right-items-header">
                         <img 
                            src={currentUser.user.avatar_url}
                            alt="user-avatar"
                        />
                        <span>Xin chào, {currentUser.user.last_name}</span>
                        <div className="setting-user">
                            <FontAwesomeIcon icon={faCog}/> <FontAwesomeIcon icon={faCaretDown}/>
                            <div className="dropdown-menu radius-10">
                                <div className="dropdown-menu-list">
                                    <div className="dropdown-item radius-top-10">
                                        <Link to="/user-detail" >
                                            <FontAwesomeIcon icon={faUserCog}/> {t("personInfo")}
                                        </Link>
                                    </div>
                                    {
                                        currentUser.user.is_staff 
                                        && <div className="dropdown-item">
                                            <Link to="/statistical" ><FontAwesomeIcon icon={faChartBar}/> Thống kê</Link>
                                        </div>
                                    }
                                    <div className="dropdown-item radius-bot-10">
                                        <span onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt}/> {t("logout")}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <div className="right-items-header">
                        <Link to="/login"><FontAwesomeIcon icon={faSignInAlt}/> {t("login")}</Link>
                        <Link to="/register"><FontAwesomeIcon icon={faUserPlus}/> {t("register")}</Link>
                    </div>
                }
                
            </div>
        </div>
    )
}

export default memo(Header)