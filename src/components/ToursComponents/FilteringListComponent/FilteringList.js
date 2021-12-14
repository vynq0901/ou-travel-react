import React, { useEffect, useState, memo, useRef } from 'react'
import toursApi from '../../../APIController/ToursAPI'
import './FilteringList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faMapMarkerAlt, faDollarSign, faList } from "@fortawesome/free-solid-svg-icons"

function FilteringList({type,handleSelectFilter}) {
    const [dataFilter, setDataFilter] = useState([])
    const refs = useRef([])
    const iconType = {
        traffic: <FontAwesomeIcon icon={faCar} />,
        location: <FontAwesomeIcon icon={faMapMarkerAlt} />,
        category: <FontAwesomeIcon icon={faList} />,
        price: <FontAwesomeIcon icon={faDollarSign} />,
    }

    useEffect (() => {
        if(type.endpoint){
            const getData = async () => {
                const res = await toursApi.getType(type.endpoint)
                setDataFilter(res.results)
            }
            getData()
        }

        if(type.items) setDataFilter(type.items)
        
    }, [type])

   
    const handleClick = (current,category) => {
        window.scrollTo({top:0})
        handleSelectFilter(current,category)
    }

    return (   
        <div className="filter-category">
            <h5>{iconType[type.icon]} {type.title}</h5>

            <ul className="list-category">
                {dataFilter.map((filter,index) => (
                    <li key={filter.id}>
                        <input 
                            type={type.icon === 'price' ? 'radio' : 'checkbox'}
                            value={filter.id}
                            ref={(ele) => refs.current[index] = ele}
                            name="filter"
                            onClick={() => handleClick(refs.current[index],type.icon)}
                        /> {filter.name}
                    </li>
                ))}
            </ul> 

        </div>
    )
}

export default memo(FilteringList)