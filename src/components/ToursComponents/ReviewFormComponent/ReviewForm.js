import React, {useState } from 'react'
import './ReviewForm.css'
import {useForm} from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import Rating from '@mui/material/Rating'
import toursApi from '../../../APIController/ToursAPI'
import newsApi from '../../../APIController/NewsAPI'


function ReviewForm(props) {
    const {register, handleSubmit, reset} = useForm()
    const [value,setValue] = useState(0)

    const onsubmit = async (data) => {
        if(props.rating) {
            const newData = value > 0 ? {...data,star: value,tour: props.id_tour,user: props.id_user} : {...data,tour: props.id_tour,user: props.id_user}
            await toursApi.postReview(newData,props.token)
        } else {
            const newData = {...data,news: props.id_tour,user: props.id_user}
            await newsApi.postComment(newData,props.token)
        }
        reset({
            content: '',
        })
        setValue(0)
        props.callBack()
    }

    return (
        <form onSubmit={handleSubmit(onsubmit)} className="review-form">
            <div className="review-form-container radius-10">
                <TextareaAutosize
                {...register('content', {required: true})} 
                className="review-form-input" 
                placeholder={props.rating ? "Nhập nhận xét..." : "Nhập bình luận..."}
                required
                />
           {props.rating && <div className="review-form-star-select">
                <Rating name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                        setValue(newValue);
                        }}
                />
            </div>}
            <input type="submit" id="submit-btn" className="radius-10" value="Gửi"/>
            </div>
        </form>
    );
}


export default ReviewForm