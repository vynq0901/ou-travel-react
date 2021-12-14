import React, {useState} from 'react'
import './StatisticalContainer.css'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import CurrencyFormat from 'react-currency-format'
import StatisticalByDate from '../StatisticalByDateComponent/StatisticalByDate'
import Cookies from 'universal-cookie'
import StatisticalByMonth from '../StatisticalByMonthComponent/StatisticalByMonth'
import StatisticalByYear from '../StatisticalByYearComponent/StatisticalByYear'

function StatisticalContainer({today_total}) {
    const [value, setValue] = useState('1')
    const cookies = new Cookies()

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <div className="statistical-section">
            <div className="container-center">
                <div className="statistical-tab-panel radius-10">
                    <TabContext value={value} >
                        <Tabs 
                            value={value}
                            onChange={handleChange}
                            variant='fullWidth'
                        >
                            <Tab label="Doanh thu theo ngày" value="1" />
                            <Tab label="Doanh thu theo tháng" value="2" />
                            <Tab label="Doanh thu theo năm" value="3" />
                        </Tabs>

                        <TabPanel value="1">
                            <h3>Doanh thu hôm nay</h3> 
                            <div className="currency-statistical" >
                                <CurrencyFormat value={today_total} displayType={'text'} thousandSeparator={true}/>đ
                            </div> 
                            <StatisticalByDate token={cookies.get('access_token')}/>
                        </TabPanel>
                        <TabPanel value="2"><StatisticalByMonth token={cookies.get('access_token')}/></TabPanel>
                        <TabPanel value="3"><StatisticalByYear token={cookies.get('access_token')}/></TabPanel>
                    </TabContext>
                </div>
            </div>         
        </div>
    )
}

export default StatisticalContainer