import React, { useEffect, useState } from "react"
import ListTour from "../ListTourComponent/ListTour"
import './AllTours.css'
import ButtonSwitch from "../ButtonSwitchComponent/ButtonSwitch"
import Pagination from "../../PaginationComponent/Pagination"
import toursApi from "../../../APIController/ToursAPI"
import Loader from "../../LoaderComponent/Loader"
import FilteringList from "../FilteringListComponent/FilteringList"
import { useTranslation } from 'react-i18next'

export default function AllTours() {
    const {t} = useTranslation()
    const [tours, setTours] = useState([])
    const [loading, setLoading] = useState(true)
    const [totalPage, setTotalPage] = useState(1)
    const [filterParams, setFilterParams] = useState({
        limit: 10,
        offset: 0,
        destination_ids: '',
        category_ids: '',
        price_min: '',
        price_max: '',
        traffic__icontains: ''
    })

    useEffect(() => {
        const getData = async () => {
            const res = await toursApi.getAllTours(filterParams)
            setTours(res.results)
            setTotalPage(Math.ceil(res.count/filterParams.limit))
            setLoading(false)
        }
        getData()
    }, [filterParams])

    const paginate = (pageNumber) => {
        setFilterParams((prev) => ({
            ...prev,
            offset: pageNumber
        }))
    }

    const handleSelectFilter = (filterData,type) => {
        setLoading(true)
        if(filterData.checked) {
            if(type === 'location') {
                let des = filterParams.destination_ids === '' ? [] : filterParams.destination_ids.split(',')
                des.push(filterData.value)
                console.log(des)
                setFilterParams((prev) => ({
                    ...prev,
                    destination_ids: des.length > 1 ? des.join(',') : des[0],
                    offset: 0
                }))
            }

            if(type === 'category') {
                let cate = filterParams.category_ids === '' ? [] : filterParams.category_ids.split(',')
                cate.push(filterData.value)
                setFilterParams((prev) => ({
                    ...prev,
                    category_ids: cate.length > 1 ? cate.join(',') : cate[0],
                    offset: 0
                }))
            }

            if(type === 'traffic') {
                let traffic = filterParams.traffic__icontains === '' ? [] : filterParams.traffic__icontains.split(',')
                traffic.push(filterData.value)
                setFilterParams((prev) => ({
                    ...prev,
                    traffic__icontains: traffic.length > 1 ? traffic.join(',') : traffic[0],
                    offset: 0
                }))
            }

            if(type === 'price') {
                if(filterData.value !== 0) {
                    let priceFilter = filterData.value.split('-')
                    let min = Number.parseInt(priceFilter[0])
                    let max = Number.parseInt(priceFilter[1])
                    setFilterParams((prev) => ({
                        ...prev,
                        price_min: min,
                        price_max: max ? max : '',
                        offset: 0
                    }))
                } else {
                    setFilterParams((prev) => ({
                        ...prev,
                        price_min: '',
                        price_max: '',
                        offset: 0
                    }))
                }
            }

       } else {
            if(type === 'location') {
                let des = filterParams.destination_ids.split(',')
                des.splice(des.indexOf(filterData.value),1)
                setFilterParams((prev) => ({
                    ...prev,
                    destination_ids: des.length > 1 ? des.join(',') : des.length > 0 ? des[0] : '',
                    offset: 0
                }))
            }

            if(type === 'category') {
                let cate = filterParams.category_ids.split(',')
                cate.splice(cate.indexOf(filterData.value),1)
                setFilterParams((prev) => ({
                    ...prev,
                    category_ids: cate.length > 1 ? cate.join(',') : cate.length > 0 ? cate[0] : '',
                    offset: 0
                }))
            }

            if(type === 'traffic') {
                let traffic = filterParams.traffic__icontains.split(',')
                traffic.splice(traffic.indexOf(filterData.value),1)
                setFilterParams((prev) => ({
                    ...prev,
                    traffic__icontains: traffic.length > 1 ? traffic.join(',') : traffic.length > 0 ? traffic[0] : '',
                    offset: 0
                }))
            }
       }
    }

    const handleSort = (sortData) => {
        setFilterParams((prev) => ({
            ...prev,
            ordering: sortData
        }))
    }

    return (
        <div className="all-tours-section">
            <div className="title-page tours-bg">
                <h2>Tours</h2>
            </div>

            <div className="container-center">
                <div className="container-items">
                    <div className="filter-section">
                        <div className="filter-header">
                            <h4>{t("filter.1")}</h4>
                        </div>
                        <div className="filter-area radius-bot-10">
                            <FilteringList 
                                type={{
                                    title: t("filter.2"),
                                    endpoint: 'category',
                                    icon: 'category'
                                }}
                                handleSelectFilter={handleSelectFilter}
                            />

                            <FilteringList 
                                type={{
                                    title: t("filter.3"),
                                    endpoint: 'location',
                                    icon:'location'
                                }}
                                handleSelectFilter={handleSelectFilter}
                            />

                            <FilteringList 
                                type={{
                                    title: t("filter.4"),
                                    items: [
                                        {id:0, name: 'Tất cả'},
                                        {id:'1000000-3000000', name: '1,000,000đ - 3,000,000đ'},
                                        {id:'3000000-5000000', name:'3,000,000đ - 5,000,000đ'},
                                        {id:'5000000-10000000', name: '5,000,000đ - 10,000,000đ'},
                                        {id:'10000000', name: 'Trên 10,000,000đ'}
                                    ],
                                    icon:'price',
                                }}
                                handleSelectFilter={handleSelectFilter}
                            />

                            <FilteringList 
                                type={{
                                    title: t("filter.5"),
                                    items: [
                                        {id:'Ô tô', name: 'Ô tô'},
                                        {id:'Tàu thủy', name:'Tàu thủy'},
                                        {id:'Máy bay', name: 'Máy bay'}
                                    ],
                                    icon:'traffic'
                                    
                                }}
                                handleSelectFilter={handleSelectFilter}
                            />
                    </div>
                </div>
                   

                    <div className="right-items">
                        <div className="sort-section">
                            <ButtonSwitch 
                                listButton={[
                                    {value: t("filter.6"), id:''},
                                    {value: t("filter.7"), id:'-price'},
                                    {value: t("filter.8"), id:'price'}, 
                                    {value: t("filter.9"), id:'-views'}
                                ]}
                                handleSort={handleSort}
                            />
                        </div>

                        {
                            loading 
                            ? <div className="loader" ><Loader /></div>
                            : <ListTour tours={tours} />
                        }
                        
                        {
                        totalPage > 1 &&
                            <Pagination 
                                pageOffSet={{
                                    total: totalPage, 
                                    paginate, 
                                    limit: filterParams.limit, 
                                    offset: filterParams.offset, 
                                    currentPage: filterParams.offset / filterParams.limit + 1
                                }}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}