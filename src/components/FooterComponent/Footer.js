import React, { memo } from 'react'
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons"
import { faFacebookF, faGooglePlusG, faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons'
import SubcribeForm from '../SubcribeFormComponent/SubcribeForm'


function Footer() {

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="list-footer-items">
                    <div className="footer-item">
                        <h4>OU Travel</h4>
                        <p>Trang đặt Tour du lịch đa dạng, nhanh chóng, an toàn.</p>
                    </div>
                    <div className="footer-item">
                        <h4>Liên hệ</h4>
                        <p><FontAwesomeIcon icon={faHome} className="icon"/> 371 Nguyễn Kiệm, phường 3, quận Gò Vấp, tp HCM</p>
                        <p><FontAwesomeIcon icon={faEnvelope} className="icon"/> vy.nq0901@gmail.com</p>
                        <p><FontAwesomeIcon icon={faPhone} className="icon"/> 0123456789</p>
                        <div className="social-media-icon">
                            <div className="icon-footer">
                                <a href="/"><FontAwesomeIcon icon={faFacebookF} className="icon-white"/></a>
                            </div>

                            <div className="icon-footer">
                                <a href="/"><FontAwesomeIcon icon={faTwitter} className="icon-white"/></a>
                            </div>

                            <div className="icon-footer">
                                <a href="/"><FontAwesomeIcon icon={faGooglePlusG} className="icon-white"/></a>
                            </div>

                            <div className="icon-footer">
                                <a href="/"><FontAwesomeIcon icon={faInstagram} className="icon-white"/></a>
                            </div>
                        </div>
                    </div>

                    <div className="footer-item">
                        <h4>Đăng ký</h4>
                        <p>Đăng ký để được nhận tin tức mới nhất về du lịch</p>
                        <SubcribeForm />
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default memo(Footer)