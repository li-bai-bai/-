<template>
  <van-loading type="spinner" class="loading" v-show="pageLoading" />
  <div class="shopping" >
    <!-- 导航栏 -->
    <div class="nav">
      <div class="left">
        <div @click="Car" class="icon iconfont icon-gouwuche1" style="margin-right:12px;"></div>
        <div class="icon iconfont icon-dingdan" @click="Order" style="font-size:18px;"></div>
      </div>
      <div class="search" @click="To">
        <div class="search_icon iconfont icon-sousuo"></div>
        <p>手链红色</p>
      </div>
      <div class="right">
        <div class="icon iconfont icon-gengduo1"></div>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" lazy-render indicator-color="#ff2744">
        <van-swipe-item v-for="(item,index) in silder" :key="index">
          <div class="imgbox">
            <img  :src="item" alt="">
          </div>
        </van-swipe-item>
        <!-- <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item> -->
      </van-swipe>
    </div>
    <!-- 分类 -->
    <!-- navigation -->
    <div class="categorize" v-show="!pageLoading">
      <ul>
        <li v-for="item in allSortList" :key="item.seriesId" @click="goNav(item.seriesId)" >
          <div class="imgbox" >
            <img :src="item.imgUrl"  alt="">
          </div>
          <p>{{item.name}}</p>
        </li>
        <router-link custom to="/categorySearch" v-slot="{href, navigate, isActive}">
          <li :href="href" @click="navigate" :class="[isActive && 'router-link-active']">
            <div class="imgbox">
              <img src="../assets/img/move.png" alt="">
            </div>
            <p>全部</p>
          </li>
        </router-link>
      </ul>
    </div>

    <!-- 下拉加载 -->
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      
    
      <!-- 商品 -->
      <div class="shop" v-show="!pageLoading" :style="'height:'+height+'px;'">

        <div class="box" v-for="item in productList"  :key="item.commodityId" @click="goodDetail(item.commodityId)">
          <div class="imgbox">
            <img class="auto-img" :src="item.currentSingleProduct.goodsImgs[0].imgUrl"  alt="">
          </div>
          <div class="content">
            <div class="title">{{item.name}}{{item.currentSingleProduct.value}}  {{item.brandName}}</div>
            <div class="price"><span>￥</span>{{item.currentSingleProduct.price}}</div>
          </div>
        </div>

      </div>

    </van-list>

    <nav-bar></nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { useRouter } from 'vue-router'
import {getShop,getAllSort,getGoodDetail} from "../api/shopping"
import { reactive, toRefs } from '@vue/reactivity'

