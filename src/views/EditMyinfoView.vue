<template>
    <div class="Edit">
         <div class="nav">
            <div @click="$router.go(-1)" class="left iconfont icon-zuojiantou"></div>
            <h5>编辑资料</h5>
            <p style="width:24px;"></p>
        </div>
        <div class="null"></div>
        <div class="content">
            <div class="head">
                <div class="imgbox">
                    <img :src="img" alt="">
                </div>
                <van-uploader :after-read="afterRead">
                    <template #default>
                        <div class="add icon-jiahao iconfont">
                            
                        </div>
                    </template>
                </van-uploader>
            </div>
            <div class="box">
                <div class="title">名字</div>
                <input type="text" v-model="name">
            </div>
            <div class="box">
                <div class="title">用户号</div>
                <input type="text" v-model="user_id">
            </div>
            <div class="box">
                <div class="title">简介</div>
                <input type="text" v-model="introduce">
            </div>
            <!-- <div class="box">
                <div class="title">名字</div>
                <input type="text" v-model="">
            </div> -->
        </div>
            <div class="btn">
                <div class="btnbox" @click="edit">

                确认修改
                </div>
            </div>
    </div>
</template>

<script>
import { reactive,  toRefs } from "vue"
import { useRouter } from 'vue-router';
export default {
    setup () {
        let router = useRouter();
        const afterRead = (file) => {
            // 此时可以自行将文件上传至服务器
            console.log(file);
            list.img=file.content
        };
        let list=reactive({
            // 个人信息
            Myinfo:[],
            name:"",
            user_id:"",
            introduce:"",
            img:""
        })
        let created=()=>{
            //判断是否有个人信息
            if(window.localStorage.getItem("Myinfo")){
                list.Myinfo=JSON.parse(window.localStorage.getItem("Myinfo"))[0];
                list.name=list.Myinfo.name
                list.user_id=list.Myinfo.user_id
                list.introduce=list.Myinfo.introduce
                list.img=list.Myinfo.headimg
            }
        }
        created();
        
        let edit=()=>{
           list.Myinfo.name=list.name 
           list.Myinfo.user_id=list.user_id
           list.Myinfo.introduce=list.introduce
           list.Myinfo.headimg=list.img
           window.localStorage.setItem("Myinfo",JSON.stringify([list.Myinfo]));
           router.push("/myhome")
        }
        return {
            afterRead,
            edit,
            ...toRefs(list)
        }
    }
}
</script>

<style lang="scss" scoped>
.Edit{
     .nav {
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
    border-bottom: 1px solid #eee;
    .left {
      font-size: 24px;
    }
    h5 {
      font-size: 15px;
    }
    p {
      font-size: 14px;
    }
  }
  .null {
    width: 100%;
    height: 38px;
    border-bottom: 1px solid #ccc;
  }
  ::v-deep{
    
    .van-uploader__input-wrapper{
        width: 20px;
        height: 20px;
        left: -25px;
        top: 30px


    }
  }
  .add{
    width: 20px;
    height: 20px;
    background: #333;
    border-radius: 50%;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
  }
  .content{
    padding: 0 13px;
    .head{
        width: 100%;
        height: 141px;
        display: flex;
        justify-content: center;
        align-items: center;
        .imgbox{
            width: 75px;
            height: 75px;
            border-radius: 50%;
            overflow: hidden;
            box-shadow: 0 0 2px #ccc;
            margin-left: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
                width: 100%;
            }
        }
    }
    .box{
        height: 45px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        input{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 50%;
            border: 0;
            text-align: right;
            font-weight: bold;
        }
    }
  }
    .btn{
        padding: 0 13px;
        position: fixed;
        bottom: 20px;
        min-width: 320px;
        max-width: 750px;
        width: 100%;
        box-sizing: border-box;
       
        .btnbox{
            height: 45px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #FF2744;
            border-radius: 25px;
            color: #fff;
            font-size: 14px;
        }
    }
}
</style>