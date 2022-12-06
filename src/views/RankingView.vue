<template>
    <div class="ranking">
        <!--分享面板  -->
        <van-share-sheet
          v-model:show="showShare"
          title="立即分享给好友"
          :options="options"
          @select="onSelect"
        />
        <div @click="$router.go(-1)" class="back iconfont icon-zuojiantou"></div>
        <div class="nav_right">
            <router-link to="/car" custom v-slot="{ href,navigate, isActive }">
                <div :href="href" @click="navigate" :class="['left','iconfont','icon-gouwuche', isActive && 'router-link-active']"  style="font-size:20px;"></div>
            </router-link>
            <div class="left iconfont icon-fenxiang_2" style="margin-top:1px;margin-left:15px;" @click="showShare = true"></div>
        </div>
        <div class="nav" :style="{'opacity':backIconsLength>50?'1':'0'}">
            <h5>热销榜</h5>
        </div>
        <div class="background">
            <img class="auto-img" src="../assets/images/Hot.png" alt="">
        </div>
        <div class="rankingbox" v-for="(item,index) in rankList" :key="item.commodityId">
                
            <div class="shop">
                <div class="imgbox">
                    <img :src="item.currentSingleProduct.goodsImgs[0].imgUrl" alt="" class="auto-img">
                    <div class="icon"><i>{{index+1}}</i></div>
                </div>
                <div class="shop_content">
                    <div class="title">{{item.brandName}}{{item.name}}{{item.currentSingleProduct.value}}</div>
                    <div class="ticket_li">闭眼入</div>
                    <div class="shop_btm">
                        <div class="price">
                            <div class="new">
                                <span>￥</span>{{item.currentSingleProduct.price}}
                            </div>
                            <div class="old">
                                <span>￥</span>{{item.currentSingleProduct.originalPrice}}
                            </div>
                        </div>
                        <div class="buy" @click="godetail(item.commodityId)">去购买</div>
                    </div>
                </div>
            </div>
            <div class="describe">
                <div class="userinfo">
                    <div class="userimg">
                        <img :src="item.currentSingleProduct.goodsImgs[0].imgUrl" alt="" class="auto-img">
                    </div>
                    <div class="name">{{item.brandName}}:欢迎来选购</div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs,onMounted } from 'vue'
import { Toast } from 'vant';
import 'vant/es/toast/style';

export default {
    setup () {
       // 路由配置 获取vue-router对象
        let router = useRouter();

        let list=reactive({
            // 滚动距离
            backIconsLength:0,
            // 排行榜数组
            rankList:[],
            // 分享面板开关
            showShare:false,
            options:[
                    { name: '微信', icon: 'wechat' },
                    { name: '微博', icon: 'weibo' },
                    { name: '复制链接', icon: 'link' },
                    { name: '分享海报', icon: 'poster' },
                    { name: '二维码', icon: 'qrcode' },
                ]
        })

        const onSelect = (option) => {
          Toast(option.name + "分享成功");
          list.showShare = false;
        };

      
        // 跳转详情页数据
        let godetail = (id)=>{
            router.push({
                path:"/goodsdetails",
                query:{
                  id
                }
            })
        }
        // 滚动距离
         let scrollFun = ()=>{
            window.onscroll = ()=>{
              // 获取滚动高度
              list.backIconsLength = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
              console.log(list.backIconsLength);
            }
         }
        //  初始化
         let created = ()=>{
            if(window.localStorage.getItem("rankList")){
                
                list.rankList = JSON.parse(window.localStorage.getItem("rankList"));
                list.rankList = list.rankList.splice(0,10);
                console.log(list.rankList);
            }
         }
         created();

        // 注册一个回调函数，在组件挂载完成后执行
         onMounted(()=>{
              scrollFun();
         })
        return {
            ...toRefs(list),
            scrollFun,
            godetail,
            created,
            onSelect
        }
    }
}
</script>

<style lang="scss" scoped>
.ranking{
    .back{
        font-size: 24px;
        position: fixed;
        top: 12px;
        left: 12px;
        z-index: 100;
    }
    .nav_right{
        display: flex;
        position: fixed;
        z-index: 100;
        right: 12px;
        top: 12px;
        .left{
            font-size: 18px;
            width: 24px;

        }
    }
    .nav{
        width: 100%;
        box-sizing: border-box;
        min-width: 320px;
        max-width: 750px;
        position: fixed;
        top: 0;
        z-index: 1;
        padding: 14px 12px;
        height: 42px;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: all 0.3s linear;

        h5{
            font-size: 15px;
            text-align: center;
        }
        
    }
    .background{
        width: 100%;
        margin-top: -15px;
    }
    .null{
        width: 100%;
        height: 50px;
        background-color: #fff;
    }
    .rankingbox{
        padding: 0 15px;
        
        .shop{
            padding: 15px 0;
            display: flex;
            .imgbox{
                width: 110px;
                height: 110px;
                border-radius: 8px;
                overflow: hidden;
                position: relative;
                margin-right: 15px;
                .icon{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 25px;
                    height: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: bold;
                    color: #fff;
                    background-color: #ed7850;
                    border-bottom-right-radius: 5px;
                    border-top-left-radius: 5px;
                    i{
                        font-style: italic;
                    }
                }
            }
            .shop_content{
                flex: 1;
                width: 220px;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                .title{
                    font-size: 15px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .ticket_li{
                    background-color: #fcf2f3;
                    color: #ea4550;
                    border-radius: 15px;
                    width: 85px;
                    text-align: center;
                    height: 20px;
                    line-height: 20px;
                    // padding: 5px 25px;
                    font-size: 12px;
                }
                .shop_btm{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .price{
                        font-weight: bold;
                        display: flex;
                        .new{
                            font-size: 16px;
                            span{
                                font-size: 12px;
                            }
                        }
                        .old{
                            font-size: 13px;
                            margin-top: 2px;
                            color: #838383;
                            text-decoration: line-through;
                            span{
                                font-size: 13px;
                                margin-left: 5px;
                            }
                        }
                    }
                    .buy{
                        padding: 6px 15px;
                        border-radius: 15px;
                        background-color: #333333;
                        font-size: 12px;
                        color: #fff;
                    }
                }
            }
        }
        .describe{
            font-size: 12px;
            color: #838383;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
            .userinfo{
                position: relative;
                .userimg{
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right: 3px;
                    margin-top: -5px;
                    display: inline-block;
                    position: absolute;
                    top:2px
                }
                .name{
                    text-indent: 1.5em;
                    line-height: 15px;
                    overflow : hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2; 
                    -webkit-box-orient: vertical;
                }
            }
        
        }
    }
}
</style>