import React, { useEffect, useRef, useState } from 'react'
import './NewsDetail.css'
import newsApi from '../../../APIController/NewsAPI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCommentDots, faShare, faCopy } from "@fortawesome/free-solid-svg-icons"
import Cookies from 'universal-cookie'
import ListComment from '../../ListCommentComponent/ListComment'
import { useSelector } from 'react-redux'
import ReviewForm from '../../ToursComponents/ReviewFormComponent/ReviewForm'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function NewsDetail({id}) {
    const [news,setNews] = useState({})
    const [like, setLike] = useState(false)
    const [reRender,setReRender]= useState(false)
    const [value, setValue] = useState(0)
    const link = useRef()
    const currentUser = useSelector(state => state.user)
    const cookies = new Cookies()

    useEffect(() => {
        const getDetail = async () => {
            const res = await newsApi.getNewsDetail(id)
            setNews(res)
            if(currentUser.isLoggedIn && res.all_like.find(({user}) => user.id === currentUser.user.id)) setLike(true)
            if(!currentUser.isLoggedIn) setLike(false)
        }

        getDetail()
    },[id,like,reRender,currentUser])

    const handleClick = async () => {
        if(like) {
            const id_like = news.all_like.find(({id,user}) => user.id === currentUser.user.id).id
            await newsApi.dislike(id_like,cookies.get('access_token'))
        }
        if(!like) await newsApi.like(id,currentUser.user.id,cookies.get('access_token'))
        setLike(prev => !prev)
    }

    const handleComment = () => {
        setReRender(prev => !prev)
    }

    const handleCopy = () => {
        link.current.select()
        document.execCommand('copy')
        toast.success("Đã copy đường dẫn vào bộ nhớ tạm.")
    }

    return (
        <div className="news-detail-section">
            <div className="news-detail-container">
                <div className="author-info">
                    {news.user && <div className="user-author-info">
                            <img src={news.user.avatar} alt={news.user.username} className="user-avatar-header"/>
                            <span className="icon">{news.user.username}</span>
                        </div>}
                    {news.date_add && <span>{news.date_add.split('-').reverse().join('-')}</span>}
                </div>

                <h1>{news.name}</h1>

                <div className="news-detail-content-section" dangerouslySetInnerHTML={{__html: news.content}}>
                </div>
                {
                    news.all_like &&
                        <h4 className="news-detail-like-info">
                        <FontAwesomeIcon icon={faHeart} className="icon"/> {
                            news.all_like.length > 0 
                            ? (like
                                ? (news.all_like.length > 1 
                                    ? `Bạn và ${news.all_like.length - 1} người khác thích bài viết này`
                                    : `Bạn thích bài viết này`)
                                : `${news.all_like.length} người thích bài viết này`)
                            : `Chưa có lượt thích nào, hãy là người đầu tiên`
                        }
                        </h4> 
                }
                {currentUser.isLoggedIn ? <div className="news-detail-like-comment-section">
                    <div className="like-comment-select">
                        <button 
                            className={`like-comment-btn ${like ? 'selected' : ''}`}
                            onClick={handleClick}
                        >
                            <FontAwesomeIcon icon={faHeart}/> Thích
                        </button>
                        <button className="like-comment-btn" onClick={() => setValue(1)}><FontAwesomeIcon icon={faCommentDots}/> Bình luận</button>
                        <button className="like-comment-btn" onClick={() => setValue(2)}><FontAwesomeIcon icon={faShare}/> Chia sẻ</button>
                    </div>
                    {value === 1 && 
                    <div className="like-comment-panel radius-10">
                        <div className="comment-user-form">
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
                            />
                        </div>
                        <ListComment 
                            comments={news.all_comment}
                            id_user={currentUser.isLoggedIn ? currentUser.user.id: 0}
                            token={cookies.get('access_token')}
                            callBack={handleComment}
                        />
                    </div>}

                    {value === 2 && 
                    <div className="like-comment-panel radius-10">
                        <div>Đường dẫn chia sẻ</div>
                        <div className="share-link radius-10" onClick={handleCopy}>
                            <input className="copy-btn" value={window.location.href} readOnly ref={link}/>
                            <div className="icon-copy"><FontAwesomeIcon icon={faCopy} /></div>
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
                    </div>}
                </div> 
                : <div className="require-login radius-10">
                    Bạn phải <a href="/login">đăng nhập</a> hoặc <a href="/register">đăng ký</a> để có thể bình luận
                </div>
                }
            </div>
        </div>
    )
}

export default NewsDetail