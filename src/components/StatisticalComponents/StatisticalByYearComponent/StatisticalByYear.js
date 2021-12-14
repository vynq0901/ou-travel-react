import React, { useEffect, useState } from 'react'
import './StatisticalByYear.css'
import userApi from '../../../APIController/UserAPI'
import {Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

function StatisticalByYear({token}) {
    const [data,setData] = useState([])
    const labels = []
    for(let i = new Date().getFullYear(); i >= 2020; i--) labels.push(i)

    useEffect(() => {
        const getData = async () => {
            const params = {
                year_from: 2020,
                year_to: new Date().getFullYear()
            }
            const res = await userApi.getStatistical(params,token)
            const list = Object.keys(res).map((key) => res[key])
            setData(list)
        }
        getData()
    },[token])

    const state = {
        labels: labels.reverse(),
        datasets: [
          {
            label: 'Doanh thu',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            data: data,
          }
        ]
    }

    return (
        <div className="statistical-by-year-section">
            <Bar
                data={state}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: `Doanh thu theo năm`,
                        },
                    }
                }}  
            />
        </div>
    )
}

export default StatisticalByYear