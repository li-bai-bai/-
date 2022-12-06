<template>
    <div class="evaluate">
        <!-- 导航栏 -->
        <div class="nav">
            <div @click="$router.go(-1)" class="left iconfont icon-zuojiantou"></div>
            <h5>评价</h5>
            <p></p>
        </div>
        <div class="null"></div>
        <!-- 选项标签 -->
        <div class="ticket">
            <div @click="Tab(index)" :class='["ticket_li",{"con":index==i}]' v-for="(item,index) in ticket" :key="index">
                <h5>{{item}}</h5>
                <!-- <p>17</p> -->
            </div>
        </div>
        <div class="comment" v-if="newData().length">
            <div class="combox" v-for="item in newData()" :key="item.id">
                <!-- 用户信息 -->
                <div class="userinfo">
                    <div class="userimg">
                        <img :src="item.brandImg" alt="" class="auto-img">
                    </div>
                    <div class="info">
                        <div class="username">{{item.brandName}}</div>
                        <div class="com_state">
                            <div class="state">评价此商品超赞</div>
                            <van-rate v-model="item.rating" :count="5" :size="12" readonly/>
                            
                        </div>
                    </div>
                </div>
                <!-- 内容 -->
                <div class="content">
                    <div class="image">
                        <div v-for="(imgs,i) in item.imgData" :key="i" class="imgbox">
                            <img :src="imgs.content" alt="" >
                        </div>
                        
                    </div>
                    <div class="say">
                        <p>{{item.text}}</p>
                        <!-- <span>111</span> -->
                    </div>
                </div>
            </div>
        </div>  
        <!-- 空状态 -->
        <div class="noshop" v-if="!newData().length">
            <div class="icon iconfont icon-dingdan1"></div>
            <p>暂无评价</p>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs,onBeforeMount } from 'vue'
export default {
    setup () {
        let list=reactive({
            value:5,
            ticket:["全部","超赞","一般","不好"],
            i:0,//选项卡高亮
            commentData:[
                {
                    brandName:'xiaohongshu136****6879',
                    brandImg:"../assets/img/ia_600000071.jpg",
                    imgData:[
                        {
                            content:"https://other.weijianapp.com/artcloud-app-mgr-provider-user/20220106/04238cfa-af07-4a7d-af8f-8d46c1b00a1a.png",
                        },
                        {
                            content:"https://other.weijianapp.com/artcloud-app-mgr-provider-user/20220106/04238cfa-af07-4a7d-af8f-8d46c1b00a1a.png",
                        },
                        {
                            content:"https://other.weijianapp.com/artcloud-app-mgr-provider-user/20220106/efa412ec-41f2-4309-9b7e-9d7c7f5f8a1b.png"
                        }
                      
                    ],
                    id:9533,
                    rating:5,
                    text:"不错不错，非常好用，下次还要再来卖",
                },
                 {
                    brandName:'xiaohongshu177****2617',
                    brandImg:"../assets/img/ia_600000063.jpg",
                    imgData:[
                        {
                            content:"https://other.weijianapp.com/artcloud-app-mgr-provider-user/20220106/0c3dfe19-062f-4d58-9219-156ffa8d1f4e.png",
                        },
                        {
                            content:"https://other.weijianapp.com/artcloud-app-mgr-provider-user/20220106/efa412ec-41f2-4309-9b7e-9d7c7f5f8a1b.png",
                        }
                      
                      
                    ],
                    id:9534,
                    rating:3,
                    text:"一般般吧，这个价钱也就那样",
                },
                {
                    brandName:'xiaohongshu191****3312',
                    brandImg:"../assets/img/ia_600000067.jpg",
                    imgData:[
                        {
                            content:"https://other.weijianapp.com/artcloud-app-mgr-provider-user/20200527/c771bbef-ca0b-439e-b4c0-9ba4afc9191a.jpg",
                        },
                        {
                            content:"https://other.weijianapp.com/artcloud-app-mgr-provider-user/20220106/d49c0f4c-f7a9-4c4f-ad2f-802de4dbe148.png",
                        }
                      
                    ],
                    id:9533,
                    rating:4,
                    text:"感觉还行",
                }
            ],
        })
        // 选项卡
        let Tab=(index)=>{
            list.i=index;
        }


        onBeforeMount(()=>{
            getComment()
        })

        //或取评论
        let getComment = ()=>{
            if (window.localStorage.getItem("commentData")) {
                 let data = JSON.parse(window.localStorage.getItem("commentData"))
                 list.commentData.unshift(...data)
            }
        }

        let newData=()=>{
            return list.commentData.filter( item => {

                if (list.i==1) {
                    return item.rating >= 5
                }else if (list.i==2) {
                    return (item.rating >= 3&&item.rating < 5)
                }else if (list.i==3){
                    return item.rating < 3
                }else{
                    return item
                }

            })
        }

        return {
            ...toRefs(list),
            Tab,
            newData
        }
    }
}
</script>

<style lang="scss" scoped>
.evaluate{
    background-color: #f7f7f7;
    min-height: 100vh;
    height: 100%;
    .nav{
        width: 100%;
        box-sizing: border-box;
        min-width: 320px;
        max-width: 750px;
        position: fixed;
        top: 0;
        z-index: 999;
        padding: 14px 12px;
        height: 42px;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left{
            font-size: 24px;
        }
        h5{
            font-size: 15px;
        }
        p{
            font-size: 14px;
            width: 24px;
        }
    }
    .null{
        width: 100%;
        height: 50px;
        background-color: #fff;
    }
    .noshop{
        height: calc(100vh - 160px) ;
        font-size: 13px;
        color: #999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .icon{
            font-weight: 100;
            font-size: 60px;
            color: #ccc;
            margin-bottom: 30px;
        }
    }
    .ticket{
        display: flex;
        flex-wrap: wrap;
        padding: 0 11px;
        background-color: #fff;
        margin-bottom: 10px;
        .ticket_li{
            width: 82px;
            height: 42px;
            border-radius: 8px;
            font-size: 12px;
            display: flex; 
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #f4f4f4;
            color: #656565;
            margin-bottom: 8px;
            margin-right: 8px;
            &:nth-child(4n){
                margin-right: 0;
            }
            p{
                margin-top: 2px;
                transform: scale(0.9);
            }
        }
        .con{
            background-color: #fdf4f5;
            color: #df324e;
        }
    }
    .comment{
        padding: 0 4px;
        .combox{
            padding: 11px;
            border-radius: 8px;
            background-color: #fff;
            margin-bottom: 10px;
            .userinfo{
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                .userimg{
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right: 6px;
                }
                .info{
                    .username{font-size: 13px;}
                    .com_state{
                        display: flex;
                        align-items: center;
                        margin-top: 5px;
                        .state{
                            font-size: 12px;
                            // transform: scale(0.9);
                            color: #999;
                            margin-right: 6px;
                        }
                        .flower{
                            display: flex;
                            .icon{
                                font-size: 11px;
                                margin-right: 3px;
                                color: #ffd45b;
                            }
                        }
                    }
                }
            }
            .content{
                .image{
                    display: flex;
                    margin-bottom: 5px;
                    .imgbox{
                        width: 112px;
                        height: 112px;
                        border-radius: 8px;
                        overflow: hidden;
                        margin-right: 5px;
                        margin-bottom: 5px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        &:nth-child(3n){
                            margin-right: 0;
                        }
                        img{
                            width: 100%;
                        }
                    }
                }
                .say{
                    font-size: 13px;
                    p{
                        line-height: 20px;
                    overflow : hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    }
                    span{
                        display: inline-block;
                    }
                }
            }
        }
    }
}
</style>