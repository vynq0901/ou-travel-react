import React, {useState} from 'react'
import './StatisticalByDate.css'
import TextField from '@mui/material/TextField'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import userApi from '../../../APIController/UserAPI'
import CurrencyFormat from 'react-currency-format'
import Loader from '../../LoaderComponent/Loader'

function StatisticalByDate({token}) {
    const [value, setValue] = useState(new Date())
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [display, setDisplay] = useState(false)

    const handleChange = async (newValue) => {
        if(!display) setDisplay(true)
        setLoading(true)
        const params = {
            day: newValue.getDate(),
            month: newValue.getMonth() + 1,
            year_from: newValue.getFullYear()
        }
        const res = await userApi.getStatistical(params,token)
        setTotal(res.data)
        setValue(newValue)
        setLoading(false)
    }

    return (
        <div className="statistical-by-date-section">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    label="Chọn ngày"
                    inputFormat="dd/MM/yyyy"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            {display && (loading 
                ?  <Loader /> 
                : <div>
                    <h3>Doanh thu ngày {value.getDate()}/{value.getMonth() + 1}/{value.getFullYear()}</h3>
                    <div className="currency-statistical">
                        <CurrencyFormat value={total} displayType={'text'} thousandSeparator={true}/>đ
                    </div>
                </div>)}
        </div>
    )
}

export default StatisticalByDate