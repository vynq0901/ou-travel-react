import React from "react"
import './TourItems.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faMapMarkerAlt, faCar, faCalendarAlt, faPlane, faShip, faEye } from "@fortawesome/free-solid-svg-icons"
import { formatDate } from "../../FormatDateComponent/FormatDate"
import CurrencyFormat from "react-currency-format"
import Rating from '@mui/material/Rating'
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next'


export default function TourItems({id,name,image,traffic,time,startDate,destination,price,avg_rating,views}){
    const {t} = useTranslation()
    const trafficList = traffic.split(',').map((traff) => traff.trim())

    return (
        <div className="list-tour-items radius-10">
            <div className="tour-item-image">
                <img src={image} alt={name}/>
            </div>
            <div className="tour-item-info">
                <h5><Link to={`/tours/detail/${id}`}>{name}</Link></h5>
                <p><FontAwesomeIcon icon={faMapMarkerAlt} className="icon-info"/> {destination}</p>
                <p><FontAwesomeIcon icon={faClock} className="icon-info"/> {time}</p>
                <p><FontAwesomeIcon icon={faCalendarAlt} className="icon-info"/> {formatDate(startDate)}</p>
                <div className='tour-item-end-info'>
                    <div className="end-info-icon">
                        {trafficList.find((traffic) => traffic === 'Ô tô') && <div className="icon-traffic"><FontAwesomeIcon icon={faCar}/></div>}
                        {trafficList.find((traffic) => traffic === 'Máy bay') && <div className="icon-traffic"><FontAwesomeIcon icon={faPlane}/></div>}
                        {trafficList.find((traffic) => traffic === 'Tàu thủy') && <div className="icon-traffic"><FontAwesomeIcon icon={faShip}/></div>}
                    </div>
                    <div className="end-info-view">
                        <div className="tour-item-view">{views} <FontAwesomeIcon icon={faEye} className="icon-info"/></div>
                    </div>
                </div>
            </div>
            <div className="tour-item-price">
                <div className="tour-item-rating">
                    <div className="item-rating">
                        {avg_rating > 0 ? <Rating name="read-only" value={avg_rating} readOnly /> : <span>Chưa có đánh giá</span>}
                    </div>
                </div>
                <div className="tour-item-price-person">
                    <h5><CurrencyFormat value={price} displayType={'text'} thousandSeparator={true}/>đ</h5>
                    <Link to={`/tours/detail/${id}/`} className="radius-10">{t("seeDetail")}</Link>
                </div>
            </div>
        </div>
    )
}