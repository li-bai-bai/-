<template>
    <div class="ArticleDetails">
        <div class="nav">
            <div class="left">
                <div @click="$router.go(-1)" class="icon iconfont icon-zuojiantou"></div>
                <div class="leftbox" style="display:flex;align-items: center;" @click="gouser(articleDetails.user_id)">
                    <div v-if="headShow" style="display:flex; align-items: center;">
                    <div class="userimg">
                        <img :src="Myinfo.headimg" alt="">
                    </div>
                    <div class="name">{{Myinfo.name}}</div>
                    </div>
                    <div v-if="!headShow" style="display:flex; align-items: center;">
                    <div class="userimg">
                        <img :src="articleDetails.operateHeadImg" alt="">
                    </div>
                    <div class="name">{{articleDetails.operateUserName}}</div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div v-if="articleDetails.follow!=null" class="btn" @click="follow(articleDetails.user_id)">
                    <div class="follow" v-show="!articleDetails.follow">关注</div>
                    <div class="follow con" v-show="articleDetails.follow">已关注</div>
                </div>
                <div class="del" v-if="articleDetails.follow==null" @click="del">删除</div>
                <div class="icon iconfont icon-fenxiang_2"></div>
            </div>
        </div>
        <div class="null"></div>
        <div class="imgbox">
            <van-swipe class="my-swipe" indicator-color="white">
                <van-swipe-item @click="ImagePreview([articleDetails.pictures])">
                    <img :src="articleDetails.pictures" alt="">
                </van-swipe-item>
                
            </van-swipe>
        </div>
        <div class="title_main">
            <div class="title">{{articleDetails.title}}</div>
            <div class="mainbox">
                <p v-for="(item,index) in contentList" :key="index">{{item}}</p>
            </div>
            <div class="time">
                {{articleDetails.createTime}} 广东
            </div>
            <div class="line"></div>
        </div>
        <!-- 评论 -->
        <div class="comment">
            <div class="title">共{{commentList.length}}条评论</div>
            <div class="top">
                <div class="userimg">
                    <img :src="Myinfo.headimg" alt="">
                </div>
                <div class="inp" @click="say(1,100,'说点什么吧~')">
                    喜欢就给个评论支持一下~
                </div>
            </div>
            <div class="commentbox"  v-for="(item,index) in commentList" :key="item.evaluationId">
                <div class="user">
                    <div class="userimg">
                        <img :src="item.headImgUrl" alt="" >
                    </div>
                    <div class="right">
                        <div class="top">
                            <!-- 左边评论 -->
                            <div class="left" >
                                <!-- <div class="name">{{Candysunny}} <span class="writer">作者</span></div> -->
                                <div class="name">{{item.userName}} <span v-if="item.userId==Myinfo.user_id" class="delbox" @click="delcom(item.evaluationId,1,index)">删除</span></div>
                                <div class="say" @click="say(2,index,'回复'+item.userName)">{{item.content}}<span class="time">12-05 广东</span></div>  
                            </div>
                            <!-- 右边点赞 -->
                            <div class="right">
                                <div @click="comment_like(item.evaluationId)" class="likebox" >
                                    <div class="icon iconfont icon-aixin" v-show="!item.like"></div>
                                    <div class="icon iconfont icon-aixin1" style="color:#eb2e33;" v-show="item.like"></div>
                                </div>
                                <div class="num">{{item.praise}}</div>
                            </div>
                        </div>
                        <!-- 回复 -->
                        <div class="user" v-for="(small,i) in item.items" :key="small.evaluationId">
                                <div class="userimg">
                                    <img :src="small.answerHeadImgUrl" alt="">
                                </div>
                                <div class="right">
                                    <div class="top">
                                        <div class="left">
                                            <div class="name">{{small.answerNickName}}
                                                <span class="writer"  v-if='small.answerNickName == articleDetails.operateUserName?true:false '>作者</span>
                                                <span v-if="small.userId==Myinfo.user_id" class="delbox" @click="delcom(small.evaluationId,2,index)">删除</span>
                                            </div>
                                            <div class="say"  @click="say(3,index,'回复'+small.answerNickName)">{{small.content}} <span class="time">12-05 广东</span> </div>
                                        </div>
                                        <div class="right">
                                            <div class="likebox" @click="reply(index,i)">
                                                <div class="icon iconfont icon-aixin" v-show="!small.like"></div>
                                                <div class="icon iconfont icon-aixin1" style="color:#eb2e33;" v-show="small.like"></div>
                                            </div>
                                            <div class="num">{{small.answer}}</div>
                                        </div>
                                    </div>
                                    <!-- <div class="btm">
                                        <div class="reply">展开5条回复</div>
                                        <div class="show">收起</div>
                                    </div> -->
                                </div>
                        </div>
                        <div class="line"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="nullfoot"></div>
        <div class="foot">
            <div class="inp" @click="say(1,100,'说点什么吧~')">
                <div class="iconlit iconfont icon-bianji"></div>
                <p>说点什么...</p>
            </div>
            <!-- 点赞 -->
            <div class="like" @click="like">
                <div class="icon iconfont icon-aixin" style="font-weight:bold;" v-show="!articleDetails.praise"></div>
                <div class="icon iconfont icon-aixin1" style="color:#eb2e33;"  v-show="articleDetails.praise"></div>
                <div class="num">{{getFilter(articleDetails.praiseAmount)}}</div>
            </div>
            <!-- 收藏 -->
            <div class="like" @click="collect">
                <div class="icon iconfont icon-31shoucang" style="margin-top:-1px;" v-show="!articleDetails.collect"></div>
                <div class="icon iconfont icon-shoucang" style="margin-top:-1px; color:#ffd45b;" v-show="articleDetails.collect"></div>
                <div class="num">{{getFilter(articleDetails.collectionAmount)}}</div>
            </div>
            <!-- 评论 -->
            <div class="like">
                <div class="icon iconfont icon-007pinglun "></div>
                <div class="num">{{getFilter(commentList.length)}}</div>
            </div>
        </div>
        <van-popup
            v-model:show="show"
            position="bottom"
         
        >
            <div class="cominp">
                <div class="inp_top">
                    <input type="text" :placeholder="Name"  v-model="inputValue" />
                    <div class="inp_r" @click="send">发送</div>
                </div>
                <div class="inp_btm"></div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { ImagePreview } from 'vant';
