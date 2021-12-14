import React, { useState } from 'react'
import './PaymentConfirm.css'
import CurrencyFormat from 'react-currency-format'
import Cookies from 'universal-cookie'
import toursApi from '../../../APIController/ToursAPI'
import { LinearProgress } from '@mui/material'

function PaymentConfirm(props) {
    const cookies = new Cookies()
    const access_token = cookies.get('user').access_token
    const [loading,setLoading] = useState(false)

    const handleClickCancel = () => {
        props.callBack(false)
    }

    const handleClickConfirm = async () => {
        setLoading(true)
        await toursApi.orderTour(props.data,access_token)
        await toursApi.sendEmail(props.data)
        props.toast.success("Đặt Tour thành công, hóa đơn đã được gửi vào email của bạn.")
        props.callBack(false)
    }

    return (
        <div className="noti-overlay">
            <div className="noti-content radius-10 payment-content">
                <h1>Xác nhận phiếu đặt Tour</h1>
                <div>Số người lớn: {props.adult}</div>
                <div>Số trẻ em: {props.children !== "" ? props.children : 0}</div>
                <div>Tổng số tiền</div>
                <div className="order-form-price-total"> <CurrencyFormat 
                                value={props.total} 
                                displayType={'text'} 
                                thousandSeparator={true}
                        />đ</div>
                {loading 
                ? <LinearProgress /> 
                : <div className="confirm-section">
                    <button className="radius-10" onClick={handleClickConfirm}>Xác nhận thanh toán</button>
                    <button className="radius-10 cancel" onClick={handleClickCancel}>Hủy</button>
                </div>
                }
            </div>
        </div>
    )
}

export default PaymentConfirm