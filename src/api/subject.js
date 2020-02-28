import axios from "axios";
import { getToken } from "./../utilis/token";
let subjectRequest = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})
// 添加请求拦截器
subjectRequest.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token = getToken();
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
export function subAdd(data) {
    return subjectRequest({
        url: '/subject/add',
        method: 'post',
        data
    })
}
export function subList(params) {
    return subjectRequest({
        url: '/subject/list',
        method: 'get',
        params
    })
}
export function subStatus(data) {
    return subjectRequest({
        url: '/subject/status',
        method: 'post',
        data
    })
}
export function subEdit(data) {
    return subjectRequest({
        url: '/subject/edit',
        method: 'post',
        data
    })
}
export function subRemove(data) {
    return subjectRequest({
        url: '/subject/remove',
        method: 'post',
        data
    })
}
export default subjectRequest
