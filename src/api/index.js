import request from '../utilis/request'
export function info() {
    return request({
        url: '/info',
    })
}
export function layout() {
    return request({
        url: '/logout',
        method: 'get',
    })
}