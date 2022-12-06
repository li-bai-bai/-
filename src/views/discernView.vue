<template>
    <div class="discern">
        <van-loading type="spinner" class="loading" v-show="pageLoading" />
         <!-- 头部 -->
        <van-sticky>
            <div class="top">
                <span class="iconfont icon-zuojiantou" @click="$router.go(-1)"></span>
                <p class="choice">在线鉴别</p>
                <span class="iconfont icon-gerenzhongxin" @click="goto('myhome')"></span>
            </div>
        </van-sticky>
        <!-- 搜索框 -->
        <van-sticky offset-top="50" >
            <div class="search_inp">
                <div class="inp">
                    <span class="iconfont icon-sousuo"></span>
                    <input type="text" v-model="title" placeholder="搜索品牌、系列、产品名称" @keyup.enter="search">
                </div>
            </div>
        </van-sticky>
        <!-- 品牌内容 -->
        <div class="content" v-if="!pageLoading">
            <div class="item" v-for="item in search()" :key="item.id">
                <div class="leftitem">
                    <img :src="item.image" alt="">
                    <span>{{item.name}}</span>
                </div>
                <div class="rightitem iconfont icon-youjiantou" @click="goIden(item.name)"></div>
            </div>
        </div>

        <van-empty description="请输入合适的搜索结果"  v-if="!search().length && !pageLoading"/>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import {useRouter } from 'vue-router';
import { getBrandDis } from '../api/shopping.js'
// import { Toast } from 'vant';
import 'vant/es/toast/style';

export default {
    setup() {
        // 声明变量
        let list = reactive({
            title:"",
            // 品牌数据
            brandList:[],
            // 加载按钮开关
            pageLoading:true,
        })
        // 声明路由参数
        let router = useRouter();
        // 搜索品牌
        let search = ()=>{
            // if(list.title == ""){
            //     Toast("请输入正确的搜索内容")
            //     return
            // }

            return list.brandList.filter(item => item.name.includes(list.title))

        }
        // 获取页面品牌数据
        let getBrandDisFun = ()=>{
            getBrandDis().then(data =>{
                // 品牌数据 
                list.brandList = data.brand,
                // 关闭加载按钮
                list.pageLoading = false

                // 品牌数据持久化
                window.localStorage.setItem("brandList",JSON.stringify(list.brandList));
            })
        }
        getBrandDisFun();

        // 跳转正在鉴别页
        let goIden = (brandName)=>{

            router.push({
                name:"identing",
                query:{
                    name:brandName
                }
            })
        }

        // 跳转路由
        let  goto = (path)=>{
            
            router.push({
                name:path
            })
        }

        return {
            ...toRefs(list),
            goto,
            goIden,
            search
        }
    },
}
</script>

<style lang="scss" scoped>
.loading{
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translateX(-50%)translateY(-50%);
}
.discern{
    min-width: 375px;
    max-width: 750px;
    width: 100%;
    box-sizing: border-box;
    min-height: 100%;
    .top{
        height: 50px;
        padding: 0 13px;
        display: flex;
        background-color: #fff;
       justify-content: space-between;
       align-items: center;
       .icon-zuojiantou{
            font-size: 26px;
            color: #000;
       }
       .choice{
        font-size: 18px;
        font-weight: bold;
       }
       .icon-gerenzhongxin{
            font-size: 20px;
            color: #000;
       }
    }
     .search_inp{
        display: flex;
        padding: 0 14px;
        justify-content: space-between;
        height: 58px;
        align-items: center;
        background-color: #fff;
        .inp{
            display: flex;
            height: 32px;
            background-color: #f4f3f8;
            border-radius: 4px;
            align-items: center;
            width: 100%;
            input{
                border: none;
                background-color: #f4f3f8;
                flex: 1;
            }
                input::-webkit-input-placeholder{
                    font-size: 12px;
                    color: #8f8f91;
                }
            .icon-sousuo{
                margin-left: 12px;
                margin-right: 10px;
                font-size: 20px;
                color: #8f8f91;
            }
        }
        .out{
            color: #000000;
            font-size: 16px;
        }
    }
    .content{
        padding: 0 13px;
        margin-top: 10px;
        padding-bottom: 10px;
        .item{
            display: flex;
            align-items: center;
            justify-content: space-between;
            // height: 30px;
            margin-bottom: 25px;

            .leftitem{
                font-size: 16px;
                display: flex;
                align-items: center;
                img{
                    width: 35px;
                    // height: 30px;
                }
                span{
                    margin-left: 10px;
                }
            }


            .rightitem{
                font-size: 20px;
                color: rgb(145, 144, 144);
            }
        }
    }
}

</style>