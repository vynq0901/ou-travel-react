import React, { memo, useEffect, useState } from "react"
import './Pagination.css'

function Pagination({pageOffSet}) {
    const [listPage, setListPage] = useState([])
    
    const activeStyle = {
        background: "#2f7af8",
        color: "#fff",
        border: "1px solid #2f7af8"
    }

    const handleNextPage = () => {
        if(pageOffSet.currentPage < pageOffSet.total) {
            pageOffSet.paginate(pageOffSet.offset + pageOffSet.limit)
            window.scrollTo({
                top:0,
            })
        }
        
    }

    const handlePrevPage = () => {
        if(pageOffSet.currentPage > 1) {
            pageOffSet.paginate(pageOffSet.offset - pageOffSet.limit)
            window.scrollTo({
                top:0,
            })
        }
    }

    const handleClick = (pageNumber) => {
        pageOffSet.paginate(pageNumber)
        window.scrollTo({
            top:0,
        })
    } 

    useEffect(() => {
        let list = []
        for(let i = 1; i <= pageOffSet.total; i++) list.push(i)
        setListPage(list)
    }, [pageOffSet])

    return (
        <div className="pagination-section">
            <p className="page-btn nav-btn radius-left-10" onClick={handlePrevPage}>&lt;</p>
            {
                listPage.map((page) => (
                    pageOffSet.currentPage === Number.parseInt(page) 
                    ? <p className="page-btn" style={activeStyle} key={page}>{page}</p>
                    : <p 
                        className="page-btn" 
                        onClick={() => handleClick((Number.parseInt(page) - 1) * pageOffSet.limit)} 
                        key={page}>{page}
                    </p>
                ))
            }
            <p className="page-btn nav-btn radius-right-10" onClick={handleNextPage}>&gt;</p>
        </div>
    )
}

export default memo(Pagination)