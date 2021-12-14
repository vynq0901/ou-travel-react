import axios from "axios";
import queryString from 'query-string'
import {BaseURL} from "./BaseURL"

export let endpoints = {
  users: "api/user/",
  register: "api/register/",
  auth: "auth/token/",
  tours: "api/tours/",
  news: "api/news/",
  newsDetail: "api/newsdetail/",
  search:"api/search/",
  category: "api/category/",
  location: "api/location/",
  tourDetail: "api/tourdetail/",
  rating: "api/rating/",
  orderTour: "api/order/",
  changePassword: "api/changepassword/",
  statistical: "api/statistical/",
  like:"api/like/",
  comment: "api/comment/",
  sendMail: "api/sendmail/"
}

const API = axios.create({
  baseURL: BaseURL,
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: params => queryString.stringify(params),
})

API.interceptors.response.use((response) => {
  if(response && response.data) return response.data

  return response
}, (error) => {

  throw error
})


export default API