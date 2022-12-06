<template>
  <div class="shoppingsearch">
    <!-- 头部搜索 -->
    <div class="search_top">
      <!-- 返回 -->
      <div class="back iconfont icon-zuojiantou" @click="$router.push({name:'shopping'})"></div>
      <!-- <div @click="$router.push({name:'home'})" class="back iconfont icon-zuojiantou"></div> -->
      <!-- 搜索框盒子 -->
      <div class="input_box">
        <div class="icon iconfont icon-sousuo"></div>

        <input type="text" v-model="value" placeholder="刘德华" />
      </div>
      <!-- 搜索 -->
      <div class="cancel" @click="goto">搜索</div>
    </div>

    <!-- 主体 -->
    <div class="search_main">
      <!-- 历史记录 -->
      <div class="history_record" v-show="history.length">
        <div class="title">
          历史记录
          <!-- 删除 -->
          <div @click="del" class="delete iconfont icon-shanchu"></div>
        </div>

        <div class="ul">
          <div @click="pushValue(item)" class="li" v-for="(item,index) in history" :key="index">{{item}}</div>
        </div>
      </div>

      <!-- 猜你想搜 -->
      <div class="want_search">
        <div class="title">
          猜你想搜
          <!-- 换一换 -->
          <div class="change_it">
            <span class="iconfont icon-shuaxin" @click="radom"></span>
            换一换
          </div>
        </div>
        <div class="ul">
          <div class="li" v-for="item in guessList" :key="item.commodityId" @click="pushValue(item.brandName)">{{item.brandName}}</div>
          <!-- <div class="li">华为15级工资</div>
          <div class="li">朴宰范</div>
          <div class="li">余文乐</div> -->
        </div>
      </div>
    </div>

    <!-- 常用分类 -->
    <div class="category">
      <div class="title">常用分类</div>

      <div class="list">
          <div class="li" @click="goNav(item.seriesId)" v-for="item in allSortList" :key="item.seriesId">
            <div class="img">
              <img :src="item.imgUrl" alt="" />
            </div>
            <div class="text">{{item.name}}</div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import {useRouter} from "vue-router"
import {getAllSort} from "../api/shopping"
import {Toast} from "vant";
import 'vant/es/toast/style';

export default {
  setup() {

    const router = useRouter()
    // 声明变量
    let list = reactive({
      goodDetailList:[],  //商品详情数组
      value:"",  //搜索关键字
      allSortList:null,  //分类数组
      history:[],  //历史记录
      guessList:[]
    })

    // 调用分类数据
    let getAllSortFun = ()=>{
      getAllSort().then(data =>{
        // console.log(data);
        // 分类数组
        list.allSortList = data.data[0].childs.splice(0,8);
        // console.log(list.allSortList);
      })
    }
    // 调用方法
    getAllSortFun();

    // 初始化判断
    let created = () => {
      // 判断是否有历史记录
      if (JSON.parse(window.localStorage.getItem("searchHistory"))) {
        list.history = JSON.parse(
          window.localStorage.getItem("searchHistory")
        );
      }
      // 判断是否有商品详情数组
      if(window.localStorage.getItem("goodDetailList")){
        list.goodDetailList = JSON.parse(window.localStorage.getItem("goodDetailList"));

        list.guessList = list.goodDetailList.slice(0,4);
        console.log(list.guessList);
      }
    };
    // 调用方法
    created();
    // 换一换
    let radom = ()=>{
      let i= parseInt(Math.random()*16);
      list.guessList = list.goodDetailList.slice(i,i+4)
    }
    //删除历史记录
    let del = ()=>{
      list.history = [];
       window.localStorage.setItem(
        "searchHistory",
        JSON.stringify(list.history)
      );
    }

    // 历史记录
    let pushValue = (value) =>{
      list.value = value;
      goto()
    }

    //跳转分类详情方法
    let goNav = (id)=>{
      // console.log(id);
      router.push({
        path:"/navigation",
        query:{
          id
        }
      })
    } 

    // 搜索
    let goto = () => {

      if (list.value != '') {
        list.history = list.history.filter(item =>item!=list.value)
        list.history.unshift(list.value)
        window.localStorage.setItem("searchHistory",JSON.stringify(list.history))
      }

      // console.log(list.value);
      if(list.value == ""){
        Toast("请输入搜索内容");
        return
      }

      router.push({
        name:"categoryList",
        query: {
          data: list.value,
        },
      });

      list.value = "";
    };

    return {
      ...toRefs(list),
      goto,
      getAllSortFun,
      del,
      pushValue,
      goNav,
      radom
    };
  },
};
</script>

<style lang="scss" scoped>
.shoppingsearch {
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
      font-size: 15px;
      overflow: hidden;
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

  .search_main {
    padding: 0 16px;
    .history_record {
      margin-top: 20px;
      .title {
        font-size: 14px;
        color: #323232;
        font-weight: 500;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .delete {
          color: #9f9f9f;
          font-size: 18px;
        }
      }
      .ul {
        margin-top: 14px;
        display: flex;
        flex-wrap: wrap;
        .li {
          margin-bottom: 7px;
          border: 1px solid #f3f3f3;
          padding: 7px 12px;
          border-radius: 22px;
          font-size: 12px;
          color: #323232;
          margin-right: 12px;
        }
      }
    }
    .want_search {
      font-size: 14px;
      margin-top: 20px;
      .title {
        color: #3a3a3a;
        display: flex;
        justify-content: space-between;
        display: flex;
        align-items: center;
        .change_it {
          span {
            margin-right: 5px;
            font-size: 12px;
            transform: rotate(-45deg);
            display: inline-block;
          }
          font-size: 12px;
          color: #a2a2a2;
        }
      }
      .ul {
        display: flex;
        flex-wrap: wrap;
        .li {
          width: 50%;
          margin-top: 20px;
          font-size: 12px;
          color: #363636;
        }
      }
    }
  }

  .category {
    border-top: 7px solid #f9f9f9;
    margin-top: 20px;
    padding: 0 16px;
    .title {
      font-size: 13px;
      color: #353535;
      margin-top: 14px;
    }
    .list {
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .li {
        height: 75px;
        width: 25%;
        margin-bottom: 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: #f7f7f7;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        .text {
          font-size: 12px;
          color: #353535;
          text-align: center;
          margin-top: 14px;
        }
      }
    }
  }
}
</style>