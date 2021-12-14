import React, { useState } from 'react'
import './ListComment.css'
import { Rating } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from "@fortawesome/free-solid-svg-icons"
import toursApi from '../../APIController/ToursAPI'
import newsApi from '../../APIController/NewsAPI'

function ListComment({comments,id_user,token,callBack,rating}) {
    const [remove,setRemove] = useState(false)
    const [idReview,setIdReview] = useState()

    const permission = {
        manager: 'Quản Lý',
        staff: 'Nhân viên',
        admin: 'Quản trị viên'
    }

    const handleRemove = async () => {
        if(rating) await toursApi.deleteReview(idReview,token)
        else await newsApi.deleteComment(idReview,token)
        setRemove(false)
        callBack()
    }

    return (
        <div className="list-comment-section">
            {
                comments && comments.map(((cmt,index) => (
                    <div className="comment-item" key={index}>
                        <img src={cmt.user.avatar} className="user-avatar" alt="user-avatar" />
                        <div className="comment-content radius-10">
                            <div className="comment-content-user">
                                <div className="comment-content-user-info">
                                    <div className="comment-content-user-name">{cmt.user.last_name}</div>
                                    <div className="comment-user-permiss">
                                        <FontAwesomeIcon icon={faUser} /> {cmt.user.groups.length === 0 ? 'Khách hàng' : permission[cmt.user.groups[0].name]}
                                    </div>
                                </div>
                                {cmt.user.id === id_user && (<div className="comment-content-edit-remove">
                                    <div 
                                        className="comment-content-remove-btn"
                                        onClick={()=> {
                                                    setRemove(true) 
                                                    setIdReview(cmt.id)
                                        }}
                                    >Xóa</div>
                                </div>)}
                            </div>
                            {rating && <div className="comment-content-rating">
                                <Rating name="read-only" value={cmt.star} readOnly/>
                            </div>}
                            <div className="comment-content-text">
                                <span>{cmt.content}</span>
                            </div>
                            <div className="comment-content-date">
                                <span>{cmt.date_add}
                                </span>
                            </div>
                        </div>
                    </div>
                )))
            }
            {remove && 
                <div className="noti-overlay">
                    <div className="comment-remove-alert radius-10">
                        <h4>Bạn có chắc muốn xoá {rating ? 'đánh giá' : 'bình luận'} này ?</h4>
                        <button 
                            className="comment-alert-remove radius-10"
                            onClick={handleRemove}
                        >
                            Xóa
                        </button>
                        <button 
                            className="comment-alert-back radius-10"
                            onClick={() => setRemove(false)}
                        >
                            Quay lại
                        </button>
                    </div>
                </div>}
        </div>
    );
}

export default ListComment