import React, {useState, useEffect} from 'react'
import './ListNews.css'
import newsApi from '../../../APIController/NewsAPI'
import NewsItem from '../NewsItemComponent/NewsItem'
import Pagination from '../../PaginationComponent/Pagination'
import { useTranslation } from 'react-i18next'
function ListNews() {
    const {t} = useTranslation()
    const [listNews, setListNews] = useState([])
    const [totalPage, setTotalPage] = useState(1)
    const [filterParams, setFilterParams] = useState({
        limit: 16,
        offset: 0,
    })

    useEffect(() => {
        const getAllNews = async () => {
            const res = await newsApi.getAll()
            setListNews(res.results)
            setTotalPage(Math.ceil(res.count/filterParams.limit))
        }
        getAllNews()
    }, [filterParams])

    const paginate = (pageNumber) => {
        setFilterParams((prev) => ({
            ...prev,
            offset: pageNumber
        }))
    }
    
    return (
        <div className="news-section">
            <div className="title-page news-bg">
                <h2>{t("newsPage.1")}</h2>
            </div>
            <div className="container-center">
                <div className="list-news-container">
                    <div className="list-news-left-item" >
                        {
                            listNews.map((news,index) => (
                                <NewsItem news={news} key={index} />
                            ))
                        }
                    </div>
                </div>

                <Pagination
                    pageOffSet={{
                        total: totalPage, 
                        paginate, 
                        limit: filterParams.limit, 
                        offset: filterParams.offset, 
                        currentPage: filterParams.offset / filterParams.limit + 1
                    }}
                />
            </div>
           
        </div>
    )
}

export default ListNews