import request from "./http";

// 获取购物界面商品列表数据
export function getShopProduct(){
    return request({
        // url:"/xiaohongshu/shopping",
        url:"/xiaohongshu/shopList",
        method:"get",
    })
}

//获取购物界面分类数据
export function getAllSort(){
    return request({
        // url:"/xiaohongshu/shopping",
        url:"/xiaohongshu/Allsort",
        method:"get",
    })
}

// 获取鉴定师信息
export function getDiscriminator(){
    return request({
        // url:"/xiaohongshu/shopping",
        url:"/xiaohongshu/Discriminator",
        method:"get",
    })
}

// 获取鉴定品牌信息
export function getBrandDis(){
    return request({
        url:"/xiaohongshu/brandDis",
        method:"get",
    })
}

// 获取购物界面分类商品详情数据
export function getAllSortDetail(){
    return request({
        // url:"/xiaohongshu/shopping",
        url:"./json/nav_comm.json",
        method:"get",
    })
}

// 获取购物商品详情数据
export function getGoodDetail(){
    return request({
        // url:"/xiaohongshu/shopping",
        url:"./json/shop.json",
        method:"get",
    })
}

// 获取购物界面轮播图数据
export function getShop(){
    return request({
        // url:"/xiaohongshu/shopping",
        url:"./json/shopImage.json",
        method:"get",
    })
}