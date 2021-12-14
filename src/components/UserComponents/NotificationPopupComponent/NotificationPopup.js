import React from 'react'
import './NotificationPopup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle} from "@fortawesome/free-solid-svg-icons"

function NotificationPopup({action}) {
    return (
        <div className="noti-overlay">
            <div className="noti-content radius-10">
                <h1>{action.type} thành công</h1>
                <FontAwesomeIcon icon={faCheckCircle} className="check-icon"/>
                <span className="noti-text">Đang chuyển sang trang {action.direct}</span>
                <div className="dot dot-left"></div>
                <div className="dot dot-center"></div>
                <div className="dot dot-right"></div>
            </div>
        </div>
    );
}

export default NotificationPopup