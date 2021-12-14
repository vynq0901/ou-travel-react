import React, { useState, memo, useRef } from 'react'
import './OrderTourForm.css'
import {useForm} from 'react-hook-form'
import CurrencyFormat from 'react-currency-format'
import PaymentConfirm from '../PaymentConfirmComponent/PaymentConfirm'

function OrderTourForm({name,price,price_child,loggedIn,user,tour,email,user_name,toast}) {
    const {register, handleSubmit, setValue, reset} = useForm()
    const [total, setTotal] = useState(0)
    const adultValue = useRef()
    const childValue = useRef()
    const [confirm, setConfirm] = useState(false)
    const [data, setData] = useState({})

    const onsubmit = (data) => {
        setData({
            adult: Number.parseInt(data.adult),
            children: data.children ? Number.parseInt(data.children): 0,
            total,
            user,
            tour,
            email,
            user_name,
            tour_name: name
        })
        reset({
            adult:'',
            children: ''
        })
        setConfirm(true)
    }

    const handleChangeValue = (type,e) => {
        const adultPrice = (adultValue.current.value === 0 || adultValue.current.value === '') ? 0 : adultValue.current.value*price
        const childPrice = (childValue.current.value === 0 || childValue.current.value === '') ? 0 : childValue.current.value*price_child
        setTotal(adultPrice+childPrice)
        setValue(type, e.target.value)
    }

    return (
        <form className="order-tour-section radius-10" onSubmit={handleSubmit(onsubmit)}>
            <h3 className="radius-top-10">Đặt Tour</h3>
            <div className="order-tour-section-content">
                <div className="order-tour-section-name">{name}</div>
                <div>
                    Người lớn: <CurrencyFormat 
                                    value={price} 
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    className="order-form-price"
                                />đ/người
                </div>
                <div>Trẻ em: <CurrencyFormat 
                                    value={price_child} 
                                    displayType={'text'} 
                                    thousandSeparator={true}
                                    className="order-form-price"
                                />đ/người</div>

                <div className="order-tour-form">
                    <div className="order-tour-form-container">
                        <div className="order-tour-form-item">
                            <label>Người lớn</label>
                            <input 
                                type="number" 
                                {...register('adult', {required: true})} 
                                min={1} 
                                className="login-form-input center-text non-margin" 
                                required
                                onChange={(e) => handleChangeValue('adult',e)}
                                disabled={!loggedIn}
                                ref={adultValue}
                            />
                        </div>
                        <div className="order-tour-form-item">
                            <label>Trẻ em</label>
                            <input 
                                type="number" 
                                {...register('children')} 
                                min={0} 
                                className="login-form-input center-text non-margin"
                                ref={childValue}
                                onChange={(e) => handleChangeValue('children',e)}
                                disabled={!loggedIn}
                            />
                        </div>
                    </div>
                    
                </div>
            </div>

            {
                loggedIn 
                ? <div className="order-form-submit-section radius-bot-10">
                    <div className="total-value">
                        <span>Tổng cộng</span>
                        <span className="order-form-price-total">
                            <CurrencyFormat 
                                value={total} 
                                displayType={'text'} 
                                thousandSeparator={true}
                            />đ
                        </span>
                    </div>
                    <input type="submit" value="Đặt Tour" id="submit-btn" className="radius-10"/>
                 </div>
                : <div className="order-form-require-section radius-bot-10">
                    Bạn phải <a href="/login">đăng nhập</a> hoặc <a href="/register">đăng ký</a> để có thể đặt Tour
                </div>
            }
            {confirm && <PaymentConfirm 
                adult={adultValue.current.value}
                children={childValue.current.value}
                total={total}
                callBack={setConfirm}
                data={data}
                toast={toast}
            />}
        </form>
    )
}

export default memo(OrderTourForm)