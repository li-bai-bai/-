<template>
    <div class="private">
        <div class="nav">
            <div @click="$router.go(-1)" class="left iconfont icon-zuojiantou"></div>
            <h5>{{name}}</h5>
            <div class="icon iconfont icon-gengduo"></div>
        </div>
        <div class="null"></div>
        <div class="toast">
            <div class="top">
                <div class="icon iconfont"></div>
                <div class="center">打个招呼吧~</div>
                <div class="icon iconfont">×</div>
            </div>
            <div class="btm">对方关注或回复你之前，最多只能发送1条消息</div>
        </div>
        <div class="now">刚刚</div>
        <!-- 对话框 -->
        <div class="content">
            <!-- <div class="info">
                <div class="userimg">
                    <img src="../assets/images/ia_2900000000.jpg" alt="" class="auto-img">
                </div>
                <div class="infobox">
                    嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻
                </div>
            </div> -->
            
            <div class="myinfo" v-for="(item,index) in info" :key="index">
                <div class="mybox">
                    {{item}}
                <div v-if="index!=0" class="icon iconfont icon-yk_gantanhao" style="color:red;"></div>
                </div>
                <div class="userimg">
                    <img :src="Myinfo.headimg" alt="" class="auto-img">
                </div>
            </div>
        </div>
        <div class="null_btm"></div>
        <!-- 发送框 -->
        <div class="cominp">
            <div class="inp_top">
                <input type="text" placeholder="说点什么吧~" v-model="Inpvalue">
                <div class="inp_r" @click="send">发送</div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast  } from 'vant';
import 'vant/es/toast/style';
import { reactive, toRefs } from '@vue/reactivity'
import { useRoute } from 'vue-router';
export default {
    setup () {
        let list = reactive({
            Inpvalue:"",
            Myinfo:[],
            info:[],
            name:""
        })
        let route = useRoute();
        let send = ()=>{
            if(!list.Inpvalue){
                Toast("请输入内容")
                return
            }
            
            list.info.push(list.Inpvalue)
            if(list.info.length>1){
                Toast("对方还没回复你哦~")
            }
            console.log(list.info);
            list.Inpvalue = ""
        }
        let created=()=>{
            list.name=route.query.id;
            //判断是否有个人信息
            if(window.localStorage.getItem("Myinfo")){
                list.Myinfo=JSON.parse(window.localStorage.getItem("Myinfo"))[0];
            }
        }
        created();
        return {
            send,
            ...toRefs(list)
        }
    }
}
</script>

<style lang="scss" scoped>
.private{
    background-color: #f6f6f6;
    height: 100%;
    min-height: 100vh;
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
    .null_btm{
        height: 53px;
    }
    .toast{
        padding: 10px 15px;
        margin: 0 12px;
        border-radius: 8px;
        background-color: #fff;
        font-size: 12px;
        color: #969696;
        .top{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;
            .icon{
                font-size: 21px;
                margin-top: -4px;
            }
        }
        .btm{
            }
            text-align: center;
    }
    .now{
        text-align: center;
        font-size: 12px;
        color: #969696;
        padding: 15px 0;
    }
    .userimg{
        width: 38px;
        height: 38px;
        border-radius: 50%;
        overflow: hidden;
    }
    .content{
        padding: 0 12px;
        font-size: 13px;
    }
    .info{
        display: flex;
        
        .infobox{
            flex: 1;
            padding: 12px;
            color: #000;
            background-color: #fff;
            border-radius: 8px;
            line-height: 20px;
            margin: 0 45px 20px 7px;
        }
        
    }
    .myinfo{
        display: flex;
        justify-content: flex-end;
        .mybox{
            position: relative;
            padding: 12px;
            color: #fff;
            background-color: #5187eb;
            border-radius: 8px;
            line-height: 20px;
            margin: 0 7px 20px 45px;
        }
        .icon{
            font-size: 24px;
            position: absolute;
            top: 50%;
            transform: translateY(-55%);
            left: -30px;
        }
    }
    .cominp{
        padding: 10px 6px 10px 13px;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        width: 100%;
        min-width: 320px;
        max-width: 750px;
        box-sizing: border-box;

        .inp_top{
            height: 33px;
            display: flex;
            input{
                height: 100%;
                flex:1;
                box-sizing: border-box;
                background-color: #f5f5f5;
                padding: 15px;
                font-size: 13px;
                border-radius: 20px;
                border: 0;
                outline: blue;
            }
            .inp_r{
                height: 100%;
                box-sizing: border-box;
                border-radius: 20px;
                background-color: #598be7;
                padding: 0 13px;
                font-size: 13px;
                color: #fff;
                line-height: 33px;
                margin-left: 8px;
            }
        }
    }
}
</style>