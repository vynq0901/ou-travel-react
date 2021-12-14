import React from "react"
import './ChooseUs.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcase, faMoneyBill, faMoneyCheckAlt, faPhone } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from 'react-i18next'
export default function ChooseUs() {

    const {t} = useTranslation()
    return (
        <div className="choose-us-section">
            <div className="title">
                <h2 className="main-title">{t("whyChoose.0")}</h2>
            </div>
            <div className="list-reason">
                <div className="reason-item radius-10">
                    <div className="icon-reason-item diamond radius-5">
                        <FontAwesomeIcon icon={faSuitcase} className="icon-reason"/>
                    </div>
                    <h5>{t("whyChoose.1.11")}</h5>
                    <p>{t("whyChoose.1.12")}</p>
                </div>

                <div className="reason-item radius-10">
                    <div className="icon-reason-item diamond radius-5">
                        <FontAwesomeIcon icon={faMoneyBill} className="icon-reason"/>
                    </div>
                    <h5>{t("whyChoose.2.21")}</h5>
                    <p>{t("whyChoose.2.22")}</p>
                </div>

                <div className="reason-item radius-10">
                    <div className="icon-reason-item diamond radius-5">
                        <FontAwesomeIcon icon={faMoneyCheckAlt} className="icon-reason"/>
                    </div>
                    <h5>{t("whyChoose.3.31")}</h5>
                    <p>{t("whyChoose.3.32")}</p>
                </div>

                <div className="reason-item radius-10">
                    <div className="icon-reason-item diamond radius-5">
                        <FontAwesomeIcon icon={faPhone} className="icon-reason"/>
                    </div>
                    <h5>{t("whyChoose.4.41")}</h5>
                    <p>{t("whyChoose.4.42")}</p>
                </div>
            </div>
        </div>
    )
}