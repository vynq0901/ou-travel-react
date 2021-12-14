import React, {useEffect} from "react"
import { useLocation, useParams } from "react-router"
import NewsDetail from "../components/NewsComponents/NewsDetailComponent/NewsDetail"


export default function NewsDetailPage() {
    const path = useLocation()

    useEffect(() => {
        localStorage.setItem('url', path.pathname)
        window.scrollTo({top: 0})
    },[path])

    const {id} = useParams()

    return (
        <React.Fragment>
            <NewsDetail id={id} />
        </React.Fragment>
    )
}