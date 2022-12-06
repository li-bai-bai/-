<template>
<!-- 作者主页 -->
  <div class="authorHomePage">
     <!-- 顶部菜单和分享 -->
      <div class="my_banner_top">
        <div @click="$router.back()" class="back iconfont icon-zuojiantou2"></div>

        <div class="img">
          <img :src="Page.operateHeadImg" alt="">
        </div>

        <div @click="showShare = true" class="share iconfont icon-gengduo"></div>
      </div>


    <div class="my_banner">
     

    

      <!-- 分享弹出面版 -->
      <van-share-sheet
        v-model:show="showShare"
        title="立即分享给好友"
        :options="options"
        @select="onSelect"
      />

      <!-- 头像和名字 -->
      <div class="my_name">
        <div class="img">
          <img :src="Page.operateHeadImg" alt="" />


        </div>
        <!-- 名字和id -->
        <div class="my_name_middle">
          <div class="nike_name">{{Page.operateUserName}}</div>
          <div class="my_id">用户号：{{Page.user_id}}</div>
        </div>
      </div>

      <!-- 个人信息 -->
      <div class="my_content">
        <!-- 自我介绍 -->
        <div class="my_introduce">欢迎来访点个关注吧~😋</div>

        <!-- 性别 -->
        <div class="my_sex_age">
          <span class="sex">♀</span>
          <!-- <span class="age">19岁</span> -->
        </div>

        <!-- 底部收藏和编辑 -->
        <div class="my_content_foot">
          <!-- 左边 -->
          <div class="left">
            <div class="li">
              <p>0</p>
              <p>关注</p>
            </div>
            <div class="li">
              <p>98</p>
              <p>粉丝</p>
            </div>
            <div class="li">
              <p>{{Page.praiseAmount+Page.collectionAmount}}</p>
              <p>获赞与收藏</p>
            </div>
          </div>

          <!-- 右边编辑 -->
          <div class="right">
            <!-- 编辑 -->
            <div class="followbox" @click="follow">
              <div class="editable" v-show="!Page.follow">关注</div>
              <div class="editable" style="background-color:transparent;border: 1px solid #fff;" v-show="Page.follow">已关注</div>
            </div>
            <!-- 设置 -->
            <div @click="goinfo(Page.operateUserName)" class="settings iconfont icon-007pinglun"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 笔记 收藏 赞过 -->
    <div class="my_note_collection_liked">
      <div class="my_note_content">
        <van-tabs
          v-model:active="active"
          swipeable
          animated
          title-inactive-color="#808080"
          title-active-color="#2F2F2F"
          offset-top="54px"
          sticky
        >
          <van-tab title="作品">
            <div class="my_content">
              <!-- 左边 -->
              <div class="left" >

                <div v-for="item in Left" :key="item.user_id" class="my_content_item">
                  <!-- 笔记图片 -->
                  <div class="my_note_img" @click="godetails(item.articleId)">
                    <img :src="item.pictures" alt="" />
                  </div>

                  <!-- 笔记标题 -->
                  <div class="my_note_title">
                    {{item.title}}
                  </div>

                  <!-- 笔记作者 -->
                  <div class="author">
                    <!-- 作者头像和名字 -->
                    <div class="avatar_name">
                      <!-- 头像 -->
                      <div class="author_avatar">
                        <img :src="item.operateHeadImg" alt="" />
                      </div>

                      <!-- 名字 -->
                      <div class="author_name">{{item.operateUserName}}</div>
                    </div>

                    <!-- 点赞 (icon-aixin未点赞) (icon-aixin1已点赞)-->
                    <div @click="like(item.articleId)" class="like iconfont icon-aixin" v-show="!item.praise">
                      <div class="num">{{getFilter(item.praiseAmount)}}</div>
                    </div>
                    <div @click="like(item.articleId)" class="like iconfont icon-aixin1" v-show="item.praise">
                      <div class="num">{{getFilter(item.praiseAmount)}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 右边 -->
              <div class="right">

                <div v-for="right_item in Right" :key="right_item.user_id" class="my_content_item">
                  <!-- 笔记图片 -->
                  <div class="my_note_img" @click="godetails(right_item.articleId)">
                    <img :src="right_item.pictures" alt="" />
                  </div>

                  <!-- 笔记标题 -->
                  <div class="my_note_title">
                    {{right_item.title}}
                  </div>

                  <!-- 笔记作者 -->
                  <div class="author">
                    <!-- 作者头像和名字 -->
                    <div class="avatar_name">
                      <!-- 头像 -->
                      <div class="author_avatar">
                        <img :src="right_item.operateHeadImg" alt="" />
                      </div>

                      <!-- 名字 -->
                      <div class="author_name">{{right_item.operateUserName}}</div>
                    </div>

                    <!-- 点赞 (icon-aixin未点赞) (icon-aixin1已点赞) -->
                    <div @click="like(right_item.articleId)" class="like iconfont icon-aixin" v-show="!right_item.praise">
                      <div class="num">{{getFilter(right_item.praiseAmount)}}</div>
                    </div>
                    <div @click="like(right_item.articleId)" class="like iconfont icon-aixin1" v-show="right_item.praise">
                      <div class="num">{{getFilter(right_item.praiseAmount)}}</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </van-tab>
          <van-tab title="收藏">
            <van-empty  description="该博主暂无收藏哦~" />
          </van-tab>

          
        </van-tabs>
      </div>
    </div>

    <!-- 顶部导航组件 -->

  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router"
import { reactive, ref, toRefs } from "vue";
import { Toast } from 'vant';
import 'vant/es/toast/style';
// import { showToast } from 'vant';
export default {
  components: {  },

  setup() {
    let route = useRoute();
    let router = useRouter();
    const active = ref(0);
    const show = ref(false);
    const showPopup = () => {
      show.value = true;
    };

    const showShare = ref(false);
    const options = [
      { name: '微信', icon: 'wechat' },
      { name: '微博', icon: 'weibo' },
      { name: '复制链接', icon: 'link' },
      { name: '分享海报', icon: 'poster' },
      { name: '二维码', icon: 'qrcode' },
    ];

    const onSelect = (option) => {
      // console.log(option);
      showShare.value = false;
      
      Toast(option.name);

    };
    let list = reactive({
        // 所有详情页数据
        Alldata:[],
        // 首页推荐数据
        listdata:[],
        // 首页美妆数据
        HomeMakeupList:[],
        // 首页最新列表数据
        HomeNewList:[],
        // 当前页面数据
        Page:[],
        // 发布的作品数据
        works:[],
        // 左边数组
        Left:[],
        // 右边数组
        Right:[]
    });
    
    // 点赞 传入图文详情页id
    let like =(id)=>{
      // 点击的图文在全部数据所在下标
      let Allindex = list.Alldata.findIndex(item=>item.articleId==id);
      // 首页推荐列表所在下标
      let index=list.listdata.findIndex(item=>item.id==id);
      // 首页美妆列表所在下标
      let index_makeup=list.HomeMakeupList.findIndex(item=>item.articleId==id);
      // 首页最新列表所在下标
      let index_new=list.HomeNewList.findIndex(item=>item.articleId==id);
      if(!list.Alldata[Allindex].praise){
        list.Alldata[Allindex].praise=1
        list.Alldata[Allindex].praiseAmount+=1;
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
      }else if(list.Alldata[Allindex].praise){
        list.Alldata[Allindex].praise=0;
        list.Alldata[Allindex].praiseAmount-=1;
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
    // 关注
    let follow = () =>{
      list.Page.follow=!list.Page.follow;
      // 所有详情页数据
      window.localStorage.setItem("articleDetails",JSON.stringify(list.Alldata));
    }
    //跳转私信页
    let goinfo = (id) =>{
      router.push({
        path:"/private",
        query:{
          id
        }
      })
    }
    // 详情页跳转
    let godetails = (id) =>{
      router.push({
        path:"/Details",
        query:{
          id
        }
      })
    }
    // 初始化
    let created = () =>{
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

        //判断是否有所有详情页数据
        if(window.localStorage.getItem("articleDetails")){
            list.Alldata=JSON.parse(window.localStorage.getItem("articleDetails"));
        }
        // 路由传入id
        let id = route.query.id;
        // 当前页面数据所在数组下标
        let index = list.Alldata.findIndex(item=>item.user_id==id);
        // 当前页面数据
        list.Page=list.Alldata[index];
        // 发布作品数据 将对象存入数组中
        list.works.push(list.Alldata[index]);
        // 切割数组长度向上取整
        let length=Math.ceil(list.works.length/2);
        // 左边数组
        list.Left=list.works.splice(0,length);
        // 右边数组
        list.Right=list.works.splice(-length);
    }
    created();

    // 过滤器
    let getFilter = (value)=>{
       if(value < 10000){
          return value;
        }
        let w = value > 10000?value/10000:value;//万计算
        let y = w > 10000? parseInt(w/10000) +"亿" :parseInt(w) +"万";
        return y;
    }
    return { 
      active, 
      show, 
      showPopup, 
      options,
      onSelect,
      showShare,
      follow,
      goinfo,
      godetails,
      like,
      getFilter,
      ...toRefs(list)
    };
  },
};
</script>

<style lang="scss" scoped>
.authorHomePage {
  .van-empty{
    padding: 40px 0px 117px;
  }
  .my_banner_top {
      background: linear-gradient(#444365, #4A4967);
      position: fixed;
      width: 100%;
      top: 0;
      height: 54px;
      display: flex;
      align-items: center;
      justify-content: space-between;
     
      color: #fff;
      z-index: 3;
      overflow: hidden;
      .img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        transform: translateY(0px);
        img{
          width: 100%;
          height: 100%;
        }
      }
      .iconfont {
        margin: 0 18px;
        font-size: 20px;
        opacity: 0.9;
      }
      .back{
        margin-left: 10px;
      }
    }
  .my_banner {
    padding-top: 54px;
    background: linear-gradient(#444365, #626470);
    .menu_content {
      margin-top: 35px;
      padding: 0 28px;
      .item {
        color: #3a3a3a;
        font-size: 14px;
        height: 50px;
        display: flex;
        align-items: center;
        .iconfont{
          margin-right: 18px;
        }
      }
    }

    .my_name {
      padding-top: 7px;
      padding-left: 16px;
      display: flex;
      .img {
        width: 75px;
        height: 75px;
        position: relative;
        img {
          border-radius: 50%;
          width: 100%;
          height: 100%;
          display: block;
        }
        .add_books {
          position: absolute;
          width: 24px;
          height: 24px;
          background-color: #fee903;
          text-align: center;
          line-height: 24px;
          border-radius: 50%;
          font-size: 10px;
          font-weight: 700;
          bottom: 0;
          right: 0;
        }
      }
      .my_name_middle {
        color: #fff;
        margin-left: 19px;
        .nike_name {
          margin-top: 18px;
          font-size: 19px;
          font-weight: 700;
        }
        .my_id {
          margin-top: 15px;
          font-size: 11px;
          opacity: 0.3;
        }
      }
    }
    .my_content {
      padding-left: 16px;
      padding-bottom: 6px;
      .my_introduce {
        margin-top: 17px;
        color: #fff;
        font-size: 14px;
        opacity: 0.9;
      }
      .my_sex_age {
        margin-top: 12px;
        display: inline-block;
        background-color: rgb(255, 255, 255, 0.1);
        height: 19px;
        line-height: 15px;
        padding: 0px 8px;
        border-radius: 20px;
        .sex {
          font-size: 12px;
          color: #da7fc3;
        }
        .age {
          color: #fff;
          font-size: 11px;
          opacity: 0.9;
          margin-left: 5px;
        }
      }
      .my_content_foot {
        margin-top: 20px;
        display: flex;
        .left {
          display: flex;
          .li {
            font-size: 12px;
            text-align: center;
            opacity: 0.9;
            color: #fff;
            margin-right: 27px;
            p {
              &:last-of-type {
                font-size: 11px;
                margin-top: 6px;
              }
            }
          }
        }
        .right {
          display: flex;
          justify-content: space-between;
          flex: 1;

          .editable {
            width: 86px;
            height: 28px;
            font-size: 13px;
            color: #fff;
            text-align: center;
            line-height: 28px;
            border-radius: 28px;
            opacity: 0.9;
            border: 1px solid #EA3F49;
            margin-left: 10px;
            background-color: #EA3F49;
          }
          .settings {
            width: 40px;
            height: 28px;
            color: #fff;
            text-align: center;
            line-height: 28px;
            border-radius: 25px;
            margin-right: 8px;
            font-size: 18px;
            opacity: 0.9;
            border: 1px solid #fff;
            background-color: rgb(255, 255, 255, 0.1);
          }
        }
      }
    }
  }

  .my_note_collection_liked {
    padding-top: 16px;
    background-color: #616370;
    .my_note_content {
      background-color: #fafafa;
      border-top-right-radius: 9px;
      border-top-left-radius: 9px;
      overflow: hidden;
      .my_content {
        padding: 0 5px;
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #ededed;
        .my_content_item {
          background-color: #fff;
          width: 180px;
          border-radius: 5px;
          margin-top: 5px;
          overflow: hidden;
          .my_note_img {
            width: 100%;
            img {
              width: 100%;
            }
          }
          .my_note_title {        
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            margin-top: 10px;
            line-height: 20px;
            font-size: 14px;
            font-weight: bold;
            padding: 2px 8px 2px 10px;
          }
          .author {
            margin-top: 8px;
            padding: 0 8px;
            padding-bottom: 10px;
            align-items: center;
            display: flex;
            .avatar_name {
              flex: 1;
              display: flex;
              align-items: center;
              .author_avatar {
                width: 18px;
                height: 18px;
                border-radius: 50%;
                overflow: hidden;
                img {
                  width: 100%;
                }
              }
              .author_name {
                width: 94px;
                margin-left: 2px;
                color: #838383;
                font-size: 11px;
                transform: scale(0.9);
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
            .like {
              display: flex;
              color: #7a7a7a;
              .num {
                font-size: 10px;
                margin-left: 4px;
                color: #757575;
                line-height: 15px;
              }
              &.icon-aixin1 {
                color: #fe2842;
              }
            }
          }
        }
      }
    }
  }
}
</style>