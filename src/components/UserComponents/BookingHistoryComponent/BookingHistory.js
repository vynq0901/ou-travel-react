import React from 'react'
import './BookingHistory.css'
import { Link } from 'react-router-dom'
import CurrencyFormat from "react-currency-format"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faChild, faDollarSign, faCalendarAlt} from "@fortawesome/free-solid-svg-icons"

function BookingHistory({history}) {
    return (
        <div className="booking-history-section">
            {history.length > 0 ? history.map((his, index) => (
                <div className="booking-history-item" key={index}>
                    <Link to={`/tours/detail/${his.tour.id}/`}>{his.tour.name}</Link>
                    <p><FontAwesomeIcon icon={faMale} /> Người lớn: {his.adult}</p>
                    <p><FontAwesomeIcon icon={faChild} /> Trẻ em: {his.children}</p>
                    <p><FontAwesomeIcon icon={faDollarSign} /> Tổng tiền: <CurrencyFormat value={his.total} displayType={'text'} thousandSeparator={true}/>đ</p>
                    <p><FontAwesomeIcon icon={faCalendarAlt} /> Ngày đặt: {his.date_add}</p>
                </div>
            )) : <div className="booking-history-item-empty"><p>Bạn chưa đặt Tour nào</p></div>
        }
        </div>
    );
}

export default BookingHistory