import 'vant/es/image-preview/style';
import 'vant/es/toast/style';
import { Toast } from 'vant';
import { reactive, toRefs,onMounted } from 'vue';
import { useRouter,useRoute } from "vue-router"
export default {
    setup () {
        // 获取跳转链接数据
        let router = useRouter();
        let route = useRoute();
        console.log(router);
        let list = reactive({
            // 笔记详情数据
            articleDetails:null,
            // 笔记内容数组
            contentList:[],
            // 笔记评论内容
            commentList:[],
            // 弹窗显示隐藏
            show:false,
            // 首页推荐数据
            listdata:[],
            // 首页美妆数据
            HomeMakeupList:[],
            // 首页最新列表数据
            HomeNewList:[],
            // 所有详情页数据
            Alldata:[],
            // 评论回复类型
            Type:"",
            // 评论回复下标
            Itemindex:"",
            // 用户名
            Name:'',
            // 评论输入框的值
            inputValue:"",
            // 个人信息
            Myinfo:[],
            // 个人发布作品
            Myworks:[],
            // 头像状态
            headShow:false,
        })
        // 删除评论
        let delcom=(id,type,i)=>{
            console.log(id,type);
            // 评论
            if(type==1){
                let index1=list.commentList.findIndex(item=>item.articleId==id);
                list.commentList.splice(index1,1);
                Toast("已删除评论")
                // 所有详情页数据
                window.localStorage.setItem("articleDetails",JSON.stringify(list.Alldata));
                console.log(index1);
            }else if(type==2){//回复
                let index2=list.commentList[i].items.findIndex(item=>item.articleId==id);
                list.commentList[i].items.splice(index2,1);
                Toast("已删除评论")
                // 所有详情页数据
                window.localStorage.setItem("articleDetails",JSON.stringify(list.Alldata)); 
                console.log(index2);
            }
        }

        //页面加减完成创建浏览记录
        onMounted(()=>{
            getLogsData()
        });

        //创建历史记录id
        let getLogsData = ()=>{

            let logsData = []
            let id = route.query.id
               
            if ( window.localStorage.getItem("logsData")) {
                logsData = JSON.parse(window.localStorage.getItem("logsData"))
            }
            logsData = logsData.filter( item => item != id)
            
            logsData.unshift(id)

            window.localStorage.setItem("logsData",JSON.stringify(logsData))
        }


        // 点赞功能
        let like=()=>{
            let id = route.query.id;
            // 首页推荐列表所在下标
            let index=list.listdata.findIndex(item=>item.id==id);
            // 首页美妆列表所在下标
            let index_makeup=list.HomeMakeupList.findIndex(item=>item.articleId==id);
            // 首页最新列表所在下标
            let index_new=list.HomeNewList.findIndex(item=>item.articleId==id);
            // 修改点赞状态和点赞数
            if(!list.articleDetails.praise){
                list.articleDetails.praise=1;
                list.articleDetails.praiseAmount+=1;

                if(index!=-1 && index_makeup==-1 && index_new==-1){//首页推荐
                    // 点赞数加一
                    list.listdata[index].note_card.interact_info.liked_count = parseInt(list.listdata[index].note_card.interact_info.liked_count) + 1;
                    //改变点赞状态
                    list.listdata[index].praise=true;
                    // 存入数据
                    window.localStorage.setItem("listdata",JSON.stringify(list.listdata));
                }else if(index_makeup!=-1 && index==-1 && index_new==-1){//首页美妆

                    list.HomeMakeupList[index_makeup].praiseAmount+=1;
                    //改变点赞状态
                    list.HomeMakeupList[index_makeup].praise=true;
                    // 存入数据
                    window.localStorage.setItem("HomeMakeup",JSON.stringify(list.HomeMakeupList));
                }else if(index_new!=-1 && index==-1 && index_makeup==-1){//首页最新

                    list.HomeNewList[index_new].praiseAmount+=1;
                    //改变点赞状态
                    list.HomeNewList[index_new].praise=true;
                    // 存入数据
                    window.localStorage.setItem("HomeNew",JSON.stringify(list.HomeNewList));
                }
                // 所有详情页数据
                window.localStorage.setItem("articleDetails",JSON.stringify(list.Alldata));
            }else if(list.articleDetails.praise){
                list.articleDetails.praise=0
                list.articleDetails.praiseAmount-=1;

                if(index!=-1 && index_makeup==-1 && index_new==-1){//首页推荐
                    // 点赞数加一
                    list.listdata[index].note_card.interact_info.liked_count = parseInt(list.listdata[index].note_card.interact_info.liked_count) - 1;
                    //改变点赞状态
                    list.listdata[index].praise=false;
                    // 存入数据
                    window.localStorage.setItem("listdata",JSON.stringify(list.listdata));
                }else if(index_makeup!=-1 && index==-1 && index_new==-1){//首页美妆

                    list.HomeMakeupList[index_makeup].praiseAmount-=1;
                    //改变点赞状态
                    list.HomeMakeupList[index_makeup].praise=false;
                    // 存入数据
                    window.localStorage.setItem("HomeMakeup",JSON.stringify(list.HomeMakeupList));

                }else if(index_new!=-1 && index==-1 && index_makeup==-1){//首页最新

                    list.HomeNewList[index_new].praiseAmount-=1;
                    //改变点赞状态
                    list.HomeNewList[index_new].praise=false;
                    // 存入数据
                    window.localStorage.setItem("HomeNew",JSON.stringify(list.HomeNewList));
                }
                // 所有详情页数据
                window.localStorage.setItem("articleDetails",JSON.stringify(list.Alldata));
            }
        }
        //收藏功能
        let collect=()=>{
            // let id = route.query.id;
            if(!list.articleDetails.collect){
                list.articleDetails.collect=true;
                list.articleDetails.collectionAmount+=1;
                // 所有详情页数据
                window.localStorage.setItem("articleDetails",JSON.stringify(list.Alldata));
            }else if(list.articleDetails.collect){
                list.articleDetails.collect=false;
                list.articleDetails.collectionAmount-=1;
                // 所有详情页数据
                window.localStorage.setItem("articleDetails",JSON.stringify(list.Alldata));
            }
        }
        // 评论点赞
        let comment_like=(id)=>{
            // 当前评论所在数组下标
            let index=list.commentList.findIndex(item=>item.evaluationId==id);
            if(!list.commentList[index].like){
                list.commentList[index].like=true;
                list.commentList[index].praise+=1;
                // 所有详情页数据
                window.localStorage.setItem("articleDetails",JSON.stringify(list.Alldata));
            }else if(list.commentList[index].like){
                list.commentList[index].like=false;
                list.commentList[index].praise-=1;
                // 所有详情页数据
                window.localStorage.setItem("articleDetails",JSON.stringify(list.Alldata));
            }
        }
        // 回复点赞 index全部评论所在下标 i评论下回复所在下标
        let reply=(index,i)=>{
            if(!list.commentList[index].items[i].like){
                list.commentList[index].items[i].like=true;
                list.commentList[index].items[i].answer+=1;
                // 所有详情页数据
                window.localStorage.setItem("articleDetails",JSON.stringify(list.Alldata));
            }else if(list.commentList[index].items[i].like){
                list.commentList[index].items[i].like=false;
                list.commentList[index].items[i].answer-=1;
                // 所有详情页数据
                window.localStorage.setItem("articleDetails",JSON.stringify(list.Alldata));
            }
        }
        // 关注作者
        let follow=(id)=>{
            console.log(list.articleDetails.follow);
            console.log(id);
            list.articleDetails.follow=!list.articleDetails.follow
            // 所有详情页数据
            window.localStorage.setItem("articleDetails",JSON.stringify(list.Alldata));
        }
        // 设置评论类型
        let say=(i,index,name)=>{
            list.Type=i;//存储评论类型
            list.Itemindex=index;//存储评论下标
            list.Name=name;//存储用户名
            list.show=!list.show;//评论弹窗显示隐藏
            // console.log(list.Type,list.Itemindex,list.Name);
        }
        // 评论功能
        let send=()=>{
            // 禁止输入空内容
            if(!list.inputValue){
                Toast.fail('请输入内容');
                return
            }
            // 评论
            if(list.Type==1){
                list.commentList.push({
                  answer: 0,
                  answerHeadImgUrl: null,
                  answerNickName: null,
                  articleId : +new Date(),
                  atUserId: null,
                  atUserName: null,
                  content: list.inputValue,
                  createTime: "2022-11-24 22:23:01",
                  evaluationId: +new Date(),
                  headImgUrl:list.Myinfo.headimg,
                  items: [],
                  like: false,
                  parentId: "0",
                  praise: 0,
                  praiseQuantity: 0,
                  userId: list.Myinfo.user_id,
                  userName: list.Myinfo.name
                })
                list.inputValue="",
                list.Type="",
                list.show=!list.show,
                // 所有详情页数据
                window.localStorage.setItem("articleDetails",JSON.stringify(list.Alldata));
            // 回复
            }else if(list.Type==2){
                list.commentList[list.Itemindex].items.push({
                  answer: 0,
                  answerHeadImgUrl: list.Myinfo.headimg,
                  answerNickName: list.Myinfo.name,
                  articleId : +new Date(),
                  atUserId: null,
                  atUserName: null,
                  content: list.inputValue,
                  createTime: "2022-11-24 22:23:01",
                  evaluationId: +new Date(),
                  headImgUrl: null,
                  like: false,
                  parentId: "0",
                  praise: 0,
                  praiseQuantity: 0,
                  userId: list.Myinfo.user_id,
                  userName: list.Myinfo.name
                })
                list.inputValue="",
                list.Type="",
                list.show=!list.show,
                // 所有详情页数据
                window.localStorage.setItem("articleDetails",JSON.stringify(list.Alldata));
            // @回复
            }else if(list.Type==3){
                let name=list.Name.split("回复");
                list.commentList[list.Itemindex].items.push({            
                  answer: 0,
                  answerHeadImgUrl: list.Myinfo.headimg,
                  answerNickName: list.Myinfo.name,
                  articleId : +new Date(),
                  atUserId: null,
                  atUserName: null,
                  content: "@"+name[1]+" "+list.inputValue,
                  createTime: "2022-11-24 22:23:01",
                  evaluationId: +new Date(),
                  headImgUrl: null,
                  like: false,
                  parentId: "0",
                  praise: 0,
                  praiseQuantity: 0,
                  userId: list.Myinfo.user_id,
                  userName: list.Myinfo.name
                })
                list.inputValue="",
                list.Type="",
                list.show=!list.show,
                // 所有详情页数据
                window.localStorage.setItem("articleDetails",JSON.stringify(list.Alldata));
            }
            // console.log(list.inputValue);
        }
        // 跳转到作者主页
        let gouser=(id)=>{
            // 如果id=个人id则跳转到个人页
           if(id==list.Myinfo.user_id){
            router.push("/myhome")
          
           }else{//否则跳到作者页面 
               router.push({
                    path:"/authorHomePage",
                    query:{
                        id
                    }
                })
           }
        }
        // 删除文章
        let del=()=>{
            let id=route.query.id;
            let index=list.Alldata.findIndex(item=>item.articleId==id);
            list.Alldata.splice(index,1);
            // 所有详情页数据
            window.localStorage.setItem("articleDetails",JSON.stringify(list.Alldata));
            router.push("/myhome");
        }
        // 初始化判断
        let created = () =>{
            // 全部详情页数据
            let listArticle = JSON.parse(window.localStorage.getItem("articleDetails"));
            // 所有详情页数据
            list.Alldata=listArticle;
            let id = route.query.id;
            let index = listArticle.findIndex(item => item.articleId == id);
            // 笔记详情数据赋值
            list.articleDetails = listArticle[index];
            // 笔记详情内容切割
            list.contentList = list.articleDetails.content.split("\n");
            // 笔记评论内容
            list.commentList = list.articleDetails.comment
            console.log(list.articleDetails);

            //判断是否有首页推荐数据
            if(window.localStorage.getItem("listdata")){
                list.listdata=JSON.parse(window.localStorage.getItem("listdata"));
            }

            //判断是否有首页美妆数据
            if(window.localStorage.getItem("HomeMakeup")){
                list.HomeMakeupList=JSON.parse(window.localStorage.getItem("HomeMakeup"));
            }

            //判断是否有首页最新数据
            if(window.localStorage.getItem("HomeNew")){
                list.HomeNewList=JSON.parse(window.localStorage.getItem("HomeNew"));
            }
            
            //判断是否有个人信息
            if(window.localStorage.getItem("Myinfo")){
                list.Myinfo=JSON.parse(window.localStorage.getItem("Myinfo"))[0];
            }

            //判断是否有个人作品
            if(window.localStorage.getItem("Myworks")){
                list.Myworks=JSON.parse(window.localStorage.getItem("Myworks"));
            }
            let Mindex=list.Myworks.findIndex(item=>item.articleId==id);
            if(Mindex!=-1){
                list.headShow=true
            }else{
                list.headShow=false
            }
         
        }
        created();

        // 过滤器
        let getFilter = (value)=>{
           if(value < 10000){
              return value;
            }
            let w = value > 10000?value/10000:value;//万计算
            let y = w > 10000? parseInt(w/10000) +"亿" :parseFloat(String(w).substring(0,3)) +"万";
            return y;
        }

        return {
            ...toRefs(list),
            created,
            getFilter,
            like,
            collect,
            comment_like,
            reply,
            follow,
            say,
            send,
            gouser,
            del,
            delcom,
            ImagePreview
        }
    }
}
</script>

