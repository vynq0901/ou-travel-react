import React, { useEffect, useState } from "react"
import './RecentTours.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserClock, faMapMarkerAlt, faCar } from "@fortawesome/free-solid-svg-icons"
import toursApi from '../../../APIController/ToursAPI'
import CurrencyFormat from 'react-currency-format'
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next'
export default function RecentTours(){
    
    const [recentTours, setRecentTours] = useState([])
    const {t} = useTranslation()
    useEffect(() => {

        const getData = async () => {
            const res = await toursApi.getNewTours()
            setRecentTours(res.results)
        }

        getData()

    }, [])

    return (
        <div className="recent-tours-section">
            <div className="title">
                <h2 className="main-title">{t("latestTour")}</h2>
            </div>

            <div className="list-recent-tour">
                {
                    recentTours.map(tour => (
                        <div className="tour-items radius-10" key={tour.id}>
                            <img className = "radius-10" src={tour.image} alt={tour.name}/>
                            <div className="tour-brief radius-bot-10">
                                <div className="location"><FontAwesomeIcon icon={faMapMarkerAlt}/> {tour.destination.name}</div>
                                <div className="price"><CurrencyFormat value={tour.price} displayType={'text'} thousandSeparator={true}/>đ</div>
                            </div>
                            <div className="tour-details radius-10">
                                <p><strong>{tour.name}</strong></p>
                                <p><FontAwesomeIcon icon={faUserClock}/><strong> {t("duration")}: </strong> {tour.time}</p>
                                <p><FontAwesomeIcon icon={faCar}/><strong> {t("vehicle")}: </strong> {tour.traffic}</p>
                                <p><strong><Link to={`/tours/detail/${tour.id}/`} className="detail-btn radius-10">{t("seeDetail")}</Link></strong></p>
                            </div>
                        </div>          
                    ))
                }  
            </div>

            <div className="all-tour">
                <Link className="all-tour-btn radius-10" to="/tours">{t("seeAll")}</Link>
            </div>
        </div>
    )
}