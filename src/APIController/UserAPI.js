import API, { endpoints } from "./API"
import queryString from 'query-string'

class UserApi {
    login = (username,password) => {
        let params = {
            username,
            password,
            "grant_type": "password",
            "client_id": 'MxHPOjOBQkhwj4S4NnIdTsMm0Ge2Utova6ppvN9M',
            "client_secret": 'MIrxJE8X1tJm8pSveIOlUc7nBjvV6eEiY4dEfn0xEoehJqqdeiOxWD77fObpp7Iysp0467AE9S8G0ux5TojPERrUKsH9Y94Cx4r6u21ohmcg6F71dfMEw8SzlQ0Q2j1X'
        }
        return API.post(endpoints['auth'], queryString.stringify(params), {headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          }})
    }

    register = (userInfo) => {
        return API.post(endpoints['register'], userInfo, {headers: {
            'Content-type': 'multipart/form-data'
        }})
    }

    getUserInfo = (id,token) => {
        return API.get(`${endpoints['users']}${id}/`, {headers: {
            "Authorization": `Bearer ${token}`
        }})
    }

    updateAvatar = (avatar,token,id) => {
        return API.patch(`${endpoints['users']}${id}/`, avatar, {headers: {
            'Content-type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }})
    }

    updateProfile = (data,token,id) => {
        return API.patch(`${endpoints['users']}${id}/`, data, {headers: {
            'Content-type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }})
    }

    changePassword = (data,token) => {
        return API.put(`${endpoints['changePassword']}`, data, {headers: {
            'Authorization': `Bearer ${token}`
        }})
    }

    getStatistical = (params,token) => {
        return API.get(endpoints['statistical'], {params: params, headers: {
            'Authorization': `Bearer ${token}`
        }})
    }
}

const userApi = new UserApi()
export default userApi