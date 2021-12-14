import React, { useRef, useState, useEffect } from "react"
import './SearchForm.css'
import DatePicker from "react-datepicker"
import { useTranslation } from 'react-i18next'
import "react-datepicker/dist/react-datepicker.css"

export default function SearchForm() {
    const [startDate, setStartDate] = useState()
    const [fill,setFill] = useState(false)
    const {t} = useTranslation()
    const destination = useRef()
    const searchForm = useRef()
    const searchBtn = useRef()

    const handleSubmit = (e) => {
        const start = document.getElementById('start')
        console.log(start)
        if(destination.current.value === '' && start.value === '') {
            e.preventDefault()
            setFill(true)
            searchBtn.current.style.marginTop = "14px"
        }
    }

    useEffect(() => {
        searchForm.current.addEventListener('submit', handleSubmit)
    }, [])

    return (
        <form className="search-form" action="/search/" ref={searchForm} autoComplete="off">
            <label>{t("searchForm.2")}</label>
            <div className="input-group">
                <input className="input-form radius-10" type="text" name="destination" placeholder={t("searchForm.3")} ref={destination} />
            </div>
            <label>{t("searchForm.4")}</label>
            <div className="input-group">
                <DatePicker 
                selected= {startDate}
                onChange={(date) => setStartDate(date)}
                className="input-form radius-10"
                placeholderText={t("searchForm.5")}
                dateFormat="dd/MM/yyyy"
                id="start"
                name="start"
                />
            </div>
            {fill && <div className='alert-fill'>{t("searchForm.6")}</div>}
            <div className="submit" ref={searchBtn}>
                <input type="submit" value={t("search")} id="submit-btn" className="radius-10" />
            </div>
        </form>
    )
}