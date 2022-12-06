import request from './http'
export function getReply(params) {
    return request({
        url: "/api.php",
        method: "get",
        params,
    })
}