<template>
  <div class="categoryList">
    <!-- 头部搜索 -->
    <div class="search_top">
      <!-- 返回 -->
      <div class="back iconfont icon-zuojiantou" @click="$router.back()"></div>
      <!-- 搜索框盒子 -->
      <div class="input_box">
        <div class="icon iconfont icon-sousuo"></div>

        <input type="text" v-model="value2" placeholder="刘德华" />
      </div>
      <!-- 搜索 -->
      <div class="cancel">搜索</div>
    </div>

    <!-- 排序头部 -->
    <div class="content">

      <div class="content_title">
        <div class="itme">
          <!-- 综合 -->
          <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" @change="search" />
          </van-dropdown-menu>
        </div>
        <!-- <div :class="['item',{'conItem':itemIndex == 0}]">销量</div>
        <div :class="['item',{'conItem':itemIndex == 1}]">自营</div> -->
        <div class="item">
          <!-- 筛选icon -->
          <span @click="showPopup" class="filter_icon iconfont icon-shaixuan"></span>
          <!-- 筛选按钮 -->
          <van-cell @click="showPopup">筛选</van-cell>
          <van-popup
            v-model:show="show"
            position="right"
            :style="{ height: '100%', width: '335px' }"
          >
            <!-- 筛选条件内容 -->
            <div class="filter_content">
              <!--价格区间  -->
              <div class="price_range">
                <div class="filter_title">价格区间</div>

                <div class="range">
                  <!-- 最低 -->
                  <div class="minimum">
                    <input type="number" name="" v-model="lowvalue" placeholder="最低价" />
                  </div>

                  <span class="line"></span>

                  <div class="maximum">
                    <!-- 最高 -->
                    <input type="number" name="" v-model="hightvalue" placeholder="最高价" />
                  </div>
                </div>
              </div>

              <!-- 小红书服务 被选中样式 active-->
              <div class="self">
                <div class="self_title">小红书服务</div>
                <div class="self_">
                  <div :class="['self_item',{'active':selfId == 1}]" @click="selfId = 1">自营</div>
                </div>
              </div>

              <!-- 品牌 -->
              <div class="self">
                <div class="self_title">品牌</div>
                <div class="self_">
                  <div :class="['self_item',{'active':indexId === index}]" @click="brand(index,item.brandName)" v-for="(item,index) in goodDetailList" :key="item.brandId">{{item.brandName}}</div>
                </div>
              </div>

            </div>
            <!-- 清空 完成 -->
            <div class="footer">
                <div class="empty" @click="clear">清空</div>
                <div class="finish" @click="finish">完成
                  <div class="nums">
                    ({{leftList.length + rightList.length}}件商品)
                  </div>
                </div>
            </div>
          </van-popup>
        </div>
      </div>

      <!-- 商品列表 -->
      <div class="goods_list" v-if="leftList.length > 0 || rightList.length > 0">

        <!-- 左边商品 -->
        <div class="left_goods">
          <div @click="goDetail(item.commodityId)" class="item" v-for="item in leftList" :key="item.commodityId">
            <!-- 图片 -->
            <div class="goods_img">
              <img :src="item.currentSingleProduct.goodsImgs[0].imgUrl" alt="">
            </div>
            <!-- 描述 -->
            <div class="goods_text">
              <!-- name -->
              <div class="goods_title">{{item.brandName}}  {{item.name}}{{item.currentSingleProduct.value}}</div>
               <!-- 价格 -->
               <div class="goods_price">
                <div class="new_price">￥{{item.currentSingleProduct.price}}</div>
                <div class="kill_price">￥{{item.currentSingleProduct.originalPrice}}</div>
               </div>
                <!-- 两件打折 -->
               <span class="discount">
                {{item.payPersons}}人付款
               </span>
               <!-- 店铺 -->
               <div class="store">
                {{item.brandName}}旗舰店 <span class="iconfont icon-youjiantou1"></span>
               </div>
            </div>

          </div>

        </div>

        <!-- 右边商品 -->
        <div class="right_goods">
          <div @click="goDetail(item.commodityId)" class="item" v-for="item in rightList" :key="item.commodityId">
            <!-- 图片 -->
            <div class="goods_img">
              <img :src="item.currentSingleProduct.goodsImgs[0].imgUrl" alt="">
            </div>
            <!-- 描述 -->
            <div class="goods_text">
              <!-- name -->
              <div class="goods_title">{{item.brandName}}  {{item.name}}{{item.currentSingleProduct.value}}</div>
               <!-- 价格 -->
               <div class="goods_price">
                <div class="new_price">￥{{item.currentSingleProduct.price}}</div>
                <div class="kill_price">￥{{item.currentSingleProduct.originalPrice}}</div>
               </div>
                <!-- 两件打折 -->
               <span class="discount">
                {{item.payPersons}}人付款
               </span>
               <!-- 店铺 -->
               <div class="store">
                {{item.brandName}}旗舰店 <span class="iconfont icon-youjiantou1"></span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 商品为空的时候 -->
      <van-empty description="搜索结果为空" v-if="leftList.length ==  0 && rightList.length == 0" />
    </div>
  </div>
