import React, {useEffect, useState} from 'react'
import { useHistory, useParams } from "react-router"
import './DetailTour.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMapMarkerAlt, faCar, faPlane, faShip, faCalendarAlt, faList, faClock } from "@fortawesome/free-solid-svg-icons"
import toursApi from '../../../APIController/ToursAPI'
import Carousel from 'react-multi-carousel'
import { formatDate } from '../../FormatDateComponent/FormatDate'
import ReviewForm from '../ReviewFormComponent/ReviewForm'
import { useSelector } from 'react-redux'
import Rating from '@mui/material/Rating'
import ListComment from '../../ListCommentComponent/ListComment'
import OrderTourForm from '../OrderTourFormComponent/OrderTourForm'
import Cookies from 'universal-cookie'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const ratingContext = React.createContext([])
const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      partialVisibilityGutter: 100 // this is needed to tell the amount of px that should be visible.
    }
}

function DetailTour() {
    const {id} = useParams()
    const [tour,setTour] = useState({})
    const [reRender,setReRender] = useState(false)
    const currentUser = useSelector((state) => state.user)
    const history = useHistory()
    const cookies = new Cookies()
    
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await toursApi.getDetail(id)
                const responseDetail = await toursApi.updateView({views: res.views + 1},id)
                setTour(responseDetail)
            } catch {
                history.push("/404")
            }
        }
        getData()
    },[id,reRender,history])

    const trafficList = tour.traffic ? tour.traffic.split(',').map((traff) => traff.trim()) : []

    const handleComment = () => {
        setReRender(prev => !prev)
    }

    return (
        <div className="tour-detail-section">
            <div className="title-page tour-detail-bg">
                <h2>Chi tiết Tour</h2>
            </div>

            <div className="container-center">
                <div className="tour-detail-container">
                    <div className="tour-detail-left radius-10">
                        <h3 className="tour-detail-name">{tour.name}</h3>
                        <div className="tour-detail-carousel-image">
                            {tour.all_image && <Carousel
                            responsive={responsive} 
                            autoPlaySpeed={5000}
                            autoPlay={true}
                            infinite={true}
                            itemClass="img-carousel"
                            >
                                {tour.all_image && tour.all_image.map((img,index) => (<img src={img.image} alt={tour.name} key={index}/>))}
                            </Carousel>}
                        </div>

                        <div className="tour-detail-info">
                            <span><FontAwesomeIcon icon={faMapMarkerAlt} className="tour-detail-icon"/> {tour.destination ? tour.destination.name : ''}</span>
                            <span><FontAwesomeIcon icon={faClock} className="tour-detail-icon"/> {tour.time}</span>
                            <span>Phương tiện :  
                                {trafficList.find((traffic) => traffic === 'Ô tô') && <div className="tour-detail-icon-traffic"><FontAwesomeIcon icon={faCar}/></div>}
                                {trafficList.find((traffic) => traffic === 'Máy bay') && <div className="tour-detail-icon-traffic"><FontAwesomeIcon icon={faPlane}/></div>}
                                {trafficList.find((traffic) => traffic === 'Tàu thủy') && <div className="tour-detail-icon"><FontAwesomeIcon icon={faShip}/></div>}
                            </span>
                            <span> <FontAwesomeIcon icon={faCalendarAlt} className="tour-detail-icon"/> Khởi hành: {tour.start_date && formatDate(tour.start_date)}</span>
                            <span><FontAwesomeIcon icon={faList} className="tour-detail-icon"/> Loại tour: {tour.category_tour ? tour.category_tour.name : ''}</span>
                        </div>

                        <div className="tour-detail-content"  dangerouslySetInnerHTML={{__html: tour.content}}></div>

                        <div className="tour-detail-rating-review">
                            <h2>Đánh giá và nhận xét</h2>
                            <div className="tour-detail-rating">
                                <h2>{tour.ratings > 0 ? `${tour.ratings}/5` : 'Chưa có đánh giá'}</h2>
                                {tour.ratings > 0 && <Rating name="read-only" value={tour.ratings} readOnly size="large" />}
                            </div>
                            {
                            currentUser.isLoggedIn 
                            ? <div className="tour-detail-review">
                                <div className="avatar-review">
                                    <img 
                                        src={currentUser.user.avatar_url}
                                        alt="user-avatar"
                                        className="user-avatar"
                                    />
                                </div>
                                <ReviewForm 
                                    id_user={currentUser.isLoggedIn ? currentUser.user.id: 0}
                                    id_tour={id}
                                    callBack={handleComment}
                                    token={cookies.get('access_token')}
                                    rating
                                />
                            </div>
                            : <div className="require-login radius-10">
                                Bạn phải <a href="/login">đăng nhập</a> hoặc <a href="/register">đăng ký</a> để có thể đánh giá Tour
                            </div>
                            }

                            <div className="tour-detail-user-review" >
                                <ListComment 
                                    comments={tour.all_rating} 
                                    id_user={currentUser.isLoggedIn ? currentUser.user.id: 0}
                                    token={cookies.get('access_token')}
                                    callBack={handleComment}
                                    rating
                                />
                            </div>
                        </div>
                    </div>

                    <div className="tour-detail-right">
                        <OrderTourForm 
                            name={tour.name}
                            price={tour.price}
                            price_child={tour.price_children}
                            loggedIn={currentUser.isLoggedIn}
                            user={currentUser.isLoggedIn ? currentUser.user.id: 0}
                            tour={id}
                            email={currentUser.isLoggedIn ? currentUser.user.email: ''}
                            user_name={currentUser.isLoggedIn ? currentUser.user.last_name: ''}
                            toast={toast}   
                        />
                    </div>
                </div>
            </div>
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
            />
        </div>
    )
}

export default DetailTour