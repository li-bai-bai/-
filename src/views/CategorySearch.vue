<template>
  <div class="category_search">
    <div class="search">
      <form action="/">
        <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
          autocomplete="off"
          action-text="取消"
        />
      </form>
    </div>

    <div class="content">

      <div class="item" v-for="item in categoryList" :key="item.seriesId">
        <div class="item_title">{{item.name}}</div>

        <div class="item_list">
          <div v-for="small in item.childs" :key="small.seriesId" class="item_li" @click="goNav(small.seriesId)">
            <div class="img">
              <img :src="small.imgUrl" alt="" />
            </div>
            <div class="text">{{small.name}}</div>
          </div>
        </div>
      </div>

       <div class="item">
        <div class="item_title">服务</div>

        <div class="item_list">
          <div  class="item_li">
            <!-- 跳转鉴别页面 -->
            <router-link custom to="/identify" v-slot="{ href, navigate, isActive }">
              <div :href="href" @click="navigate" :class="['img', isActive && 'router-link-active']">
                <img src="../assets/img/R-C.jpg" style="margin-top: -5px" alt="" />
              </div>
            </router-link>
            
            <div class="text">鉴别</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { Toast } from "vant";
import { useRouter } from 'vue-router'
import {getAllSort} from "../api/shopping"
import "vant/es/toast/style";
export default {
  setup() {
    // 获取vue-router对象
    let router = useRouter()
    // 变量
    const list = reactive({
      value:"",
      categoryList:null
    })
    // 跳转分类详情
    let goNav = (id)=>{
      router.push({
        path:"/navigation",
        query:{
          id
        }
      })
    }
    const onSearch = (val) => {
      if(val == ""){
        Toast("请输入内容")
        return 
      }
      
    };
    const onCancel = () => {
      // Toast("取消");
      router.go(-1);
    };
    // 调用全部分类数据
    let getAllSortFun = ()=>{
      getAllSort().then(data =>{
        console.log(data);
        list.categoryList = data.data
      })
    }
    // 调用方法
    getAllSortFun();

    return {
      ...toRefs(list),
      onSearch,
      onCancel,
      getAllSortFun,
      goNav
    };
  },
};
</script>

<style lang="scss" scoped>
.category_search {
  .search {
    border-bottom: 1px solid #fafafa;
    background-color: #fff;
  }

  .content {
    padding: 0 15px;
    .item {
      margin-top: 27px;
      &:last-child{
        // margin-bottom: 50px;
        padding-bottom: 50px;
        box-sizing: border-box;
      }
      .item_title {
        color: #212121;
        font-size: 14px;
      }
      .item_list {
        display: flex;
        flex-wrap: wrap;
        .item_li {
            margin-top: 28px;
            width: 25%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          .img {
            width: 55%;
            border: 1px solid rgb(235, 232, 232);
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
          .text {
            text-align: center;
            color: #2d2d2d;
            font-size: 12px;
            margin-top: 20px;
          }
        }
      }
    }
  }
}
</style>