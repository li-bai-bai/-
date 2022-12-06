<template>
    <div class="login">
        <div class="logo" @click="$router.go(-1)">
            <img src="../assets/img/logo.png" alt="" class="auto-img">
        </div>
        <div class="loginbox">
            <div class="wxlogin">
                <div class="icon iconfont icon-weixin" @click="wexin"></div>
                <p>微信登录</p>
            </div>
            <div class="phonelogin" @click="phone">
                <div class="icon iconfont icon-shouji" style="margin-top:1px;"></div>
                <p>手机号登录</p>
            </div>
            <div class="more" @click="show=!show">
                <p>其他方式登录</p>  
                <div class="icon iconfont icon-youjiantou"></div>
            </div>
            <div class="foot">
                <div class="icon iconfont" style="margin-top:2px;" v-show="flag1" @click="flag1 = !flag1"></div>
                <div class="icon iconfont icon-gou1" style="border:0;font-size:14px;color:#e30009;margin-right:7px"  v-show="!flag1" @click="flag1 = !flag1"></div>
                <p><span>我已阅读并同意</span>《用户协议》 《隐私协议》 《儿童/青少年个人信息保护规则》</p>
            </div>
        </div>
        <van-popup
            v-model:show="show"
            closeable
            round
            close-icon-position="top-right"
            position="bottom"
        >
            <div class="title">
                选择登录方式
            </div>
            <div class="iconbox">
                <div class="icon iconfont icon-QQ-circle-fill" style="font-size:40px;color:#30a5dd;" @click="qq"></div>
                <div class="icon iconfont icon-weibo" style="color:#ea5d5c;" @click="qq"></div>
                <div class="icon iconfont icon-pingguo" style="font-size:22px;width:38px;height:38px;padding-bottom: 3px;" @click="qq"></div>
            </div>
            <div class="foot" style="margin:20px 45px 30px;">
                <div class="icon iconfont" style="margin-top:1px;" v-show="flag2" @click="flag2 = !flag2"></div>
                <div class="icon iconfont icon-gou1" style="border:0;font-size:14px;color:#e30009;margin-right:7px" v-show="!flag2" @click="flag2 = !flag2"></div>
                <p><span>我已阅读并同意</span>《用户协议》 《隐私协议》 《儿童/青少年个人信息保护规则》</p>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import {Toast} from "vant";
import 'vant/es/toast/style';
export default {
    setup () {
        let router=useRouter();
        let obj=reactive({
            show:false,
            // 选择协议
            flag1:true,
            flag2:true
        })
        // 选择微信
        let wexin = ()=>{
            Toast("没有此App喔")
        }
        // 手机登录
        let phone =()=>{
            if(obj.flag1){
                Toast("请先勾选协议喔");
                return
            }
            console.log(111);
            router.push("/phone");

        }
        // qq登录
        let qq = ()=>{
            if(obj.flag2){
                Toast("请先勾选协议喔");
                return
            }

            Toast("没有此App喔")
        }
        return {
            ...toRefs(obj),
            phone,
            wexin,
            qq
        }
    }
}
</script>

<style lang="scss" scoped>
.login{

    .logo{
        width: 143px;
        height: 76px;
        margin: 0 auto;
        padding-top: 120px;
    }
    .loginbox{
        padding: 0 45px;
        width: 100%;
        min-width: 285px;
        max-width: 750px;
        box-sizing: border-box;
        position: fixed;
        bottom: 65px;
    }
    .wxlogin{
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        border-radius: 25px;
        background-color: #58be6b;
        color: #fff;
        margin-bottom: 15px;
        .icon{
            width: 16px;
            height: 16px;
            font-size: 16px;
            margin-right: 5px;
        }
    }
    .phonelogin{
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        border-radius: 25px;
        background-color: #f7f7f7;
        color: black;
        margin-bottom: 15px;
        .icon{
            width: 16px;
            height: 16px;
            font-size: 16px;
            margin-right: 5px;
        }
    }
    .more{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        height: 12px;
        color: #3089d2;
        margin-left: 12px;
    }
    .title{
        padding: 18px;
        font-size: 13px;
        text-align: center;
        border-bottom: 1px solid #eee;
    }
    .iconbox{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        padding: 25px 35px;
        .icon{
            width: 35px;
            height: 35px;
            font-size: 35px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            box-sizing: border-box;
            border: 2px solid #eee;
        }
    }
    .foot{
        margin-top: 85px;
        font-size: 12px;
        display: flex;
        line-height: 20px;
        .icon{
            width: 12px;
            height: 12px;
            border: 1px solid #ccc;
            font-size: 12px;
            border-radius: 50%;
            margin-top: -1px;
            margin-right: 5px;
        }

        p{
            flex: 1;
            color: #3089d2;
            span{
                color: #a3a3a3;
            }
        }
    }
    :deep{
         .van-badge__wrapper{
            font-size: 18px;
            margin-top: 1px;
        }
    }
}
</style>