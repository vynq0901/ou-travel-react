import React from "react"
import './SubcribeForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"

export default function SubcribeForm() {

    return (
        <form className="subcribe-form">
            <input type="email" placeholder="Nhập email để đăng ký theo dõi..." className="radius-left-10" required />
            <button type="submit" id="submit-subcribe-btn" className="radius-right-10"><FontAwesomeIcon icon={faPaperPlane}/></button>
        </form>
    )
}