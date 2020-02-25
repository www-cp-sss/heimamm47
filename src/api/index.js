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
// 添加请求拦截器
indexRequest.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token = getToken();
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
export function layout(){
    return indexRequest({
        url:'/logout',
        method:'get', 
    })
}
export default indexRequest