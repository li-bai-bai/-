<template>
    <div class="release">
        <div class="nav">
            <div @click="$router.go(-1)" class="left iconfont icon-zuojiantou"></div>
            <h5>发布笔记</h5>
            <div @click="ToastFun" class="left iconfont icon-yk_gantanhao"></div>
        </div>
        <div class="null"></div>
        <div class="mainbox">
            <div class="top">
                <van-uploader v-model="fileList" multiple :max-count="1" :after-read="afterRead"/>
            </div>
            <input class="title" type="text" v-model="titlevalue" placeholder="填写标题会有更多赞哦~">
            <div class="line"></div>
            <textarea placeholder="添加正文" v-model="contentvalue"></textarea>
            <div class="ticket">
                <!-- <div class="lit_title"># 话题</div>
                <div class="lit_title"># 话题</div> -->
            </div>
            <div class="line"></div>
            <!-- <div class="place">
                <div class="top">
                    <div class="place_l">
                        <div class="icon iconfont icon-dizhi1"></div>
                        <p>添加地点</p>
                    </div>
                    <div class="place_r">
                        <div class="place_ticket">标记位置让更多人看到</div>
                        <div class="icon iconfont icon-youjiantou"></div>
                    </div>
                </div>
                <div class="ticketbox">
                    <div class="ticketlit">粤嵌科技(从化园区)</div>
                    <div class="ticketlit">粤嵌科技(从化园区)</div>
                </div>
            </div>
            <div class="line"></div> -->
            <div class="save">
                <p></p>
                <div class="box" @click="saveFun">
                    <div class="icon iconfont icon-gou1" v-show="save"></div>
                    <div class="icon iconfont " v-show="!save" style="border:1px solid #ccc;"></div>
                    <p>保存到相册</p>
                </div>
            </div>
        </div>
            <div class="foot_btm">
                <div class="save_draft" @click="save_box">
                    <div class="icon iconfont icon-caogaoxiang"></div>
                    <p>存草稿</p>
                </div>
                <div class="submit" @click="submit">
                    发布笔记
                </div>
            </div>
        
    </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue';
import { Dialog,Toast  } from 'vant';
import 'vant/es/dialog/style';
import 'vant/es/toast/style';
import { useRoute, useRouter } from 'vue-router';
export default {
    setup () {
        let route =useRoute();
        let router = useRouter();
        const fileList = ref([
            //   { url: '' },
            // Uploader 根据文件后缀来判断是否为图片文件
            // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
            //   { url: 'https://cloud-image', isImage: true },
        ]);
        const afterRead = (file) => {
            // 此时可以自行将文件上传至服务器
            console.log(file);
            list.Img=file.content;
        };
        let list=reactive({
            // 所有详情页数据
            Alldata:[],
            // 保存到相册显示隐藏
            save:true,
            // 输入框标题
            titlevalue:"",
            // 正文内容
            contentvalue:"",
            // 发布图片
            Img:"",
            // 个人信息
            Myinfo:[],
            // 草稿箱
            savebox:[],
            // 草稿箱数据
            savedata:[]
        })
        let created = ()=>{
            //判断是否有详情页数据
            if(window.localStorage.getItem("articleDetails")){
                list.Alldata=JSON.parse(window.localStorage.getItem("articleDetails"));
            }

            //判断是否有详情页数据
            if(window.localStorage.getItem("Myinfo")){
                list.Myinfo=JSON.parse(window.localStorage.getItem("Myinfo"))[0];
            }
           
            let id =route.query.id;
            if(window.localStorage.getItem("save_box") && id !==undefined){
                list.savedata=JSON.parse(window.localStorage.getItem("save_box"));
                console.log(list.savedata);
                
                console.log(id);
                let index=list.savedata.findIndex(item=>item.id==id);
                fileList.value = [{
                    url:list.savedata[index].img,
                    isImage: true 
                }]
                // 草稿箱预览图 
                list.Img=list.savedata[index].img
                list.titlevalue=list.savedata[index].title;
                list.contentvalue=list.savedata[index].content;
                console.log(index);
            }
             // 判断是否有草稿箱数据
            if(window.localStorage.getItem("save_box")){
                list.savedata = JSON.parse(window.localStorage.getItem("save_box"));
                console.log(list.savedata,"caogao ");
            }
        }
        created();
        // 注意事项弹窗
        let ToastFun = ()=>{
            Dialog.alert({
                title: '注意事项',
                message: '请友好发言否则将无法发布哦~',
                }).then(() => {
                // on close
            });
        }
        // 保存到相册提示
        let saveFun=()=>{
            list.save=!list.save;
            if(list.save){
                Toast('保存到相册');
            }else if(!list.save){
                Toast('取消保存');
            }
        }
        // 发布笔记
        let submit = ()=>{
            let id = route.query.id;
            // 不能为空
            if(!list.titlevalue){
                Toast.fail('标题不能为空')
                return
            }else if(!list.contentvalue){
                Toast.fail('内容不能为空')
                return
            }
            list.Alldata.push({
                articleId:+new Date(),
                collect:false,
                collectionAmount:0, 
                follow:null,
                comment:[],
                content:list.contentvalue,
                createTime:"2022-11-08 10:40:36",
                operateHeadImg:list.Myinfo.headimg,
                operateUserName:list.Myinfo.name,
                pictures:list.Img,
                praise:0,
                praiseAmount:0,
                title:list.titlevalue,
                user_id:list.Myinfo.user_id
            })
            list.titlevalue="";
            list.contentvalue="";
            if(id!==undefined){
                let index = list.savedata.findIndex(item=>item.id==id);
                list.savedata.splice(index,1);
                window.localStorage.setItem("save_box",JSON.stringify(list.savedata));
            }
            // 所有详情页数据
            window.localStorage.setItem("articleDetails",JSON.stringify(list.Alldata));
            // 跳转到个人中心
            router.push("/myhome")
        }
        // 存入草稿箱
        let save_box=()=>{
            console.log(list.titlevalue,list.contentvalue,list.Img);
            // 不能为空
            if(!list.titlevalue){
                Toast.fail('标题不能为空')
                return
            }else if(!list.contentvalue){
                Toast.fail('内容不能为空')
                return
            }
            list.savedata.push({
                title:list.titlevalue,
                content:list.contentvalue,
                img:list.Img,
                id:+new Date(),
            })
            console.log(list.savedata);
            window.localStorage.setItem("save_box",JSON.stringify(list.savedata));

            router.push("/draft")
        }
        return {
            fileList,
            Dialog,
            ToastFun ,
            Toast,
            saveFun,
            afterRead,
            submit,
            save_box,
            ...toRefs(list)
        };
    },
    
}
</script>

