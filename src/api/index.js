import axios from "axios"
import { getToken } from "./../utilis/token"
let indexRequest = axios.create({
    baseURL:process.env.VUE_APP_URL,
    headers :{
        token: getToken()
    },
    withCredentials: true
})
export function info() {
    return indexRequest({
        url:'/info',
    })
}

export function layout(){
    return indexRequest({
        url:'/logout',
        method:'get', 
    })
}