import {memo, React} from "react"
import './NavBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcase, faUtensils, faNewspaper, faPen } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import ReactCountryFlag from "react-country-flag"
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n'
function NavBar() {
    const {t} = useTranslation()
    return (
        <div className="nav-bar">
            <div className="container">
                <div className="web-name">
                    <Link to="/">OU TRAVEL</Link>
                </div>
                <div className="nav-items">
                    <ul className="list-items">
                        <li><Link to="/tours"><FontAwesomeIcon icon={faSuitcase}/> TOURS</Link></li>
                        <li><Link to="/news"><FontAwesomeIcon icon={faNewspaper}/> {t("navbar.1")}</Link></li>
                        <li><Link to="/services"><FontAwesomeIcon icon={faUtensils}/> {t("navbar.2")}</Link></li>
                        <li><Link to="/suggestion"><FontAwesomeIcon icon={faPen}/> {t("navbar.3")}</Link></li>
                        <li>
                            <button onClick={() => i18n.changeLanguage('vn')}>
                                <ReactCountryFlag
                                    countryCode="VN"
                                    svg
                                />  
                                <span>VN</span>
                            </button>
                            <button onClick={() => i18n.changeLanguage('en')}>
                                <ReactCountryFlag
                                    countryCode="US"
                                    svg
                                />  
                                <span>EN</span>
                            </button>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default memo(NavBar)