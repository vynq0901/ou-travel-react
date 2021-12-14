import React from "react"
import './PageNotFound.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUnlink, faHome } from "@fortawesome/free-solid-svg-icons"

export default function PageNotFound() {

    return (
        <div className="not-found-section">
            <div className="not-found-container">
                <div className="icon-not-found">
                    <FontAwesomeIcon icon={faUnlink} />
                </div>
                <p className="main-title">404</p>
                <h1>Không tìm thấy trang</h1>
                <p>Trang bạn yêu cầu không tồn tại.</p>
                <a className="home-btn" href="/"><FontAwesomeIcon icon={faHome} /> Trang chủ</a>
            </div>
        </div>
    )
}