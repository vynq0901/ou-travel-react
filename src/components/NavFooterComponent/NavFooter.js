import React, { memo } from "react"
import { Link } from "react-router-dom"
import './NavFooter.css'

function NavFooter() {

    return (
        <div className="nav-footer">
            <div className="nav-footer-container">
                <Link to="/">Trang chủ</Link>
                <Link to="/tours">Tours</Link>
                <Link to="/news" >Tin tức</Link>
                <Link to="/services" className="non-border">Dịch vụ</Link>
                <p className="copyright">© 2021 Lê Dương Đức DH18IT01</p>
            </div>
        </div>
    )
}

export default memo(NavFooter)