<template>
    <div class="navigation" v-if="navItem">
    <van-sticky>
      <div class="top">
        <div class="inp">
          <span class="iconfont icon-sousuo"></span>
          <input type="text" v-model="title" @keyup.enter="search" placeholder="搜索品牌、分类、商品名">
        </div>
        <p @click="$router.go(-1)">取消</p>
      </div>
    </van-sticky>
    <van-sticky :offset-top="55">
      <ul class="uls">
        <li @click="num(1)" :class="{ con: i == 1 }">综合</li>
        <li @click="num(2)" :class="{ con: i == 2 }">销量</li>
        <li @click="price(3)" :class="{ con: i == 3 }">
          价格
          <span :class="['span1', { con: i == 3 && oby }]"></span>
          <span :class="['span2', { con: i == 3 && !oby }]"></span>
        </li>
      </ul>
    </van-sticky>
    <!-- 商品展示列表 -->
    <div class="buyItem">
      <ul>
        <li v-for="item in navItem" :key="item.singleId" @click="shop(item.commodityId)">
          <!-- 正常产品 -->
          <div>
            <div class="img">
              <img :src="item.imgUrl" alt="" />
            </div>
            <div class="title">
              <p>
                {{ item.brandName }} {{ item.commodityName }}
                {{ item.standardValue }}
              </p>
            </div>
            <p class="small">{{ item.standardValue }}</p>
            <div class="price">
              <span class="red"><i>￥</i>{{ parseInt(item.price) }}</span>
            </div>
            <div class="num">{{ item.payPersons }}人付款</div>
          </div>
        </li>
      </ul>
    </div>

    <!-- 搜索商品为空 -->
    <van-empty description="请重新输入搜索内容喔" v-if="navItem.length == 0" />
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { getAllSortDetail } from "../api/shopping.js";
import {useRoute,useRouter} from "vue-router"
// import { watch } from '@vue/runtime-core';
export default {
    setup() {
        // 获取路由参数
        let route = useRoute();
        // 获取路由对象
        let router = useRouter();
        // 变量
        let list = reactive({
            i:1,
            oby:false,   //价格
            // 搜索数组
            navItem:null,
            bfItem:null,
            // 输入框的值
            title:""

        })

        // 定义初始化
        let created = ()=>{
            // 获取分类商品详情内容
            getAllSortDetail().then(data =>{
                let id = route.query.id;
                list.navItem = data.item.filter((item) => item.seriesId == id);
                console.log(list.navItem);
                list.bfItem = list.navItem[0].items;
                list.navItem = list.navItem[0].items;
            })
        }
        created();

        //综合销量排序
        let num = (i)=>{
            list.i = i;
            let arr = [];
            list.bfItem.forEach((item) => {
                arr.push(item);
            });
            if (i == 1) {
                list.navItem = list.bfItem;

            } else if (i == 2) {// 销量
                // 销量降序
                arr.sort((a, b) => {
                return b.payPersons - a.payPersons;
                });
                list.navItem = arr;
            }
        }

        // 价格排序
        let price = (i)=>{
            list.i = i;
            list.oby = !list.oby;
            let arr = [];
            list.bfItem.forEach((item) => {
                arr.push(item);
            });
            
            if (list.oby == true) {// 升序
                arr.sort((a, b) => {
                return a.price - b.price;
                });
                list.navItem = arr;
            
            }else if(list.oby == false){// 降序
                arr.sort((a, b) => {
                return b.price - a.price;
                });
                list.navItem = arr;
            }
        }

        // 搜索框
        let search = ()=>{
            if(list.title ==''){
               list.navItem = list.bfItem;
            }else{
                //过滤  
              list.navItem=list.bfItem.filter(item => item.brandName.includes(list.title) || item.commodityName.includes(list.title ) )
            }

        }

        // 跳转商品详情数据
        let shop = (id)=>{
            router.push({
              path:"/goodsdetails",
              query:{
                id
              }
            })
        }

        

        return {
            ...toRefs(list),
            num,
            price,
            shop,
            search
        }
    },

}
</script>


<style lang="scss" scoped>
.navigation {
  min-width: 375px;
  max-width: 750px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  .top {
    padding: 0 14px;
    height: 55px;
    background-color: #fff;
    line-height: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .inp {
      display: flex;
      align-items: center;
      background-color: #f2f3f5;
      border-radius: 6px;
      height: 37px;
      line-height: 37px;
      width: 86%;
      input{
        border: none;
        height: 35px;
        background-color: #f2f3f5;
        font-size: 14px;
        &::-webkit-input-placeholder{
            font-size: 13px;

        }
      }
      span {
        margin: 0 11px;
        font-size: 22px;
        color: #b5b5b5;
      }
      
    }
    p {
      font-size: 14px;
      color: #383838;
    }
  }
  .uls {
    margin-top: -1px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 37px;
    background-color: #fff;
    li {
      font-size: 14px;
      font-weight: bold;
      color: #3c3c3c;
      &.con {
        color: #ee1733;
      }
      &:last-of-type {
        position: relative;
        .span1 {
          content: "";
          position: absolute;
          right: -15px;
          bottom: 9px;
          width: 0;
          height: 0;
          border: 4px solid transparent;
          border-bottom: 5px solid #a9a9a9;
          &.con {
            border-bottom: 5px solid #ee1733;
          }
        }
        .span2 {
          content: "";
          position: absolute;
          right: -15px;
          bottom: -3px;
          width: 0;
          height: 0;
          border: 4px solid transparent;
          border-top: 5px solid #a9a9a9;
          &.con {
            border-top: 5px solid #ee1733;
          }
        }
      }
    }
  }
  .buyItem {
    background-color: #fff;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 10px;
      padding-bottom: 30px;
      li {
        height: 270px;
        border: 1px solid #e8e8ea;
        width: 48%;
        margin-right: 7px;
        margin-top: 7px;
        background-color: #fff;
        position: relative;
        &:nth-child(2n) {
          margin-right: 0;
        }
        .img {
          width: 134px;
          height: 136px;
          margin: 0 auto;
          margin-top: 10px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .title {
          margin-top: 10px;
          font-size: 12px;
          padding-left: 10px;
          p {
            font-weight: bold;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .small {
          font-weight: bold;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          transform: scale(0.7);
          color: #9a9a9a;
          font-weight: normal;
          margin-top: 10px;
          margin-left: -19px;
        }
        .price {
          padding-left: 8px;
          margin-top: 10px;
        position: absolute;
            bottom: 35px;
            left: -4px;
          .red {
            font-size: 14px;
            font-weight: bold;
            color: #ef2f48;
            i {
              font-style: normal;
              transform: scale(0.6);
            }
          }
          
        }
        .num {
          color: #777777;
          font-size: 14px;
          transform: scale(0.8);
          margin-top: 10px;
          margin-left: -11px;
              position: absolute;
            bottom: 10px;
            left: 11px;
        }
        .bg {
          position: absolute;
          top: 0;
          left: 0;
        }
        .small_img {
          position: absolute;
          top: 10%;
          left: 50%;
          width: 154px;
          margin-left: -77px;
        }
        
      }
    }
  }
}
</style>