<style lang="scss" scoped>
.ArticleDetails{
    .delbox{
        margin-left: 5px;
        color: #e82f3b;
        display: inline-block;
        transform: scale(0.9);
    }
    .my-swipe .van-swipe-item {
        // height: 380px;
        display: flex;
        align-items: center;
        img{
            width: 100%;
            // height: 100%;
        }
    }
    .null{
        height: 60px;
    }
    .nullfoot{
        height: 52px;
    }
    .nav{
        padding: 8px 15px;
        margin-bottom: 7px;
        box-sizing: border-box;
        position: fixed;
        top: 0;
        width: 100%;
        min-width: 320px;
        max-width: 750px;
        z-index: 999;
        background-color: #fff;
        box-shadow: 0 0 2px #ccc;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left{
            display: flex;
            align-items: center;
            .icon{
                font-size: 24px;
                margin-right: 10px;
            }
            .userimg{
                width: 33px;
                height: 33px;
                border-radius: 50%;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 10px;
                background-color: #fff;
                box-shadow: 0 0 3px #ccc;
                img{
                    // width: 100%;
                    height: 100%;
                }
            }
            .name{
                font-size: 14px;
            }
        }
        .right{
            display: flex;
            align-items: center;
            .del{
                font-size: 12px;
                padding: 3px 10px;
                border-radius: 15px;
                border: 1px solid #e82f3b;
                color: #e82f3b;
            }
            .btn{
                display: flex;
                .follow{
                    font-size: 12px;
                    padding: 6px 13px;
                    border: 2px solid #f7bdc2;
                    color: #e82f3b;
                    border-radius: 15px;
                    text-align: center;
                }
                .con{
                    border-color: #eee;
                    color: #818181;
                }
            }
            .icon{
                font-size: 18px;
                margin-left: 13px;
            }
        }
    }
    .title_main{
        padding: 0 15px;
        margin-bottom: 10px;
        .title{
            margin: 10px 0;
            font-size: 15px;
            font-weight: bold;
        }
        .mainbox{
            font-size: 14px;
            margin-bottom: 15px;
            p{
                // margin-bottom: 5px;
                line-height: 22px;
                text-align: justify;
            }
        }
        .time{
            color: #bebebe;
            font-size: 12px;
            margin-bottom: 10px;
        }
        .line{
            height: 2px;
            background-color:#f7f7f7;
            width: 100%;
        }
    }
    .comment{
        padding: 0 15px;
        margin-bottom: 100px;
        .title{
            font-size: 13px;
        }
        .userimg{
            height: 33px;
            width: 33px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            box-shadow: 0 0 3px #ccc;
            img{
                // width: 100%;
                height: 100%;
            }
        }
        .name{
            font-size: 12px;
            color: #b5b5b5;
            margin-bottom: 5px;
        }
        .say{
            font-size: 13px;
            line-height: 20px;
            margin-bottom: 10px;
        }
        .num{
            font-size: 13px;
        }
        .time{
            color: #acacac;
            font-size: 12px;
            margin-left: 5px;
        }
        .writer{
            padding: 3px 8px;
            background-color: #f6f6f6;
            color: #888888;
            margin-left: 5px;
            border-radius: 15px;
        }
        .top{
            padding: 20px 0;
            display: flex;
            .inp{
                border-radius: 25px;
                flex: 1;
                text-align: center;
                line-height: 33px;
                background-color: #f6f6f6;
                color: #acacac;
                font-size: 13px;
            }
        }
        .commentbox{
            margin-bottom: 15px;
            .user{
                display: flex;
                .right{
                    flex:1;
                    .line{
                        height: 2px;
                        background-color: #f7f7f7;
                    }
                    .icon{
                        margin-bottom: 5px;
                    }
                    .top{
                        padding: 0;
                        .left{
                            flex: 1;
                        }
                        .right{
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            flex: 0;
                        }
                    }
                    .user{
                        .userimg{
                            width: 26px;
                            height: 26px;
                        }
                       
                        .right{
                            // .say{
                            //     margin-bottom: 5px;
                            // }
                            .top{
                                display: flex;
                                .left{
                                    flex: 1;
                                }
                                .right{
                                    flex: 0;
                                }
                            }
                            .btm{
                                margin-bottom: 15px;
                                .reply{
                                    color: #5175ba;
                                }
                                width: 100%;
                                display: flex;
                                justify-content: space-between;
                                font-size: 12px;
                            }
                        }
                    }
                }
            }
            
        }
    }
    .cominp{
        padding: 10px 6px 0 13px;
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
        .inp_btm{
            height: 10px;

        }
    }
    .foot{
        box-shadow: 0 0 3px #ccc;
        padding: 0 15px;
        box-sizing: border-box;
        width: 100%;
        min-width: 320px;
        max-width: 750px;
        position: fixed;
        bottom: 0;
        height: 52px;
        background: #fff;
        z-index: 999;
        display: flex;
        align-items: center;
        .inp{
            flex:1;
            height: 32px;
            border-radius: 15px;
            background-color: #f6f6f6;
            display: flex;
            align-items: center;
            
            .iconlit{
                height: 18px;
                width: 18px;
                font-size: 21px;
                margin-right: 5px;
                margin-left: 10px;
                color:#858585;
            }
            p{
                font-size: 13px;
                color: #858585;
            }
        }
        .like{
            display: flex;
            align-items: center;
            .icon{
                width: 23px;
                height: 23px;
                font-size: 23px;
                margin-left: 20px;
            }
            .num{
                font-size: 14px;
                margin-left: 5px;
            }

        }
    }
}
</style>