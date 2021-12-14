import API, { endpoints } from "./API"

class NewsApi {
    getAll = () => {
        return API.get(endpoints['news'])
    }

    getNewsRecent = () => {
        return API.get(endpoints['news'], {params: {limit: 9, odering: '-date_add'}})
    }

    getNewsDetail = (id) => {
        return API.get(`${endpoints['newsDetail']}${id}/`)
    }

    like = (id_news,id_user,token) => {
        return API.post(endpoints['like'], {news: id_news, user: id_user}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }

    dislike = (id,token) => {
        return API.delete(`${endpoints['like']}${id}/`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }

    postComment = (paramsValue,token) => {
        return API.post(endpoints['comment'],paramsValue, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }

    deleteComment = (id,token) => {
        return API.delete(`${endpoints['comment']}${id}/`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }
}

const newsApi = new NewsApi()
export default newsApi