<style lang="scss" scoped>
.release{
    height: 100vh;
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
            font-size: 22px;
        }
        h5{
            font-size: 15px;
        }
        p{
            font-size: 14px;
        }
    }
    :deep{
        .van-uploader__preview{
            border-radius: 10px;
            overflow: hidden;
            margin-right: 5px;
            &:nth-child(4n){
                margin-right: 0;
            }
        }
        .van-uploader__preview-image{
            border: 1px solid #ccc;
            border-radius: 10px;
            overflow: hidden;
        }
        .van-uploader__preview-delete--shadow{
            // border-top-right-radius: 10px;
            margin-top: 1px;
            margin-right: 1px;
        }
        .van-uploader__preview-image{
            border: 0;
        }
    }
    .top{
        margin-bottom: 10px;
    }
    .mainbox{
        padding: 0 15px;
        .title{
            margin-bottom: 10px;
            width: 100%;
            font-size: 13px;
            border: 0;
        }
        .line{
            height: 2px;
            background-color: #f9f9f9;
            margin-bottom: 10px;
        }
        textarea{
            width: 100%;
            line-height: 20px;
            letter-spacing: 1px;
            height: 90px;
            border: 0;
            margin-bottom: 10px;
            font-size: 12px;
            resize: none;
        }
        .ticket{
            display: flex;
            margin-bottom: 10px;
            .lit_title{
                padding: 6px 9px;
                background-color: #f5f5f5;
                border-radius: 5px;
                font-size: 12px;
                margin-right: 5px;
            }
        }
    }
    .place{
        .top{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 20px;
            margin-bottom: 10px;
            .place_l{
                display: flex;
                .icon{
                    width: 17px;
                    height: 17px;
                    font-size: 17px;
                    margin-right: 5px;
                    margin-top: -2px;
                 
                }
                p{
                    font-size: 14px;
                }
            }
            .place_r{
                display: flex;
                .place_ticket{
                    padding: 4px 8px;
                    border-radius: 15px;
                    background-color: #f5f5f5;
                    font-size: 12px;
                    transform: scale(0.9);
                }
            }
        }
        .ticketbox{
            display: flex;
            margin-bottom: 10px;
            flex-wrap: wrap;
            .ticketlit{

                font-size: 12px;
                padding: 6px 10px;
                border-radius: 15px;
                background-color: #f9f9f9;
            }
        }
    }
    .save{
        height: 14px;
        display: flex;
        justify-content: space-between;
        .box{
            display: flex;
            align-items: center;
            .icon{
                margin-top: -1px;
                width: 13px;
                height: 13px;
                font-size: 13px;
                margin-right: 5px;
                border-radius: 50%;
            }   
            p{
                font-size: 12px;
            }
        }
    }
    .foot_btm{
        height: 55px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        box-sizing: border-box;
        width: 100%;
        min-width: 320px;
        max-width: 750px;
        position: absolute;
        bottom: 0;
        z-index: 999;
        background-color: #fff;
        .save_draft{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            height: 43px;
            margin-right: 15px;
            .icon{
                width: 28px;
                height: 28px;
                font-size: 16px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                background-color: #f0efef;
            }
            p{
                font-size: 12px;
                transform: scale(0.9);
            }
        }
        .submit{
            flex: 1;
            text-align: center;
            line-height: 43px;
            height: 43px;
            background-color: #e93f48;
            border-radius: 20px;
            color: #fff;
            font-size: 14px;
        }
    }
    .null{
        width: 100%;
        height: 50px;
    }
}
</style>