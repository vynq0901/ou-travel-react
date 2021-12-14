import React , {useEffect} from "react"
import DetailTour from "../components/ToursComponents/DetailTourComponent/DetailTour"
import { useLocation } from "react-router"


export default function TourDetailPage() {
    const path = useLocation()

    useEffect(() => {
        localStorage.setItem('url', path.pathname)
        window.scrollTo({top: 0})
    },[path])

    return (
        <React.Fragment>
            <DetailTour />
        </React.Fragment>
    )
}