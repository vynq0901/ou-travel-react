import React, {useEffect} from "react"
import Banner from '../components/BannerComponent/Banner'
import RecentTours from '../components/ToursComponents/RecentToursComponent/RecentTours'
import RecentNews from '../components/NewsComponents/RecentNewsComponent/RecentNews'
import ChooseUs from '../components/ChooseUsComponent/ChooseUs'
import { useLocation } from "react-router"

export default function HomePage() {
    const locaion = useLocation()

    useEffect(() => {
       localStorage.setItem('url', locaion.pathname)
       window.scrollTo({top: 0})
    },[locaion])

    return (
        <React.Fragment>
            <Banner />
            <RecentTours />
            <RecentNews />
            <ChooseUs />
        </React.Fragment>
    )
}