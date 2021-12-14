import React, {useEffect} from "react"
import { useLocation } from "react-router"
import ListNews from "../components/NewsComponents/ListNewsComponent/ListNews"


export default function NewsPage() {
    const path = useLocation()

    useEffect(() => {
        localStorage.setItem('url', path.pathname)
        window.scrollTo({top: 0})
    },[path])

    return (
        <React.Fragment>
            <ListNews />
        </React.Fragment>
    )
}