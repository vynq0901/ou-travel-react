import API, { endpoints } from "./API"

class ToursApi {
    getAllTours = (paramsValue) => {
        return API.get(endpoints['tours'], {params: paramsValue})
    }

    getNewTours = () => {
        return API.get(endpoints['tours'],{params: {limit: 6, ordering: '-date_add'}})
    }

    searchTours = (destination,start,limit,offset) => {
        let paramsValue = {
            destination__name__icontains:destination,
            start_date__iexact:start,
            limit,
            offset
        }

        return API.get(endpoints['tours'], {params: paramsValue})
    }

    getType = (type) => {
        return API.get(endpoints[type])
    }

    getDetail = (id) => {
        return API.get(`${endpoints['tourDetail']}${id}/`)
    }

    updateView = (paramsValue,id) => {
        return API.patch(`${endpoints['tourDetail']}${id}/`,paramsValue)
    }

    postReview = (paramsValue,token) => {
        return API.post(endpoints['rating'],paramsValue, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }

    orderTour = (paramsValue,token) => {
        return API.post(endpoints['orderTour'],paramsValue, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }

    deleteReview = (id,token) => {
        return API.delete(`${endpoints['rating']}${id}/`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }

    sendEmail = (data,token) => {
        return API.post(endpoints['sendMail'], data)
    }

}

const toursApi = new ToursApi()
export default toursApi