import request from '../utilis/request'
export function userAdd(data) {
    return request({
        url: '/user/add',
        method: 'post',
        data
    })
}
export function userList(params) {
    return request({
        url: '/user/list',
        method: 'get',
        params
    })
}
export function userStatus(data) {
    return request({
        url: '/user/status',
        method: 'post',
        data
    })
}
export function userEdit(data) {
    return request({
        url: '/user/edit',
        method: 'post',
        data
    })
}
export function userRemove(data) {
    return request({
        url: '/user/remove',
        method: 'post',
        data
    })
}
