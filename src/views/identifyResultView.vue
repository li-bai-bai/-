<template>
    <div class="identifyResult">
         <!-- 头部 -->
        <van-sticky>
            <div class="top" @click="go">
                <span class="iconfont icon-zuojiantou" @click="$router.go(-1)"></span>
                <p class="dai">我的鉴别</p>
                <span class="iconfont icon-gerenzhongxin" @click="goto"></span>
            </div>
        </van-sticky>

        <!-- 内容 -->
        <div class="content" v-if="idenResult">
            <div class="item" v-for="(item,index) in idenResult" :key="index">
                <div class="leftitem">
                    <!-- <img src="../assets/img/shopDetail01.jpg" alt=""> -->
                    <img :src="item.image[0]" alt="">
                </div>
                <div class="rightitem">
                    <h1>1111</h1>
                    <div class="righbottom">
                        <span>鉴定贴编号:{{item.id}}</span>
                        <span>鉴定时间:{{time}}</span>
                    </div>
                <div class="image"><img src="../assets/img/tue.png" alt=""></div>
                </div>
            </div>
        </div> 
        <van-empty description="没有鉴别结果喔" v-if="!idenResult"/>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import {useRouter } from 'vue-router';
export default {
    setup() {
        let list = reactive({
            // 鉴定结果数组
            idenResult:null,
            time:null
        })
        let router = useRouter();

        let goto = ()=>{
            router.push({
                name:"myhome"
            })
        }
        let created = ()=>{
            if(window.localStorage.getItem("identResult")){
                list.idenResult = JSON.parse(window.localStorage.getItem("identResult"));
                // 时间戳切割
                let data = new Date(list.idenResult[0].id)
                let day = data.getDate();
                day = day<10?"0"+day : day;
                let m = data.getMonth() + 1 ;
                m = m<10 ? "0"+m : m;
                list.time = `${m}-${day}`;
            }
        }
        created();
        return {
            ...toRefs(list),
            goto
        }
    },
}
</script>

<style lang="scss" scoped>
.identifyResult{
    // 头部
     .top{
        height: 50px;
        padding: 0 13px;
        display: flex;
        background-color: #fff;
       justify-content: space-between;
       align-items: center;
       border-bottom: 1px solid #f7f7f7;
       .icon-zuojiantou{
        font-size: 24px;
       }
       .icon-gerenzhongxin{
            font-size: 20px;
            color: #000;
       }
       .dai{
        font-size: 18px;
        font-weight: bold;
       }
    }
    .content{
        margin-left: 8px;
        width: 367px;
        padding:15px 0 5px 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #f9f9f9;
        .item{
            display: flex;
            align-items: center;
            width: 100%;
            position: relative;
            .leftitem{
                width: 75px;
                height: 75px;
                overflow: hidden;
                img{
                    width: 100%;
                }
            }
            .rightitem{
                display: flex;
                flex: 1;
                flex-direction: column;
                justify-content: space-between;
                height: 75px;
                margin-left: 8px;
                h1{
                    font-size: 16px;
                    font-weight: bold;
                }
                .righbottom{
                    display: flex;
                    flex-direction: column;
                    font-size: 12px;
                    color: #bcbcc9;
                    line-height: 20px;
                }

                .image{
                    position: absolute;
                    top: -3px;
                    right: 0;
                    width: 75px;
                    height: 75px;
                    img{
                        width: 100%;
                    }
                }
            }
        }
    }
}
</style>