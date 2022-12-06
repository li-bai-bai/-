import request from "./http";

// 获取首页推荐笔记数据
// http://192.168.44.14:3000
export function getHomefeed(){
    return request({
        url:"/xiaohongshu/homefeed2",
        method:"get",
    })
}
// 获取首页美妆笔记数据
export function getHomeMakeup(){
    return request({
        url:"/xiaohongshu/homeMakeup",
        method:"get",
    })
}

// 获取首页最新笔记数据
export function getHomeNew(){
    return request({
        url:"/xiaohongshu/homeNew",
        method:"get",
    })
}

// 获取首页 笔记 推荐笔记详情页数据
export function getArticleDetail(){
    return request({
        url:"./json/details.json",
        method:"get",
    })
}

// 获取首页 笔记 美妆笔记，最新笔记详情页数据
export function getArticleDetailMore(){
    return request({
        url:"./json/alldetails.json",
        method:"get",
    })
}


// 获取首页 笔记 美妆推荐最新详情页的数据
// alldetails
export function getAlldetails(){
    return request({
        url:"./json/alldetails.json",
        method:"get",
    })
}

// 获取首页图片数据
export function getHomeImage(){
    return request({
        url:"./json/homeImage.json",
        method:"get",
    })
}