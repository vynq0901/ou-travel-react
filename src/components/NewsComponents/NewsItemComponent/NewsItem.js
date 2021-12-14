import React from 'react'
import './NewsItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCommentDots } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function NewsItem({news}) {
    const {t} = useTranslation()
    return (
        <div className="news-item-section">
            <div className="news-item-content radius-top-10">
                <div className="news-item-image">
                    <img src={news.image} alt={news.name} />
                </div>
                <div className="news-item-body">
                    <Link to={`/news/detail/${news.id}`} className="news-item-title">{news.name}</Link>
                    <div className="news-item-author">
                        <p className="author-name">{news.date_add.split('-').reverse().join('-')}</p>
                        <p>{t("newsPage.2")}: <span className="author-name">{news.user.username}</span></p>
                    </div>
                </div>
            </div>

            <div className="news-item-footer radius-bot-10">
                <div className="comment-like">
                    <div className="news-item-like-icon"><FontAwesomeIcon icon={faHeart} className="icon"/> {news.like}</div>
                    <div><FontAwesomeIcon icon={faCommentDots} className="icon"/> {news.comment}</div>
                </div>
                <div className="news-item-learn-more">
                    <Link to={`/news/detail/${news.id}`} ><button id="news-item-learn-more-btn" className="radius-10">{t("newsPage.3")}</button></Link>
                </div>
            </div>
        </div>
    )
}

export default NewsItem