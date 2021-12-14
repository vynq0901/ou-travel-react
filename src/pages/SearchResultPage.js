import React, {useEffect, useState } from "react"
import toursApi from "../APIController/ToursAPI"
import Loader from "../components/LoaderComponent/Loader"
import SearchResult from "../components/SearchComponents/SearchResultComponent/SearchResult"
import { useLocation } from "react-router"


export default function SearchResultPage() {
    const queryParams = new URLSearchParams(window.location.search)

    const destination = queryParams.get('destination')
    const start = queryParams.get('start')

    const path = useLocation()

    const [tours,setTours] = useState([])
    const [loading,setLoading] = useState(true)
    const [totalPage, setTotalPage] = useState(1)
    const [offset,setOffset] = useState(0)
    const limit = 10

    const paginate = (pageNumber) => {
        setOffset(pageNumber)
        console.log(pageNumber)
    }

    useEffect(() => {
        const getData = async () => {
            localStorage.setItem('url', path.pathname)
            const res = await toursApi.searchTours(destination,start,limit,offset)
            setTours(res.results)
            setTotalPage(Math.ceil(res.count/limit))
            setLoading(false)
        }
        getData()
    }, [destination,start,offset,path])

    return (
        <React.Fragment>
            {
                loading 
                ? <Loader />
                : totalPage > 1 
                ? <SearchResult 
                tours={tours}
                destination={destination}
                start={start}
                pages={{total: totalPage, paginate, limit, offset, currentPage: offset / limit + 1}}
                /> 
                : <SearchResult 
                tours={tours}
                destination={destination}
                start={start}
                />
            }
        </React.Fragment>
    )
}