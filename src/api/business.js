import request from '../utilis/request'
export function busAdd(data) {
    return request({
        url: '/enterprise/add',
        method: 'post',
        data
    })
}
export function busList(params) {
    return request({
        url: '/enterprise/list',
        method: 'get',
        params
    })
}
export function busStatus(data) {
    return request({
        url: '/enterprise/status',
        method: 'post',
        data
    })
}
export function busEdit(data) {
    return request({
        url: '/enterprise/edit',
        method: 'post',
        data
    })
}
export function busRemove(data) {
    return request({
        url: '/enterprise/remove',
        method: 'post',
        data
    })
}