export default {
  components: { NavBar },
  setup () {
    // 路由配置 获取vue-router对象
    let router=useRouter();
    // 跳转路由设置
    let Car=()=>{
      router.push("/car")
    }
    let To=()=>{
      router.push("/shoppingsearch")
    }
    let Order=()=>{
      router.push("/order")
    }

    let list = reactive({
      // 轮播图数据
      silder:null,
      // 商品列表数据：
      productList:null,
      // 商品分类数据
      allSortList:null,
      // 商品详情数据
      goodDetailList:[],
      // 加载按钮开关
      pageLoading:true,
      // 下拉加载按钮
      loading:false,
      // 下拉加载完成按钮
      finished:false,
      // 加载按钮
      load:true,
      //初始化长度
      index:6,
      // 初始化高度
      height:0
    })
    // 跳转商品详情的方法
    let goodDetail = (id) =>{
      // console.log(id);

      router.push({
        path:"/goodsdetails",
        query:{
          id
        }
      })
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

    // 下拉加载的方法
    const onLoad = ()=>{
      // 异步更新数据

      setTimeout(()=>{

      // 请求接口
      getGoodDetail().then(data =>{
        for(let i = 0;i < 2; i++){
          list.index += 2 ;
          list.productList = data.shop.slice(0,list.index);

        }

        created();

        // 加载状态结束
        list.loading = false;
        // 数据全部加载完成
        if(list.productList.length >= 28){
          list.finished = true;
        }
      })

      },1500)

    }

    // 初始化
    let created = ()=>{
      list.height = Math.ceil(list.productList.length / 2)*278
    }
    

    let getShopFun = ()=>{
      // 调用获取轮播图
      getShop().then(data =>{
        // console.log(data);
        list.silder = data.silder;

        return getGoodDetail()
        // 调用获取商品数据方法
      }).then(data =>{
        // 商品列表数据
        list.productList = data.shop.slice(0,6);

        created();
        
        // 商品详情数据
        list.goodDetailList = data.shop;

        // 商品排行榜数组
        list.rankList = JSON.parse(JSON.stringify(data.shop));

        // 数组的降序排列
        list.rankList.sort((a,b)=>{
          return b.payPersons - a.payPersons
        })

        // console.log(list.rankList,"商品排行榜数组");
        window.localStorage.setItem("rankList",JSON.stringify(list.rankList));

        // 数据持久化
        window.localStorage.setItem("goodDetailList",JSON.stringify(list.goodDetailList));

        return getAllSort();
        // 分类
      }).then(data =>{
        // console.log(data.data[0].childs);
        
        // 分类数组
        list.allSortList = data.data[0].childs.splice(0,9);
        // console.log(list.allSortList);
        // 关闭加载状态
        list.pageLoading = false;

      })

    }
    // 调用方法
    getShopFun();
    return {
      ...toRefs(list),
      Car,
      To,
      Order,
      getShopFun,
      goodDetail,
      onLoad,
      goNav
    
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
.shopping{
  background-color: #f7f7f7;
  .nav{
    position: sticky;
    top: 0;
    background-color: #f7f7f7;
    z-index: 999;
    height: 30px;
    padding: 14px 11px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
      display: flex;
    }
    .icon{
      width: 20px;
      height: 20px;
      font-size: 20px;
      color: #000;
      // font-weight: bold;
      // background-color: teal;
    }
    .search{
      flex: 1;
      height: 100%;
      background-color: #fff;
      border-radius: 15px;
      margin: 0 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      .search_icon{
        width: 14px;
        margin-top: -2px;
        font-size: 20px;
        // background-color: brown;
        margin-right: 7px;
      }
      p{
        font-size: 14px;
      }
    }
  }
  .banner{
    padding: 0 11px;
    height: 123px;
    margin-bottom: 14px;
    .imgbox{
      width: 100%;
      height: 123px;
    }
    .my-swipe .van-swipe-item {
    width:100%;
    color: #fff;
    font-size: 20px;
    line-height: 123px;
    text-align: center;
    // background-color: #39a9ed;
    border-radius: 5px;
    overflow: hidden;

    img{
      width: 100%;
    }
  }
  }
  .categorize{
    padding: 0 11px; 
    margin-bottom: 14px;
    ul{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li{
        width: 17%;
        // height: 74px;
        margin-bottom: 10px;
        .imgbox{
          width: 100%;
          // height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          // box-shadow: 0 0 2px #eee;
          img{
            width: 95%;
            // height: 100%;
          }
        }
        p{
          margin-top: 3px;
          font-size: 12px;
          text-align: center;
          height: 19px;
          line-height: 19px;
        }
      }
    }
  }
  .shop{
    padding: 0 4px;
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
    // height: 3860px;
    flex-flow: column wrap;
    .box{
      width: 181px;
      // height: 270px;
      background-color: #fff;
      border-radius: 4px;
      margin-bottom: 5px;
      overflow: hidden;
      .imgbox{
        width: 100%;
        // height: 183px;
      }
      .content{
        padding: 10px 15px;
        .title{
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-weight: bold;
          font-size: 13px;
          line-height: 20px;
          margin-bottom: 15px;
        }
        .price{
          font-size:15px;
          display: flex;
          align-items: flex-end;
          .old{
            color: #999;
            font-size: 12px;
            text-decoration: line-through;
            margin-left: 8px;
            margin-bottom: 1px;
            span{
              font-size: 12px;
            }
          }
          span{
            font-size: 13px;
          }
        }
      }
    }
  }
}
</style>