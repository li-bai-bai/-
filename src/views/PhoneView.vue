<template>
    <div class="phone">
        <div class="nav">
            <div @click="$router.go(-1)" class="left iconfont icon-zuojiantou"></div>
            <h5></h5>
            <div class="icon iconfont icon-gengduo"></div>
        </div>
        <div class="null"></div>
        <div class="inpbox">
            <h2>登录后更精彩</h2>
            <div class="inpcontent">
                <h3 style="font-size:18px;color:#797979;letter-spacing: 1px;">+86</h3>
                <input type="text" placeholder="请输入手机号" v-model="phone">
            </div>
            <div class="line"></div>    
            <div class="inpcontent">
                <input type="text" maxlength="6" placeholder="请输入验证码" v-model="code" style="width:40%;">
                <div class="code">
                    <div class="obtain" @click="getCode">获取验证码</div>
                    <!-- <div class="send">重新发送(59s)</div> -->
                </div>
            </div>
            <div class="line"></div>
            <div class="foot">
            <div class="icon iconfont" style="margin-top:1px;" v-show="flag" @click="flagClick"></div>
            <div class="icon iconfont icon-gou1" style="border:0;font-size:14px;color:#e30009;margin-right:7px" v-show="!flag" @click="flagClick"></div>
            <p><span>我已阅读并同意</span>《用户协议》 《隐私协议》 《儿童/青少年个人信息保护规则》</p>
        </div>
            <div class="phonelogin" v-show="show" @click="submit"> 
                <p>登录</p>
            </div>
            <div class="phonelogin" style="background-color:#e30009;" v-show="!show"  @click="submit">
                <p>登录</p>
            </div>
        </div>
        
        <h5>登录遇到问题?</h5>
        <div class="btm">
            <h4>- 其他方式登录 -</h4>
            <div class="box">
                <div @click="style" class="icon iconfont icon-weixin1" style="color:#57c06f;"></div>
                <div @click="style" class="icon iconfont icon-QQ-circle-fill" style="font-size:40px;color:#30a5dd;"></div>
                <div @click="style" class="icon iconfont icon-weibo" style="color:#ea5d5c;"></div>
                <div @click="style" class="icon iconfont icon-pingguo" style="font-size:22px;width:38px;height:38px;padding-bottom: 3px;"></div>
            </div>
        </div>
        
    </div>  
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useRouter } from 'vue-router';
import {Toast} from "vant";
import 'vant/es/toast/style';
export default {
    setup () {
        let router  = useRouter();
        let list = reactive({
            // 协议按钮
            flag:true,
            // 登录显示按钮
            show:true,
            // 手机号
            phone:"",
            // 验证码
            code:"",
            // 存储验证码
            setCode:""
        })
        //获取手机验证码
        let getCode = ()=>{
             // 1.验证手机号码
            let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

            if(!reg.test(list.phone)){ //不正确处理
                Toast.fail('手机号码错误');
                return;
            }

            // 成功就发送验证码
            let number = "";
            for(let i =0;i<6;i++){
                number += parseInt(Math.random()*6)
            }
            Toast(number);
            // 存储验证码
            list.setCode = number;

            list.code = ""
            
        } 
        // 显示登录按钮
        let flagClick = ()=>{
            list.flag = !list.flag;
            if(list.phone != "" && list.code != "" && !list.flag){
                list.show = false
            }else{
                list.show = true
            }
        }
        // 进行登录
        let submit = ()=>{
            if(list.flag){
                Toast("请勾选协议");
                return
            }
            if(list.phone == "" || list.code == ""){
                Toast("请填写正确的手机号码");
                return
            }

            let number = /^[0-9]{6}$/;
            if(!number.test(list.code) || list.code != list.setCode){
                Toast.fail("请输入正确的手机验证码");
                return;
            }

            Toast.success('登录成功');
            // 登录注册用户
            window.localStorage.setItem("tokenXiao",list.phone);
            router.push({
                name:"home"
            })
        }
        // 其他方式登录
        let style = ()=>{
            Toast("没有此App喔")
        }
        return {
            ...toRefs(list),
            style,
            getCode,
            flagClick,
            submit
        }
    }
}
</script>

<style lang="scss" scoped>
.phone{
    
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
        margin-bottom: 10px;
        .left{
            font-size: 24px;
        }
        h5{
            font-size: 15px;
        }
        p{
            font-size: 14px;
        }
    }
    .null{
        width: 100%;
        height: 50px;
    }
    .phonelogin{
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        border-radius: 25px;
        background-color: rgb(219, 219, 219);
        color: #fff;
        margin-bottom: 20px;
    }
    .btm{
        position: fixed;
        bottom: 65px;
        width: 100%;
        min-width: 320px;
        max-width: 750px;
    }
    .box{
        display: flex;
        justify-content: space-evenly;
        .icon{
            width: 35px;
            height: 35px;
            font-size: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            border-radius: 50%;
            border: 2px solid #eee;
        }
    }
    .inpbox{
        padding: 0 45px;
        input{
            width: 100%;
            box-sizing: border-box;
            // margin-bottom: 10px;
            border: 0;
            font-size: 18px;

            &::-webkit-input-placeholder{
                color: #ccc;
                font-size: 15px;
            }
        }
        .line{
            margin-bottom: 20px;
            width: 100%;
            height: 2px;
            background-color: #f7f7f7;
        }
        .inpcontent{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            h3{
                margin-right: 10px;
            }
            .code{
                display: flex;
                font-size: 12px;
                .obtain{
                    color: #3089d2;
                }
                .send{
                    color: #a3a3a3;
                }
            }
        }
    }
    h2{
        text-align: center;
        font-size: 18px;
        padding: 35px 0;
    }
    h5,h4{
        font-size: 12px;
        text-align: center;
    }
    h5{
        color: #3089d2;
    }
    h4{
        color: #d9d9d9;
        font-size: 14px;
        margin-bottom: 35px;
    }
    .foot{
        margin: 25px 0;
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
}
</style>