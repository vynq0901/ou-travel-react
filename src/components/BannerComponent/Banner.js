import React from "react"
import './Banner.css'
import '../SearchComponents/SearchFormComponent/SearchForm'
import SearchForm from "../SearchComponents/SearchFormComponent/SearchForm"
import { useTranslation } from 'react-i18next'
export default function Banner() {
    const {t} = useTranslation()
    return (
        <div className="banner">
            <div className="container">
                <div className="main-content">
                    <h3>{t("welcome")}</h3>
                    <h1>DOGZ TOUR & TRAVELS</h1>
                </div>
                <div className="search-section">
                    <h4 className="radius-top-10">{t("searchForm.1")}</h4>
                    <SearchForm />
                </div>
            </div> 
        </div>
    )
}