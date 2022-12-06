<template>
<van-loading type="spinner" class="loading" v-show="pageLoading" />
  <div class="home">
    <!-- 顶部导航栏 -->
    <div class="nav">
      <div class="icon iconfont icon-gengduo2"></div>
      <ul class="title">
        
        <li class="box">
          <p class="con">发现</p>
       
        </li>
       
        
      </ul>
      <div class="icon iconfont icon-sousuo1" style="font-size:18px;" @click="search"></div>
    </div>
    <!-- Tab选项卡 -->
    <div class="tabs">
      <van-tabs 
      sticky offset-top="38"
      v-model:active="active" 
      animated 
      swipeable 
      title-inactive-color="#adadad"
      title-active-color="#000"
      line-height="0px"
      @click-tab="onClickTab"
      >
        <!-- 推荐 -->
        <van-tab  title-class="Lit_tabs"  title='推荐 '>
          <div class="content" v-if="listdata.length > 0 ">
            <div class="article" v-for="item in listdata" :key="item.id" >
              <div class="imgbox" @click.stop="getArticleDetailFun(item.id)">
                <img :src="item.note_card.cover.url"  alt="">
              </div>
              <div class="describe">
                <div class="title">
                  <!-- 半开卷考试如何利用有限纸张半开卷考试如何利用有限纸张半开卷考试如何利用有限纸张 -->
                  {{item.note_card.display_title}}
                </div>
                <div class="user">
                  <div class="left" :key="item.note_card.user.user_id">
                    <div class="userimg"><img :src="item.note_card.user.avatar" alt=""></div>
                    <div class="name">{{item.note_card.user.nick_name}}</div>
                  </div>
                  <div class="right" @click="like_sell(item.id)">
                    <div class="icon icon-aixin iconfont" v-show="!item.praise"></div>
                    <div class="icon iconfont icon-aixin1" style="color:#eb2e33;" v-show="item.praise"></div>
                    <!-- <div class="icon"></div> -->
                    <div class="num">{{getFilter(item.note_card.interact_info.liked_count)}}</div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
         
        </van-tab>
        <!-- 美妆 -->
        <van-tab  title-class="Lit_tabs" title="美妆" >
          <div class="contentMake" v-if="HomeMakeupList.length > 0 ">
            <!-- 笔记盒子 -->
            <div class="article" v-for="item in HomeMakeupList" :key="item.articleId" >
              <!-- 笔记图片 -->
              <div class="imgbox" @click.stop="getArticleDetailFun(item.articleId)">
                <img :src="item.first.url"  alt="">
              </div>
              <!-- 笔记内容 -->
              <div class="describe">
                <!-- 笔记标题 -->
                <div class="title">
                  {{item.title}}
                </div>
                <div class="user">
                  <div class="left">
                    <!-- 笔记作者图片 -->
                    <div class="userimg"><img :src="item.operateHeadImg" alt=""></div>
                    <!-- 笔记作者名字 -->
                    <div class="name">{{item.operateUserName}}</div>
                  </div>
                  <div class="right" @click="like_makeup(item.articleId)">
                    <div class="icon icon-aixin iconfont" v-if="!item.praise"></div>
                    <div class="icon iconfont icon-aixin1" style="color:#eb2e33;" v-if="item.praise"></div>
                    <div class="num">{{getFilter(item.praiseAmount)}}</div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
         
        </van-tab>
        <!-- 最新 -->
        <van-tab  title-class="Lit_tabs" title="最新" >
          <div class="contentHomeNew" v-if="HomeNewList.length > 0 ">
            <!-- 最新笔记盒子 -->
            <div class="article" v-for="item in HomeNewList" :key="item.articleId" >
              <!-- 笔记图片 -->
              <div class="imgbox" @click="getArticleDetailFun(item.articleId)">
                <img :src="item.first.url"  alt="">
              </div>
              <!-- 笔记内容 -->
              <div class="describe">
                <div class="title">
                  <!-- 笔记标题 -->
                  {{item.title}}
                </div>
                <div class="user">
                  <div class="left">
                    <!-- 笔记作者图片 -->
                    <div class="userimg"><img :src="item.operateHeadImg" alt=""></div>
                    <!-- 笔记作者名字 -->
                    <div class="name">{{item.operateUserName}}</div>
                  </div>
                  <div class="right" @click="like_new(item.articleId)">
                    <!-- 点赞 -->
                    <div class="icon icon-aixin iconfont" v-if="!item.praise"></div>
                    <div class="icon iconfont icon-aixin1" style="color:#eb2e33;" v-if="item.praise"></div>
                    <div class="num">{{getFilter(item.praiseAmount)}}</div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
         
        </van-tab>
      </van-tabs>
    </div>
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { useRouter } from 'vue-router'
// import { getHomefeed } from "../api/homefeed.js"
import { onMounted, reactive, toRefs } from '@vue/runtime-core'
import { getHomefeed,getHomeMakeup,getHomeNew,getArticleDetail,getArticleDetailMore} from "../api/homefeed.js"
import { useStore } from '../store/index.js'
export default {
  components: { NavBar },

  setup () {
    // 获取vue-router对象
    let router= useRouter();
    let search=()=>{
      router.push("/search")
    }

    // 获取pinia对象
    let store = useStore();
    // console.log("home",store.address);
    // store.address = ["book1122"]
    store.$patch({
      address:["book1122"]
    })

    // console.log("home11",store.address);
    
    let list = reactive({
      // 首页发现页推荐笔记数据
      listdata:[],
      // 首页美妆笔记数据
      HomeMakeupList:[],
      // 首页最新笔记数据
      HomeNewList:[],
      // 首页图片数据
      listImg:null,
      // 加载按钮开关
      pageLoading:true,
      active:"0",
      // 推荐笔记详情内容数据
      articleDetails:[],
      // 当前点赞的预览图文的数据
      Nowgoods:[],
      // 个人信息
      Myinfo:[]
    });
    // 调用首页 发现页 笔记数据
    let getHomefeedFun = ()=>{

      // getHomeImage().then(data =>{
      //   list.listImg = data.listImg

      //   // 调用发现页笔记详情数据
      //   return getHomefeed();

      // }).then(data =>{
      //      // 首页发现页笔记详情数据
      //     list.listdata = data.items

      //     // console.log(data);
      //     for(let i = 0 ;i<list.listImg.length;i++){
      //       list.listdata[i].note_card.cover.url = list.listImg[i]
      //     }

      //     console.log(list.listdata);

      //     // 关闭加载状态
      //   list.pageLoading = false
      //     // return data
      // })
      
        if(!JSON.parse(window.localStorage.getItem("listdata"))){
           getHomefeed().then(data =>{
               // 首页发现页笔记数据
              list.listdata = data.items

               // 关闭加载状态
              list.pageLoading = false

              // console.log(list.listdata);
              window.localStorage.setItem("listdata",JSON.stringify(list.listdata))

            })
        }  
        if(!JSON.parse(window.localStorage.getItem("HomeMakeup"))){
            // 获取美妆数据方法
            getHomeMakeup().then(data =>{
              // console.log(data);
              // 美妆笔记数据
              list.HomeMakeupList = data.data.items;
              console.log(list.HomeMakeupList);
              window.localStorage.setItem("HomeMakeup",JSON.stringify(list.HomeMakeupList))
            })
        }
        if(!JSON.parse(window.localStorage.getItem("HomeMakeup"))){
            // 获取最新数据方法
            getHomeNew().then(data=>{
              console.log(data);
              // 最新笔记数据
              list.HomeNewList = data.data.items;
              // console.log(list.HomeNewList);
              window.localStorage.setItem("HomeNew",JSON.stringify(list.HomeNewList))
            })  
        }

        if(!JSON.parse(window.localStorage.getItem("articleDetails"))){

          getArticleDetail().then(data => {
            // 推荐笔记内容详情
            list.articleDetails = data.details;
            return getArticleDetailMore();
          }).then(data => {
            let detail = data.details;
            list.articleDetails = list.articleDetails.concat(detail);
            // 添加点赞收藏属性
            for(let i=0;i<list.articleDetails.length;i++){
              list.articleDetails[i].collect=false;
              list.articleDetails[i].follow=false;
              // 添加评论点赞属性
              if(list.articleDetails[i].comment.length >0){
                for(let j=0;j<list.articleDetails[i].comment.length;j++){
                  list.articleDetails[i].comment[j].like=false;
                  // 添加回复点赞属性
                  for(let k=0;k<list.articleDetails[i].comment[j].items.length;k++){
                    list.articleDetails[i].comment[j].items[k].like=false;
                  }
                }
               
              }
              
            }
            // 数据持久化
            window.localStorage.setItem("articleDetails",JSON.stringify(list.articleDetails))
          })
        }
        

    }
    // 导航条点击事件
    let onClickTab = ()=>{

      console.log(list.active);

      // 保留导航条active的下标
      window.localStorage.setItem("HomeActive",list.active);

    }

    // 首页推荐点赞
    let like_sell=(id)=>{
      // 所有详情页数据中所在下标
      let indexall = list.articleDetails.findIndex(item=>item.articleId==id);
      // 首页点赞所在下标
      let index= list.listdata.findIndex(item=>item.id==id);
      if(!list.listdata[index].praise){
        // 修改点赞状态
        list.listdata[index].praise=true;
        // 修改详情页点赞状态
        list.articleDetails[indexall].praise=1;
        // 字符串转化成num类型 点赞数加减 首页显示数据
        // 首页点赞数
        list.listdata[index].note_card.interact_info.liked_count =  parseInt(list.listdata[index].note_card.interact_info.liked_count) + 1;
        list.articleDetails[indexall].praiseAmount += 1;
        
        window.localStorage.setItem("articleDetails",JSON.stringify(list.articleDetails));
        window.localStorage.setItem("listdata",JSON.stringify(list.listdata));
        
      }else if(list.listdata[index].praise){
        list.listdata[index].praise=false;
        list.articleDetails[indexall].praise=0;
        list.listdata[index].note_card.interact_info.liked_count =  parseInt(list.listdata[index].note_card.interact_info.liked_count) - 1;

        list.articleDetails[indexall].praiseAmount -= 1;
        window.localStorage.setItem("articleDetails",JSON.stringify(list.articleDetails));
        window.localStorage.setItem("listdata",JSON.stringify(list.listdata));
      }
      console.log(list.articleDetails[indexall],list.listdata[index]);
    }
    // 首页美妆点赞
    let like_makeup=(id)=>{
      console.log(id);
      let indexall = list.articleDetails.findIndex(item=>item.articleId==id);
      let index= list.HomeMakeupList.findIndex(item=>item.articleId==id);
      
      if(!list.HomeMakeupList[index].praise){
        // 修改点赞状态
        list.HomeMakeupList[index].praise=true;
        // 修改详情页点赞状态
        list.articleDetails[indexall].praise=1;
        // 字符串转化成num类型 点赞数加减 首页显示数据
        // 首页点赞数
        list.HomeMakeupList[index].praiseAmount += 1;
        list.articleDetails[indexall].praiseAmount += 1;
        window.localStorage.setItem("articleDetails",JSON.stringify(list.articleDetails));
        window.localStorage.setItem("HomeMakeup",JSON.stringify(list.HomeMakeupList));
        
      }else if(list.HomeMakeupList[index].praise){
        list.HomeMakeupList[index].praise=false;
        list.articleDetails[indexall].praise=0;
        list.HomeMakeupList[index].praiseAmount -= 1;

        list.articleDetails[indexall].praiseAmount -= 1;
        window.localStorage.setItem("articleDetails",JSON.stringify(list.articleDetails));
        window.localStorage.setItem("HomeMakeup",JSON.stringify(list.HomeMakeupList));
      }
      console.log(list.articleDetails[indexall],list.HomeMakeupList[index]);
    }
    // 首页最新点赞
    let like_new=(id)=>{
      console.log(id);
      let indexall = list.articleDetails.findIndex(item=>item.articleId==id);
      let index= list.HomeNewList.findIndex(item=>item.articleId==id);

      if(!list.HomeNewList[index].praise){
        // 修改点赞状态
        list.HomeNewList[index].praise=true;
        // 修改详情页点赞状态
        list.articleDetails[indexall].praise=1;
        // 字符串转化成num类型 点赞数加减 首页显示数据
        // 首页点赞数
        list.HomeNewList[index].praiseAmount += 1;
        list.articleDetails[indexall].praiseAmount += 1;
        window.localStorage.setItem("articleDetails",JSON.stringify(list.articleDetails));
        window.localStorage.setItem("HomeNew",JSON.stringify(list.HomeNewList));
        
      }else if(list.HomeNewList[index].praise){
        list.HomeNewList[index].praise=false;
        list.articleDetails[indexall].praise=0;
        list.HomeNewList[index].praiseAmount -= 1;

        list.articleDetails[indexall].praiseAmount -= 1;
        window.localStorage.setItem("articleDetails",JSON.stringify(list.articleDetails));
        window.localStorage.setItem("HomeNew",JSON.stringify(list.HomeNewList));
      }
      console.log(list.articleDetails[indexall],list.HomeNewList[index]);
    }


    //跳转 笔记详情页数据 传参
    let getArticleDetailFun = (id) => {
      console.log(id);
      router.push({
        path:"/Details",
        query:{
          id
        }
      })

      
    } 

    

    // 初始化
    let created = ()=>{
      // 判断是否有导航条的下标
      if(window.localStorage.getItem("HomeActive")){
        list.active = window.localStorage.getItem("HomeActive")
      }

      //判断是否有首页推荐数据
      if(window.localStorage.getItem("listdata")){
        list.listdata=JSON.parse(window.localStorage.getItem("listdata"));
        // 关闭加载状态
        list.pageLoading = false
      }

      //判断是否有首页美妆数据
      if(window.localStorage.getItem("HomeMakeup")){
        list.HomeMakeupList=JSON.parse(window.localStorage.getItem("HomeMakeup"));
        // 关闭加载状态
        list.pageLoading = false
      }

      //判断是否有首页最新数据
      if(window.localStorage.getItem("HomeNew")){
        list.HomeNewList=JSON.parse(window.localStorage.getItem("HomeNew"));
        // 关闭加载状态
        list.pageLoading = false
      }

      // 判断是否有所有详情页数据
      if(window.localStorage.getItem("articleDetails")){
        list.articleDetails=JSON.parse(window.localStorage.getItem("articleDetails"));
  
      }

      // 判断是否有当前点赞的预览图文数据
      if(window.localStorage.getItem("Nowgoods")){
        list.Nowgoods=JSON.parse(window.localStorage.getItem("Nowgoods"));
      }

      if(!window.localStorage.getItem("Myinfo")){
        
        list.Myinfo.push({
          name:"PIG",
          headimg:"https://i.postimg.cc/y6Pyxzmn/Ym.png",
          user_id:404,
          introduce:"你猜",
        })
        window.localStorage.setItem("Myinfo",JSON.stringify(list.Myinfo));
      }
    }

    created();
    
    onMounted(()=>{
      // created();
      
    })

    // 过滤器
    let getFilter = (value)=>{
       if(value < 10000){
          return value;
        }
        let w = value > 10000?value/10000:value;//万计算
        let y = w > 10000? parseInt(w/10000) +"亿" :parseInt(w) +"万";
        return y;
    }

    // 调用接收json数据
    getHomefeedFun();
    
    return {
      ...toRefs(list),
      getHomefeedFun,
      getFilter,
      search,
      getArticleDetailFun,
      created,
      like_sell,
      like_makeup,
      like_new,
      onClickTab
    }
  }
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
.home{
  overflow: hidden;
  .nav{
    width: 100%;
    box-sizing: border-box;
    min-width: 320px;
    max-width: 750px;
    position: fixed;
    top: 0;
    z-index: 999;
    height: 39px;
    padding: 0 15px;
    padding-top: 14px;
    background-color: #fefefe;
    border-bottom: 1px solid #f7f7f7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon{
      font-size: 16px;
    }
    .title{
      margin-top: 6px;
      display: flex;
      flex: 1;
      margin: 0 75px;
      justify-content: space-evenly;
      .box{
        p{
          font-weight: bold;
          font-size: 15px;
          color: #b8b8b8;
          margin-bottom: 5px;
          &.con{
            color: #000;
          }
        }
        .red_line{
          margin: 0 2px;
          height: 1px;
          background-color: #e30009;
          border-radius: 2px;
          border: 1px solid #f5a6a9;
        }
      }
    }
  }
  .tabs{
    
    margin-top: 38px;
    ::v-deep .Lit_tabs{
      
      font-weight: bold;
    }
    ::v-deep .van-sticky--fixed{
      width: 100%;
      min-width: 320px;
      max-width: 750px;
    }
    .content,.contentMake,.contentHomeNew{
      display: flex;
      height: 3830px; 
      flex-flow: column wrap; 
      // background: #f9f9f9;
      // background: #f6f6f6;
      background: #f2f3f5;
      padding: 0 3px;
      .article{
        width: 49.5%;
        border-radius:4px;
        overflow: hidden;
        margin-bottom: 6px;
        margin-right: 5px;
        img{
          width: 100%
        }
      }
      .describe{
        background-color: #fefefe;
        padding: 10px;
        .title{
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-weight: bold;
          font-size: 14px;
          line-height: 20px;
          margin-bottom: 10px;
        }
        .user{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .left{
            display: flex;
            align-items: center;
            .userimg{
              width: 18px;
              height: 18px;
              border-radius: 50%;
              overflow: hidden;
              box-sizing: border-box;
              box-shadow:  0 0 2px #ccc;
              display: flex;
            }
            .name{
              width: 94px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              margin-left: 5px;
              font-size: 11px;
              transform: scale(0.9);
              color: #666666;
            }
          }
          .right{
            display: flex;
            align-items: center;
            .icon{
              width: 14px;
              height: 14px;
              margin-right: 4px;
            }
            .num{
              margin-top: 3px;
              font-size: 12px;
              color: #666666;
            }
          }
        }
      }
    }

    .contentMake{
      height: 2920px;
      background: #f2f3f5;
      .article{
        width: 49%;
        
      }
    }

    .contentHomeNew{
      height: 4110px;
      background: #f2f3f5;
      .article{
        width: 49%;
        
      }
    }
  }
}
</style>