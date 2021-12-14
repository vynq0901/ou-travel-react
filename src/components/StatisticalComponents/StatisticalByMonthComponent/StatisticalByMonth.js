import React, { useEffect, useState } from 'react'
import './StatisticalByMonth.css'
import userApi from '../../../APIController/UserAPI'
import {Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'


const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9','Tháng 10','Tháng 11','Tháng 12'];

Chart.register(...registerables)

function StatisticalByMonth({token}) {
    const [totalData,setTotalData] = useState([])
    const [year, setYear] = useState(new Date().getFullYear())
    const [listYear,setListYear] = useState([])

    const handleChange = async (event) => {
        setYear(event.target.value)
        const params = {
            year_from: event.target.value
        }
        const res = await userApi.getStatistical(params,token)
        const array = Object.keys(res).map((key) => res[key])
        setTotalData(array)
    }

    useEffect(() => {
        const getData = async () => {
            const params = {
                year_from: new Date().getFullYear()
            }
            const res = await userApi.getStatistical(params,token)
            const array = Object.keys(res).map((key) => res[key])
            setTotalData(array)
        }
        getData()
        const list = []
        for(let i = new Date().getFullYear(); i >=2020; i--) list.push(i)
        setListYear(list)
    },[token])

    const state = {
        labels: labels,
        datasets: [
          {
            label: year,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            data: totalData,
          }
        ]
    }

    return (
        <div className="statistical-by-month-section">
            <div className="select-year">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={year}
                    onChange={handleChange}
                >
                    {listYear.map((year) => (
                        <MenuItem value={year}>{year}</MenuItem>
                    ))}
                </Select>
            </div>
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
                            text: `Doanh thu theo tháng năm ${year}`,
                        },
                    }
                }}  
            />
        </div>
    )
}

export default StatisticalByMonth