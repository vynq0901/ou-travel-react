import React, {useEffect} from "react"
import AllTours from "../components/ToursComponents/AllToursComponent/AllTours"
import { useLocation } from "react-router"

export default function ToursPage() {
    const path = useLocation()

    useEffect(() => {
        localStorage.setItem('url', path.pathname)
        window.scrollTo({top: 0})
    },[path])

    return (
        <React.Fragment>
            <AllTours />
        </React.Fragment>
    )
}