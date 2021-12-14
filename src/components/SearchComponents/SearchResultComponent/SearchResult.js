import React from 'react'
import ListTour from '../../ToursComponents/ListTourComponent/ListTour'
import './SearchResult.css'
import Pagination from '../../PaginationComponent/Pagination'

export default function SearchResult({destination,start,tours,pages}) {

    return (
        <div className="search-result-section">
            <div className="title-page search-bg">
                <h2>Kết quả tìm kiếm</h2>
            </div>
            <div className="container-center">
                <div className="result-subtitle">
                    {tours.length > 0 
                    ? 
                        <h3>Kết quả tìm kiếm cho 
                            {destination !== '' && <span> điểm đến: '{destination}'</span>} 
                            {start !== '' && <span> ngày khởi hành: '{start}'</span>}
                        </h3>
                    :
                        <h3>Không có kết quả tìm kiếm cho 
                            {destination !== '' && <span> điểm đến: '{destination}'</span>} 
                            {start !== '' && <span> ngày khởi hành: '{start}'</span>}
                        </h3> 
                    }
                    
                    <ListTour tours={tours}/>

                    {pages && <Pagination pageOffSet={pages}/>}
                </div>
            </div>
        </div>
    )
}