<template>
  <div class="categoryList">
    <!-- 头部搜索 -->
    <div class="search_top">
      <!-- 返回 -->
      <div class="back iconfont icon-zuojiantou" @click="$router.back()"></div>
      <!-- 搜索框盒子 -->
      <div class="input_box">
        <div class="icon iconfont icon-sousuo"></div>
        <input type="text" v-model="value" placeholder="刘德华" />
      </div>
      <div class="cancel" @click="pushValue">搜索</div>

    </div>

    <!-- 排序头部 -->
    <div class="main_content">

      <div class="content_title">
   
        <div @click="num(0)" :class="['item',active==0?'active':'']">综合</div>
        <div @click="num(1)" :class="['item',active==1?'active':'']">最新</div>
        <div @click="num(2)" :class="['item',active==2?'active':'']">最热</div>
       
      </div>




      <!-- 列表 -->
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

      <!-- 搜索为空 -->
      <van-empty description="没有此搜索内容"  v-if="listdata.length == 0 " />

    </div>
  </div>
</template>

<script>
import { reactive, toRefs,onBeforeMount } from "vue";
import {useRoute,useRouter } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    let router = useRouter();
    let list = reactive({
      // 输入框
        value:'',
        // 下标
        active:0,
        // 搜索历史记录数组
        history:[],
        // 搜索笔记数据
        listdata:[],
        // 搜索笔记数据拷贝
        listdataCopy:null
    })
    // 点击切换
    let num =  (i)=>{
      //下标赋值
      list.active = i;
      // 定义空数组
      let arr = JSON.parse(JSON.stringify(list.listdataCopy));
      if( i == 0){
         list.listdata  = list.listdataCopy;
      }else if( i == 1){
        // 热度降序
        if(list.listdata.length > 1){
          arr.sort((a,b)=>{
          return a.note_card.interact_info.liked_count - b.note_card.interact_info.liked_count
        });
        list.listdata = arr;
        }
        list.listdata  = list.listdataCopy;
        console.log(list.listdata);
      }
    }
    // 初始化判断
    let created = () => {
      // 判断是否有历史记录
      if (JSON.parse(window.localStorage.getItem("homeSearchHistory"))) {
        list.history = JSON.parse(
          window.localStorage.getItem("homeSearchHistory")
        );
      }

      // 判断是否有首页笔记数据
      if(JSON.parse(window.localStorage.getItem("listdata"))){
        let arr  = JSON.parse(window.localStorage.getItem("listdata"));
        list.listdata  = arr.filter(item => item.note_card.display_title.includes(route.query.data) || item.note_card.user.nick_name.includes(route.query.data))
        list.listdataCopy = arr.filter(item => item.note_card.display_title.includes(route.query.data) || item.note_card.user.nick_name.includes(route.query.data))
      }
      // console.log(list.listdata);
    };
    // 调用方法
    created();

    // 跳转详情页
    let getArticleDetailFun = (id)=>{
      router.push({
        path:"/Details",
        query:{
          id
        }
      })
    }

    onBeforeMount(() => {
        // console.log(route.query.data);
        list.value = route.query.data
    })
    // 历史记录
    let pushValue = ()=>{
      if (list.value.trim()!='') {
        list.history = list.history.filter(item =>item!=list.value)
        list.history.unshift(list.value)
        window.localStorage.setItem("homeSearchHistory",JSON.stringify(list.history))

        let arr  = JSON.parse(window.localStorage.getItem("listdata"));
        list.listdata = arr.filter(item => item.note_card.display_title.includes(list.value) || item.note_card.user.nick_name.includes(list.value))
      // console.log(arr);
      }
      // console.log(list.listdata);
      // console.log(list.value);
    }

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
      ...toRefs(list),
      pushValue,
      getFilter,
      num,
      getArticleDetailFun

    };
  },
};
</script>

<style lang="scss" scoped>
.categoryList {
  .search_top {
    padding-left: 10px;
    padding-right: 15px;
    padding-top: 14px;
    display: flex;
    align-items: center;
    .back {
      font-size: 24px;
      margin-right: 4px;
      color: #666;
    }
    .input_box {
      flex: 1;
      height: 31px;
      border-radius: 18px;
      background-color: #f6f6f6;
      display: flex;
      align-items: center;
      overflow: hidden;
      font-size: 15px;
      .icon {
        font-size: 20px;
        color: #a6a6a6;
        margin-left: 10px;
        margin-right: 8px;
      }
      input {
        border: none;
        flex: 1;
        background-color: #f6f6f6;
        font-size: 12px;
        line-height: 29px;
      }
    }
     .cancel {
      margin-left: 8px;
      font-size: 14px;
      color: #a4a4a4;
    }
   
  }
  .main_content {
    margin-top: 20px;
    .content_title {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      border-top: 1px solid #f5f5f5;
      border-bottom: 1px solid #f5f5f5;
      position: sticky;
      top: 0;
      background-color: #fff;
      z-index: 1;
      height: 50px;
      .item {
        font-size: 13px;
        color: #323232;
        position: relative;
       &.active{
        color: #FF2744;
       }
      
      }
    }
    .content{
      display: flex;
      // flex-wrap: wrap;
      // justify-content: space-between;
      height: 3750px; 
      flex-flow: column wrap; 
      // height: 100vh;
      // background: #f9f9f9;
      background: #f6f6f6;
      padding: 0 3px;
      .article{
        width: 49.5%;
        border-radius:4px;
        overflow: hidden;
        margin-top: 5px;
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
  }



}
</style>