</template>

<script>
import { onBeforeMount, reactive, toRefs } from "vue";
import {useRoute,useRouter } from "vue-router";
export default {
  setup() {
    // 获取路由参数
    const route = useRoute();
    // 路由配置 获取vue-router对象
    let router= useRouter();
    //声明变量
    let list = reactive({
      // 导航条选中下标
      itemIndex:0,
      // 综合弹出框选择列表
      value1:0,
      // 搜索框的值
      value2:"",
      // 最低价输入框
      lowvalue:"",
      // 最高价输入框
      hightvalue:"",
      // 筛选弹出层按钮
      show:false,
      //所有商品详情数组
      goodDetailList:[],
      // 搜索商品的数组
      searchList:[],
      // 搜索商品数组的拷贝数组
      searchListCopy:[],
      // 搜索商品数组的拷贝筛选数组
      searchListCopyTwo:[],
      // 搜索商品数组的拷贝清空数组
      searchListCopyThree:[],
      // 左边商品的数组
      leftList:[],
      // 右边的商品的数组
      rightList:[],
      // 筛选品牌下标
      indexId:"",
      // 筛选品牌名字
      brandName:"",
      // 筛选自营下标
      selfId:"",
      // 触发筛选事件
      finishFlag:0
    })
    // 综合按钮
    let option1 = [
      { text: "综合", value: 0 },
      { text: "价格升序", value: 1 },
      { text: "价格降序", value: 2 },
      { text: "销量升序", value: 3 },
      { text: "销量降序", value: 4 },
    ];
    // 筛选弹出层
    let showPopup = () => {
      list.show = true;
    };

    // 筛选品牌名字
    let brand = (index,brandName)=>{
      //选中品牌下标
      list.indexId = index;
      // 选中品牌名字
      list.brandName = brandName;
      console.log(list.brandName);
    }

    // 初始化
    let created = ()=>{
      if(window.localStorage.getItem("goodDetailList")){
        list.goodDetailList = JSON.parse(window.localStorage.getItem("goodDetailList"));
      }
    }
    created();

    // 筛选数组
    let finish = ()=>{
      console.log(list.hightvalue,list.lowvalue);
      list.finishFlag = 1;
      list.show = false;

      if(list.brandName != "" && list.lowvalue != "" && list.hightvalue != "" && list.finishFlag == 1){
        list.searchList = list.searchListCopyTwo.filter(item =>{
          if(list.lowvalue <= item.currentSingleProduct.price && item.currentSingleProduct.price <= list.hightvalue && item.brandName == list.brandName ){
              return item
          }
        })
      }
      // console.log(list.searchListCopyTwo);
      console.log(list.searchList);
      
      split();
    }
    // 清空
    let clear = ()=>{
      list.finishFlag = 0;
      list.selfId = list.brandName = list.indexId = list.hightvalue = list.lowvalue = "",
      // 赋值数组
      list.searchList = list.searchListCopyThree;
      split();

      


    }

    // 根据条件切割数组
    let split = ()=>{
      if(list.searchList.length >= 0){

        if(list.value1 == 0){
          // 综合排序操作

          // // 分割数组长度
          // let length = Math.ceil(list.searchList.length / 2);
          // // 左边的数组
          // list.leftList = list.searchList.splice(0,length);
          // // 右边的数组
          // list.rightList = list.searchList.splice(-length);

          list.leftList = [];
          list.rightList = [];
          // 切割数组
          for(let i = 0 ; i<list.searchList.length;i++){

            if( i == 0 || i%2 == 0){
              list.leftList.push(list.searchList[i]);
              // console.log(i);
            }else if( i % 2 != 0){
              list.rightList.push(list.searchList[i]);
              // console.log(i,"奇数");
            }
          }
          
        }else if(list.value1 == 1){
          // 价格升序操作
          list.searchList = [];
          console.log(list.searchListCopy);
          // 价格升序
          for(let i = 0; i < list.searchListCopy.length - 1 ; i++ ){
              for(let j = 0; j < list.searchListCopy.length - 1 - i; j++ ){
                if( parseInt(list.searchListCopy[j].currentSingleProduct.price) > parseInt(list.searchListCopy[j+1].currentSingleProduct.price) ){// 如果list.searchListCopy[j]比list.searchListCopy[j+1]大,则需要交换位置
                    // 交换两个变量的值
                    let temp = list.searchListCopy[j+1];
                    list.searchListCopy[j+1] = list.searchListCopy[j];
                    list.searchListCopy[j] = temp;
                }
              }
          }

          //  // 分割数组长度
          // let length = Math.ceil(list.searchListCopy.length / 2);
          //  // 左边的数组
          // list.leftList = list.searchListCopy.splice(0,length);
          // // 右边的数组
          // list.rightList = list.searchListCopy.splice(-length);
          list.leftList = [];
          list.rightList = [];
          // 切割数组
          for(let i = 0 ; i<list.searchListCopy.length;i++){

            if( i == 0 || i%2 == 0){
              list.leftList.push(list.searchListCopy[i]);
              // console.log(i);
            }else if( i % 2 != 0){
              list.rightList.push(list.searchListCopy[i]);
              // console.log(i,"奇数");
            }
          }
          console.log(list.leftList);
          console.log(list.rightList);

        }else if(list.value1 == 2){
          // 价格降序操作
          list.searchList = [];
          // console.log(list.searchListCopy);
          // 价格降序
          for(let i = 0; i < list.searchListCopy.length - 1 ; i++ ){
              for(let j = 0; j < list.searchListCopy.length - 1 - i; j++ ){
                if( parseInt(list.searchListCopy[j].currentSingleProduct.price) < parseInt(list.searchListCopy[j+1].currentSingleProduct.price) ){// 如果list.searchListCopy[j]比list.searchListCopy[j+1]小,则需要交换位置
                    // 交换两个变量的值
                    let temp = list.searchListCopy[j+1];
                    list.searchListCopy[j+1] = list.searchListCopy[j];
                    list.searchListCopy[j] = temp;
                }
              }
          }

          //  // 分割数组长度
          // let length = Math.ceil(list.searchListCopy.length / 2);
          //  // 左边的数组
          // list.leftList = list.searchListCopy.splice(0,length);
          // // 右边的数组
          // list.rightList = list.searchListCopy.splice(-length);

          list.leftList = [];
          list.rightList = [];
          // 切割数组
          for(let i = 0 ; i<list.searchListCopy.length;i++){

            if( i == 0 || i%2 == 0){
              list.leftList.push(list.searchListCopy[i]);
              // console.log(i);
            }else if( i % 2 != 0){
              list.rightList.push(list.searchListCopy[i]);
              // console.log(i,"奇数");
            }
          }

        }else if(list.value1 == 3){
          // 销量升序操作
          list.searchList = [];
          // console.log(list.searchListCopy);
          // 销量升序
          for(let i = 0; i < list.searchListCopy.length - 1 ; i++ ){
              for(let j = 0; j < list.searchListCopy.length - 1 - i; j++ ){
                if( parseInt(list.searchListCopy[j].payPersons) > parseInt(list.searchListCopy[j+1].payPersons) ){// 如果list.searchListCopy[j]比list.searchListCopy[j+1]大,则需要交换位置
                    // 交换两个变量的值
                    let temp = list.searchListCopy[j+1];
                    list.searchListCopy[j+1] = list.searchListCopy[j];
                    list.searchListCopy[j] = temp;
                }
              }
          }

          //  // 分割数组长度
          // let length = Math.ceil(list.searchListCopy.length / 2);
          //  // 左边的数组
          // list.leftList = list.searchListCopy.splice(0,length);
          // // 右边的数组
          // list.rightList = list.searchListCopy.splice(-length);

          list.leftList = [];
          list.rightList = [];
          // 切割数组
          for(let i = 0 ; i<list.searchListCopy.length;i++){

            if( i == 0 || i%2 == 0){
              list.leftList.push(list.searchListCopy[i]);
              // console.log(i);
            }else if( i % 2 != 0){
              list.rightList.push(list.searchListCopy[i]);
              // console.log(i,"奇数");
            }
          }

        }else if(list.value1 == 4){
          // 销量降序操作
          list.searchList = [];
          // console.log(list.searchListCopy);
          // 销量降序
          for(let i = 0; i < list.searchListCopy.length - 1 ; i++ ){
              for(let j = 0; j < list.searchListCopy.length - 1 - i; j++ ){
                if( parseInt(list.searchListCopy[j].payPersons) < parseInt(list.searchListCopy[j+1].payPersons) ){// 如果list.searchListCopy[j]比list.searchListCopy[j+1]小,则需要交换位置
                    // 交换两个变量的值
                    let temp = list.searchListCopy[j+1];
                    list.searchListCopy[j+1] = list.searchListCopy[j];
                    list.searchListCopy[j] = temp;
                }
              }
          }

          //  // 分割数组长度
          // let length = Math.ceil(list.searchListCopy.length / 2);
          //  // 左边的数组
          // list.leftList = list.searchListCopy.splice(0,length);
          // // 右边的数组
          // list.rightList = list.searchListCopy.splice(-length);

          list.leftList = [];
          list.rightList = [];
          // 切割数组
          for(let i = 0 ; i<list.searchListCopy.length;i++){

            if( i == 0 || i%2 == 0){
              list.leftList.push(list.searchListCopy[i]);
              // console.log(i);
            }else if( i % 2 != 0){
              list.rightList.push(list.searchListCopy[i]);
              // console.log(i,"奇数");
            }
          }
        }

      }
    }

    // 搜索数组 
    let search = ()=>{
      
      list.searchList = list.goodDetailList.filter(item =>{
          if(item.name.indexOf(list.value2) != -1  || item.brandName.indexOf(list.value2) != -1){
            return item
          }  
      })
      
      // 实现深拷贝
      list.searchListCopy = JSON.parse(JSON.stringify(list.searchList));
      list.searchListCopyTwo = JSON.parse(JSON.stringify(list.searchList));
      list.searchListCopyThree = JSON.parse(JSON.stringify(list.searchList));

      // 调用切割数组方法
      split();

    }

    // 跳转商品详情页
    let goDetail = (id)=>{

      router.push({
        path:"/goodsdetails",
        query:{
          id
        }
      })
    }

    // 视图数据更新
    // 注册一个钩子，在组件即将因为响应式状态变更而更新其DOM树之前调用
    onBeforeMount(() => {

      // 获取传过来的输入框的值
      list.value2 = route.query.data;
      search();
    })

    
    return {
      ...toRefs(list),
      option1,
      created,
      showPopup,
      search,
      split,
      finish,
      brand,
      clear,
      goDetail
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
      font-size: 15px;
      .icon {
        font-size: 20px;
        color: #a6a6a6;
        margin-left: 10px;
        margin-right: 8px;
      }
      input {
        border: none;
        background-color: #f6f6f6;
        font-size: 12px;
        line-height: 29px;
      }
    }
    .cancel {
      margin-left: 8px;
      font-size: 14px;
      color: #999999;
      // font-weight: 600;
    }
  }
  .content {
    margin-top: 20px;
    // height: 100vh;
    background: #f6f6f6;
    .content_title {
      display: flex;
      align-items: center;
      justify-content: space-around;
      border-top: 1px solid #f5f5f5;
      border-bottom: 1px solid #f5f5f5;
      position: sticky;
      top: 0;
      background-color: #fff;
      z-index: 1;
      .item {
        font-size: 13px;
        color: #323232;
        position: relative;
        // .conItem{
        //   color: #f13b50;
        // }
        .filter_icon {
          font-size: 22px;
          color: #a5a5a5;
          position: absolute;
          right: -11px;
          top: 0px;
          z-index: 3;
        }
        // 筛选内容样式
        .filter_content {
          padding: 0 14px;
          margin-top: 14px;
          height: 610px;
          overflow: auto;
          .price_range {
            .filter_title {
              font-size: 13px;
              color: #353535;
            }
            .range {
              display: flex;
              
              align-items: center;
              margin-top: 24px;
              .line {
                width: 11px;
                height: 2px;
                background-color: #989898;
                margin: 0 4px;
              }
              .minimum,
              .maximum {
                padding: none;
                height: 35px;
                background-color: #fafafa;
                input {
                  width: 140px;
                  height: 35px;
                  text-align: center;
                  border: none;
                  font-size: 12px;
                  background-color: #fafafa;
                  border-radius: 4px;
                }
              }
            }
          }
          .self {
            margin-top: 20px;
            .self_title {
              font-size: 12px;
              color: #3e3e3e;
            }
            .self_ {
              display: flex;
              flex-wrap: wrap;

              margin-top: 26px;
              .self_item {
                width: 94px;
                margin-right: 9px;
                
                &:nth-child(3n) {
                  margin-right: 0px;
                }
                height: 32px;
                background-color: #f6f6f6;
                border-radius: 4px;
                text-align: center;
                line-height: 34px;
                margin-bottom: 9px;
                font-size: 12px;
                color: #464646;
                border: 1px solid transparent;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;

                &.active{
                  background-color: #fff;
                  border: 1px solid #AF858F;
                  color: #E23D4D;
                }
              }
            }
          }
          
        }
        .footer{
            width: 100%;
            height: 42px;
            border-top: 1px solid #F1F1F1;
            display: flex;
            font-size: 15px;
            color: #3F3F3F;
            align-items: center;
            position: fixed;
            background: #fff;
            bottom: 0;
            .empty{
              width: 120px;
              text-align: center;

            }
            .finish{
              flex: 1;
              height: 43px;
              background-color: #E93F48;
             
              color: #fff;
              text-align: center;
              display: flex;
              justify-content: center;
              align-items: center;
              .nums{
                font-size: 12px;
              }
            }
          }
      }
    }
    .goods_list{
      padding: 0 5px;
      background-color: #FAFAFA;
      display: flex;
      justify-content: space-between;
      .left_goods,.right_goods{
        .item{
          background-color: #fff;
          margin-top: 8px;
          width: 180px;
          border-radius: 4px;
          overflow: hidden;
          .goods_img{
            width: 100%;
            img{
              width: 100%;
            }
          }
          .goods_text{
            padding: 13px 9px;
            .goods_title{
              color: #353535;
              font-size: 14px;
              overflow:hidden;
              -webkit-line-clamp: 2;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              text-overflow: ellipsis;
              line-height: 18px;
            }
            .discount{
              display: inline-block;
              font-size: 12px;
              color: #A3A3A3;
              margin-top: 4px;
              transform: scale(.9) translateX(-2px);
              border-radius: 2px;
              border: 1px solid #F8F8F8;
              padding: 2px 3px;
              
            }
            .goods_price{
              display: flex;
              margin-top: 6px;
              .new_price{
                font-size: 12px;
                color: #414141;
              }
              .kill_price{
                font-size: 12px;
                color: #9A9A9A;
                transform: scale(.8);
                text-decoration: line-through;
              }
              
            }
            .store{
              margin-top: 4px;
                font-size: 12px;
                transform: scale(.9) translateX(-6px);
                color: #C1C1C1;
                
                display: flex;
                align-items: center;
              }
          }

        }
      }

    }
  }

  :deep {
    .van-dropdown-menu .van-ellipsis {
      font-size: 13px;
    }
    .van-dropdown-menu .van-dropdown-menu__bar {
      box-shadow: 0 0 0 white;
      font-size: 12px;
      color: #444444;
      width: 76px;
    }
    .van-cell .van-cell__value {
      background-color: rgba(255, 255, 255, 0);
      font-size: 13px;
    }
  }

  .van-cell {
    padding: 0;
    margin-right: 10px;
  }
}
</style>