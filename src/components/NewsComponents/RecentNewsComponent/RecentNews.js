import React, { useEffect, useState } from "react"
import './RecentNews.css'
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import renderButtonGroupOutside from 'react-multi-carousel'
import newsApi from '../../../APIController/NewsAPI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faCalendar } from "@fortawesome/free-solid-svg-icons"
import { formatDate } from "../../FormatDateComponent/FormatDate"
import { responsive } from "../../../redux/constants/responsive"
import { useTranslation } from 'react-i18next'
export default function RecentNews() {
    const [recentNews, setRecentNews] = useState([])
    const {t} = useTranslation()
    useEffect(() => {
        const getData = async () => {
            const res = await newsApi.getNewsRecent()
            setRecentNews(res.results)
        }

        getData()
    }, [])
    
    return (
        <div className="recent-news-section">
            <div className="background-flow">
                <div className="title">
                    <h2 className="main-title">{t("latestNews")}</h2>
                </div>
                <div className="news-list">
                    <Carousel 
                        responsive={responsive}
                        autoPlaySpeed={5000}
                        autoPlay={true}
                        infinite={true}
                        showDots={true}
                        renderDotsOutside={renderButtonGroupOutside}
                        dotListClass="dot-list"
                    >
                        {recentNews &&
                            recentNews.map((news) => (
                                <div className="news-item radius-10" key={news.id}>
                                    <img src={news.image} alt={news.name} className="radius-top-10"/>
                                    <div className="news-info">
                                        <div className="news-title">
                                            <h5>{news.name}</h5>
                                            <p><FontAwesomeIcon icon={faCalendar}/> {formatDate(news.date_add)}</p>
                                        </div>
                                        <div className="news-reaction">
                                            <h5 className="reaction"><FontAwesomeIcon icon={faEye}/> {news.views}</h5>
                                            <a href={`/news/new-detail/${news.id}`} className="learn-more radius-10">{t("seeDetail")}</a>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Carousel>
                </div>

                <div className="all-news">
                    <a className="all-news-btn radius-10" href="/news">{t("seeAll")}</a>
                </div>
            </div>
        </div>
    )
}