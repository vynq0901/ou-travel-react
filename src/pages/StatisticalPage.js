import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Cookies from 'universal-cookie'
import userApi from '../APIController/UserAPI'
import StatisticalContainer from '../components/StatisticalComponents/StatisticalContainerComponent/StatisticalContainer'

function StatisticalPage() {
    const history = useHistory()
    const cookies = new Cookies()
    const [today_total, setToday_total] = useState()

    useEffect(() => {
        if(!cookies.get('user')) history.push('/')

        const getRevenue = async () => {
            try {
                const today = new Date()
                const params = {
                    day: today.getDate(),
                    month: today.getMonth() + 1,
                    year_from: today.getFullYear()
                }
                const res = await userApi.getStatistical(params,cookies.get('access_token'))
                setToday_total(res.data)
            } catch {
                history.push('/')
            }
        }

        getRevenue()
    })

    return (
        <React.Fragment>
            <StatisticalContainer today_total={today_total} />
        </React.Fragment>
    )
}

export default StatisticalPage