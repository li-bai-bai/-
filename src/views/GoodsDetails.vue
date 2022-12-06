<template>
  <div class="goods_details">
    <!-- 商品内容 -->
    <div class="details_content">
      <van-tabs scrollspy  sticky >
        <van-tab title="商品">

          <!-- 轮播图 -->
          <div class="details_banner">
            <van-swipe >
              <van-swipe-item>
                <img :src="specificationsList[indexId].goodsImgs[0].imgUrl" alt=""  />
              </van-swipe-item>
              <van-swipe-item v-for="item in silderList" :key="item.goodsImgs[0].id">
                <img :src="item.goodsImgs[0].imgUrl" alt=""  />
              </van-swipe-item>

              <!-- <van-swipe-item v-for="item in silderList" :key="item.goodsImgs[0].id">
                <img :src="item.goodsImgs[0].imgUrl" alt=""  v-if="item.specificationId != specificationsList[indexId].specificationId"/>
              </van-swipe-item> -->

              <template #indicator="{ active, total }">
                <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
              </template>
            </van-swipe>

            <!-- 返回按钮 -->
            <div
              @click="$router.go(-1)"
              class="back iconfont icon-zuojiantou"
            ></div>

            <!-- 搜索按钮 -->
            <div class="search iconfont icon-sousuo"></div>

            <!-- 更多 -->
            <div class="more iconfont icon-gengduo"></div>
          </div>

          <!-- 商品信息模块 -->
          <div class="goods_item">
            <div class="goods_text">
              <div class="goods_price">
                <div class="new_price"><span>￥</span>{{specificationsList[indexId].price}}</div>
                <div class="sold">已售 {{goodDetailObj.payPersons}}</div>
              </div>

              <div class="goods_name">
                <div class="txt">
                  {{goodDetailObj.name}}{{specificationsList[indexId].value}}
                </div>

                <!-- 收藏星星  -->
                <div v-show="!getWish(specificationsList[indexId].specificationId).length" @click="setWish(true)"  class="favorites iconfont icon-31shoucang "></div>

                <!-- 已收藏  icon-shoucang-copy -->
                <div v-show="getWish(specificationsList[indexId].specificationId).length" @click="setWish(false)" class="favorites has iconfont icon-shoucang-copy"></div>
              </div>
              <router-link  custom  to="/ranking" v-slot="{ href, navigate, isActive }">
                <div :href="href" @click="navigate" :class="['sales',isActive && 'router-link-active']">
                  <div>学生党持妆热销榜 · 第{{rankIndex + 1}}名</div>
                  <span class="iconfont icon-youjiantou"></span>
                </div>
              </router-link>
              <!-- 销量榜 -->
              
            </div>

            <!-- 品牌旗舰 7天无理由退货 服务说明 -->
            <div class="brand">
              <!-- 左边内容 -->
              <div class="brand_text">
                <span class="iconfont icon-duigou"></span>
                <span class="">品牌旗舰</span>
                <span class="iconfont icon-duigou"></span>
                <span class="">免费取退</span>
                <span class="iconfont icon-duigou"></span>
                <span class="">7天无理由退货</span>
              </div>
              <!-- 右边字体图标 -->
              <div class="iconfont icon-youjiantou"  @click="brandFlag = true"></div>
            </div>
          </div>
          <!-- 品牌旗舰弹出层 服务说明-->
          <van-popup class="popup-brand" v-model:show="brandFlag" position="bottom" :style="{ height: '60%' }" round>
            <!-- 头部 -->
            <div class="popup-brand-header">
              <div class="header-left"><span>服务说明</span></div>
              <div class="iconfont icon-guanbi1 header-right" @click="brandFlag = false"></div>
            </div>
            <!-- 内容 -->
            <div class="popup-brand-content">
              <div class="item">
                <div class="item-top">
                  <div class="icon iconfont icon-duigou"></div>
                  <div class="top-content">品牌旗舰</div>
                </div>
                <div class="item-bottom">品牌旗舰店商品:该商品为品牌旗舰店直营商品,100%正品保障</div>
              </div>
              <div class="item">
                <div class="item-top">
                  <div class="icon iconfont icon-duigou"></div>
                  <div class="top-content">免费取退</div>
                </div>
                <div class="item-bottom"><span>卖家赠送,享首重免费取件或运费补贴7元。</span></div>
              </div>
              <div class="item">
                <div class="item-top">
                  <div class="icon iconfont icon-duigou"></div>
                  <div class="top-content">7天无理由退货</div>
                </div>
                <div class="item-bottom"><span>满足相应条件时,消费者可以申请"七天无理由退货"。</span></div>
              </div>
            </div>
          </van-popup>

          

          <!-- 发货 商品分类-->
          <div class="shipped">
            <!-- 商品分类 -->
            <div class="detailContent">
              <div class="detailName">已选</div>
              <div class="detail" @click="showDetail = true">{{goodDetailObj.name}}{{specificationsList[indexId].value}}</div>
              <div class="iconfont icon-youjiantou" @click="showDetail = true"></div>
            </div>
            <!-- 发货 -->
            <div class="shipContent">
              <div class="shipname">发货</div>
              <div class="shipped_address">
                <div class="ress">
                  官方旗舰店直发
                  <span>|</span>
                  包邮（部分地区除外）
                </div>
                <div class="shipped_time">48小时内发货</div>
              </div>
              <div class="iconfont icon-youjiantou" @click="shipFlag = true"></div>
            </div>
          </div>
          <!-- 商品分类弹出层 -->
           <!-- 弹窗 -->
          <van-popup v-model:show="showDetail" ca round position="bottom" class="popup-detail" :style="{ height: '70%' }">
              <div class="suit">
                  <div class="top">
                      <div class="imgbox">
                          <img :src="specificationsList[indexId].goodsImgs[0].imgUrl" alt="" class="auto-img">
                      </div>
                      <div class="right">
                          <div class="title">{{goodDetailObj.name}}{{specificationsList[indexId].value}}</div>
                          <div class="price"><span>￥</span>{{specificationsList[indexId].price}}</div>
                      </div>
                  </div>
              </div>
              <div class="ticketlit">
                  <div class="box">
                      <div class="icon iconfont icon-duigou"></div>
                      <div class="boxcontent">品牌旗舰</div>
                  </div>
                  <div class="box">
                      <div class="icon iconfont icon-duigou"></div>
                      <div class="boxcontent">极速发货</div>
                  </div>
                  <div class="box">
                      <div class="icon iconfont icon-duigou"></div>
                      <div class="boxcontent">7天无理由退货</div>
                  </div>
              </div>
              <div class="suit">
                  <div class="suitdetails">
                      <h4>套装明细</h4>
                      <div class="ticketbox">
                          <div v-for="(item,index) in specificationsList" :key="index" :class="['li',{'con':index == indexId }]"  @click="indexId = index">{{item.value}}</div>
                          <!-- <div class="li con">水乳洁面三件套</div> -->
                      </div>
                  </div>
                  <div class="numberContent">
                    <h4>数量</h4>
                    <div class="numbox">
                      <div @click="sub" class="add">-</div>
                      <div class="number">{{number}}</div>
                      <div @click="addNumber" class="add">+</div>
                    </div>
                  </div>
              <div class="btnlit" @click="addOrders">确认</div>
              </div>
          </van-popup>

          <!-- 发货弹出层 -->
          <van-popup class="popup-shipped" v-model:show="shipFlag" position="bottom" :style="{ height: '60%' }" round>
            <!-- 头部 -->
            <div class="popup-shipped-header">
              <div class="header-left"><span>物流配送</span></div>
              <div class="iconfont icon-guanbi1 header-right" @click="shipFlag = false"></div>
            </div>
            <!-- 内容 -->
            <div class="popup-shipped-content">
              <div class="item">
                <div class="item-top">
                  <div class="top-content">官方旗舰旗舰直发</div>
                </div>
                <div class="item-bottom">本商品由{{goodDetailObj.brandName}}旗舰店发货.品牌旗舰店直营直发,100%正品保障。</div>
              </div>
              
            </div>
          </van-popup>

        </van-tab>


        <van-tab title="点评">

          <router-link custom to="/evaluate" v-slot="{ href, navigate, isActive }">
            <!-- 评论 -->
            <div :href="href" @click="navigate" :class="['comments', isActive && 'router-link-active']">
              <div class="comments_title">
                <span>评论 {{goodDetailObj.comments}}</span>
                <div class="iconfont icon-youjiantou"></div>
              </div>
              <!--列表  -->
              <!-- <div class="comments_list">
                <div class="ul">
                  <div class="li">
                    <div class="img">
                      <img src="../assets/img/ia_600000073.jpg" alt="" />
                    </div>
                    <div class="author">
                      <div class="author_avatar">
                        <img src="../assets/image/头像.jpg" alt="" />
                      </div>
                      <div class="author_name">我大哥是奥特曼</div>
                    </div>
                  </div>
                </div>
              </div> -->
            </div>
          </router-link>
          


          <!-- 店铺 -->
          <div class="goods_store">
            <div class="goods_store_title">
              <div class="store_avatar">
                <img :src="goodDetailObj.currentSingleProduct.goodsImgs[0].imgUrl" alt="" />
              </div>
              <div class="store_name">
                <div class="name">{{goodDetailObj.brandName}}</div>
                <!-- 口碑 -->
                <div class="reputation">
                  <div class="txt">卖家口碑</div>
                  <div><van-rate size="12px" v-model="value" allow-half /></div>
                  <div class="score">{{ value }}</div>
                </div>
              </div>

              <div @click="goto('Brand',goodDetailObj.brandId)" class="iconfont icon-youjiantou"></div>
            </div>
          </div>

        </van-tab>


        <van-tab title="详情">


          <!-- 图文详情 -->
          <div class="text_image_details">
            <div class="text_image_details_title">图文详情</div>

            <!-- 详情图片 -->
            <div class="text_image">
              <img src="../assets/img/shopDetail01.jpg" alt="" />
              <img src="../assets/img/shopDetail02.jpg" alt="" />
              <img src="../assets/img/shopDetail03.jpg" alt="" />
              <img src="../assets/img/shopDetail04.jpg" alt="" />
            </div>
          </div>

        </van-tab>


        <van-tab title="推荐">
          <!-- 猜你喜欢 -->
          <div class="like">
              <h4>猜你喜欢</h4>
              <!-- 商品 -->
              <div class="shop">
                  <div class="box" v-for="item in guessList" :key="item.singleId" @click="goodDetail(item.commodityId)">
                      <div class="imgbox">
                      <img class="auto-img" :src="item.imgUrl" alt="">
                      </div>
                      <div class="content">
                      <div class="title">{{ item.brandName }} {{ item.commodityName }}{{ item.standardValue }}</div>
                      <div class="price">
                          <div class="new">
                          <span>￥</span>{{ parseInt(item.blackPrice) }}
                          </div>
                          <div class="old">
                          <span>￥</span>{{parseInt(item.price)}}
                          </div>
                      </div>
                      </div>
                  </div>
              </div>
          </div>
        </van-tab>
        
      </van-tabs>

      
    </div>

    <!-- 底部购物车 -->
    <div class="action_bar">
      <van-action-bar>
        <van-action-bar-icon icon="shop-o" text="店铺" badge="" />
        <van-action-bar-icon icon-class="iconfont icon-kefu" text="客服" dot  @click="gochat"/>
        <!-- <van-action-bar-icon @click="goto" icon="cart-o" text="购物车" :badge="carLength" /> -->
        <van-action-bar-icon @click="goto('car')" icon="cart-o" text="购物车" :badge="carLength?carLength:0" />
        <van-action-bar-button type="warning" text="加入购物车" @click="showDetail = true"/>
        <van-action-bar-button @click="setOrder" type="danger" text="立即购买" />
      </van-action-bar>
    </div>

    <!-- 房子底部购物车遮挡内容 -->
    <div class="footer"></div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant';
import 'vant/es/image-preview/style';
import { reactive, toRefs,onMounted,computed } from "vue";
import { useRoute,useRouter } from 'vue-router';
import {Toast} from "vant";
import { getAllSortDetail } from "../api/shopping.js";
import 'vant/es/toast/style';
export default {
  setup() {
    // 获取跳转路由参数
    let route = useRoute();
    let router = useRouter();

    let list = reactive({
      value:4.81,
      active:0,
      // 心愿单数据
      wishData:[],
      // 商品详情数据数组
      goodDetailList:[],
      // 当前商品详情数据对象
      goodDetailObj:null,
      // 轮播图数据
      silderList:[],
      //商品详情具体分类
      specificationsList:[],
      // 排名
      rankIndex:0,
      // 滚动高度
      backIconsLength:0,
      // 品牌旗舰质量保证 服务说明
      brandFlag:false,
      // 发货说明
      shipFlag:false,
      // 商品分类
      showDetail:false,
      // 商品分类下标
      indexId:0,
      // 商品数量
      number:1,
      // 购物车数量
      carLength:0,
      // 排行榜数组
      rankList:[],
      //购物车商品个数
      // carLength:0,
      // 购物车数组
      carArray:0,
      // 猜你喜欢数组
      guessList:[]
    })

    // console.log(route.query);
    // console.log(route.query.id);

    // 初始化界面
    let created = ()=>{

      let id = route.query.id;
      // 商品详情数组
      list.goodDetailList = JSON.parse(window.localStorage.getItem("goodDetailList"));
      // 下标
      let index = list.goodDetailList.findIndex(item => item.commodityId == id );
      // console.log(list.rankIndex);

      // 当前商品详情数据对象
      list.goodDetailObj = list.goodDetailList[index];
      // 轮播图数组
      list.silderList = list.goodDetailObj.specificationsList;
      // 商品详情分类数组
      list.specificationsList = list.goodDetailObj.specificationsList;

      // 判断是否有购物车数组
      if(window.localStorage.getItem("carOrderData")){
        list.carLength = JSON.parse(window.localStorage.getItem("carOrderData")).length
      }



      // 判断是否有排行榜
      if(window.localStorage.getItem("rankList")){
        // 排行榜数组
        list.rankList = JSON.parse(window.localStorage.getItem("rankList"));
        // 排行榜
        list.rankIndex = list.rankList.findIndex(item => item.commodityId == id);
        
      }

      // 获取心愿单
      if (window.localStorage.getItem("wishData")) {
        list.wishData = JSON.parse(window.localStorage.getItem("wishData"))
        console.log(list.wishData);
      }

    }
    // 调用初始化方法
    created();

    // 滚动距离
    let scrollFun = ()=>{
      window.onscroll = ()=>{
        // 获取滚动高度
        list.backIconsLength = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
        // console.log(list.backIconsLength);
      }
    }

    // 注册一个回调函数，在组件挂载完成后执行
    onMounted(()=>{
        scrollFun();
        console.log(list.silderList);
    })

    // 获取本地存储购物车数组
    let getCar = ()=>{
      if(window.localStorage.getItem("carOrderData")){
        list.carArray = JSON.parse(window.localStorage.getItem("carOrderData"));
        list.carLength = 0;

        list.carArray.forEach(items =>{
          list.carLength += items.item.length
        })
      }
    }
    // 初始化调用
    getCar();

    // 跳转人工客服界面
    let gochat = ()=>{
      router.push({
        name:"chat",
        query:{
          name:list.goodDetailObj.brandName
        }
      })
    }
    // 添加商品数量不要超过库存
    let addNumber = ()=>{
      if (list.number < list.specificationsList[list.indexId].stock) {
        list.number++
      }else{
        Toast("库存不足~")
      }
    }
    // 减少库存
    let sub = ()=>{
      if(list.number == 1){
        Toast("不能再减少了喔")
      }else{
        list.number--
      }
      // number>1?number--:bumber
    }
    //跳转购物车
    let goto = (path,id) => {
      router.push({
        name:path,
        query:{
          id
        }
      })
    }

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


    //计算购物车商品个数
    let carLength = computed(()=>{
      // return JSON.parse(window.localStorage.getItem("carOrderData")).length
      //  list.length = 0;
      // let carArray = JSON.parse(window.localStorage.getItem("carOrderData"))
      // carArray.forEach(items => {
      //    list.carLength += items.item.length
      // });
      return  list.carLength
    })

    // 创建购物车订单数据
    let addOrders = () => {
      list.showDetail = false
      // console.log(list.goodDetailObj);

      let carOrderData = [];  //购物车订单最大数组


      if (JSON.parse(window.localStorage.getItem("carOrderData"))) {
        carOrderData = JSON.parse(window.localStorage.getItem("carOrderData"))
      }
      
      let brandObj = {  //品牌数据
          id:route.query.id,
          brandId:list.goodDetailObj.brandId,
          brandName:list.goodDetailObj.brandName,
          brandImg:list.goodDetailObj.currentSingleProduct.goodsImgs[0].imgUrl,
          item:[]
      }

      let orderList = { //商品数据

        goodId:list.goodDetailObj.specificationsList[list.indexId].specificationId,  //商品id

        goodPrice:list.goodDetailObj.specificationsList[list.indexId].price, //商品价格

        goodName:list.goodDetailObj.name ,  //商品名字和型号

        goodImg:list.goodDetailObj.specificationsList[list.indexId].goodsImgs[0].imgUrl,  //商品图片

        goodNums:list.number, //商品数量

        stock:list.specificationsList[list.indexId].stock, //商品数量

        goodValue:list.goodDetailObj.specificationsList[list.indexId].value,

        checked:true, //是否勾选
        setNums:false, //是否改写数量
        carhasWish:(getWish(list.specificationsList[list.indexId].specificationId).length?false:true),
      }

      brandObj.item.unshift(orderList)  //放入商品去品牌

      let goodObj = carOrderData.filter(item => item.brandId == brandObj.brandId);  //相同品牌
      
      carOrderData = carOrderData.filter(item => item.brandId != brandObj.brandId)  //不在有相同品牌


      // console.log(goodObj,carOrderData);

      if (goodObj.length) { //有长度，说明有相同品牌

        // console.log("成功",goodObj[0],brandObj);

        goodObj[0].item.forEach(item => {
          if (item.goodId == brandObj.item[0].goodId) {
              brandObj.item[0].goodNums = brandObj.item[0].goodNums + item.goodNums
              console.log(brandObj.item[0].goodNums);
          }else{
            // console.log(2);
          }
        });

        goodObj[0].item = goodObj[0].item.filter(item => item.goodId != brandObj.item[0].goodId ) //过滤重复商品

        goodObj[0].item.unshift(brandObj.item[0]) //新的商品，但是数量没有加一

        carOrderData.unshift(goodObj[0])
      }else{

        carOrderData.unshift(brandObj)  //将品牌数据放进购物车订单
      }

      window.localStorage.setItem("carOrderData",JSON.stringify(carOrderData));

      getCar();
      Toast("加入购物车成功")
      
    }

    //立即订单
    let setOrder = () =>{
      
      let brandObj = {  //品牌数据
          id:route.query.id,
          brandId:list.goodDetailObj.brandId,
          brandName:list.goodDetailObj.brandName,
          brandImg:list.goodDetailObj.currentSingleProduct.goodsImgs[0].imgUrl,
          item:[]
      }

      let orderList = { //商品数据

        goodId:list.goodDetailObj.specificationsList[list.indexId].specificationId,  //商品id

        goodPrice:list.goodDetailObj.specificationsList[list.indexId].price, //商品价格

        goodName:list.goodDetailObj.name ,  //商品名字和型号

        goodImg:list.goodDetailObj.specificationsList[list.indexId].goodsImgs[0].imgUrl,  //商品图片

        goodNums:list.number, //商品数量

        goodValue:list.goodDetailObj.specificationsList[list.indexId].value,

        checked:true, //是否勾选
      }

      brandObj.item.unshift(orderList)  //放入商品去品牌

      window.localStorage.setItem("buyNowData",JSON.stringify(brandObj))

      goto('pay')
    }

    //心愿单删除
    let getWish = (id)=>{

      return list.wishData.filter(item => item.specificationId ==id)
       
    }

    //操控心愿单
    let setWish = (flag) =>{
      if (flag) {

        list.specificationsList[list.indexId].carhasWish = flag
        list.specificationsList[list.indexId].brandId = route.query.id,
        list.specificationsList[list.indexId].brandName = list.goodDetailObj.name
        list.wishData.unshift(list.specificationsList[list.indexId])
        window.localStorage.setItem("wishData",JSON.stringify(list.wishData))

        console.log("添加成功");
      }else{
        let goodId = list.specificationsList[list.indexId].specificationId
        list.wishData = list.wishData.filter( item => item.specificationId !=goodId)
        window.localStorage.setItem("wishData",JSON.stringify(list.wishData))
      }
    }

    // 获取猜你喜欢数组
    let getAllSortDetailFun = ()=>{
      getAllSortDetail().then(data=>{
        list.guessList = data.item[0].items;
        console.log(data);
        console.log(list.guessList);
      })
    }
    getAllSortDetailFun();


    return {
      ...toRefs(list),
      created,
      scrollFun,
      addOrders,
      addNumber,
      sub,
      goto,
      carLength,
      setOrder,
      getCar,
      gochat,
      setWish,
      getWish,
      ImagePreview,
      getAllSortDetailFun,
      goodDetail
    };
  },
};
</script>

<style lang="scss" scoped>


.goods_details {

  :deep{
    .van-sticky{
      position: fixed;
      width: 375px;
      // z-index: 100;
      opacity: 1;
      transition: all 0.5s linear;
    }
  }
  // 服务说明弹出层
  .popup-brand{
    width: 100%;

    .popup-brand-header{
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .header-left{
        font-size: 15px;
        font-weight: bold;
        flex: 1;
        text-align: center;
        // transform: translateX(16.5px);
        span{
          display: inline-block;
          transform: translateX(16.5px);
        }
      }
      .header-right{
        font-size: 18px;
        margin-right: 15px;
      }
    }
    .popup-brand-content{
      padding: 15px;
      box-sizing: border-box;
      width: 100%;

      .item{
        display: flex;
        flex-direction: column;
        margin-bottom: 18px;

        .item-top{
          display: flex;
          align-items: center;
          // height: 16px;
          margin-bottom: 8px;

          .icon{
            // height: 16px;
            font-size: 22px;
            color: #c62743;
          }
          .top-content{
            margin-left: 3px;
            font-size: 14px;
            font-weight: bold;

          }
        }
        .item-bottom{
          margin-left: 24px;
          font-size: 12px;
          line-height: 18px;
          color: #979797;
        }
        
      }
    }
  }
  // 发货说明
  .popup-shipped{
    width: 100%;

    .popup-shipped-header{
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ebebeb;

      .header-left{
        font-size: 15px;
        font-weight: bold;
        flex: 1;
        text-align: center;
        // transform: translateX(16.5px);
        span{
          display: inline-block;
          transform: translateX(16.5px);
        }
      }
      .header-right{
        font-size: 18px;
        margin-right: 15px;
      }
    }
    .popup-shipped-content{
      .item{
        display: flex;
        flex-direction: column;
        margin-bottom: 18px;

        .item-top{
          margin-bottom: 8px;
          padding: 25px 16px 0;
          .top-content{
            margin-left: 3px;
            font-size: 14px;
            font-weight: bold;

          }
        }
        .item-bottom{
          margin-left:19px;
          font-size: 12px;
          line-height: 18px;
          color: #979797;
        }
        
      }
    }
  }

  // 商品分类说明
  .popup-detail{
    .suit{
     padding: 15px;
     .top{
         width: 100%;
         display: flex;
         justify-content: space-between;
         .imgbox{
             width: 81px;
             height: 81px;
             overflow: hidden;
             border-radius: 5px;
         }
         .right{
             width: 230px;
             margin-right: 15px;
             display: flex;
             flex-direction: column;
             justify-content: space-between;
             .title{
                 line-height: 20px;
                 margin-top: 1px;
                 font-size: 14px;
                 overflow : hidden;
                 text-overflow: ellipsis;
                 display: -webkit-box;
                 -webkit-line-clamp: 2;
                 -webkit-box-orient: vertical;
             }
             .price{
                 span{
                     font-size: 14px;
                 }
                 font-size: 18px;
             }
         }
     }
     
      
    .suitdetails{
      h4{
           font-size: 14px;
           margin-bottom: 14px;
           font-weight: bold;
       }
      .ticketbox{
          display: flex;
          margin-bottom: 24px;
          flex-wrap: wrap;
          .li{
              margin-bottom: 15px;
              padding: 6px 11px;
              font-size: 12px;
              background-color: #f4f4f4;
              color: #898989;
              border-radius: 15px;
              margin-right: 15px;
          }
          .con{
              background-color: #fce9ed;
              color: #ea4149;
          }
      }
    }

    .numberContent{
      display: flex;
      align-items: center;
      justify-content: space-between;
      h4{
        font-size: 14px;
        margin-bottom: 14px;
        font-weight: bold;
      }
      .numbox{
        display: flex;
        align-items: center;
        .number{
          margin: 0 10px;
        }
        .add{
          width: 24px;
          height: 24px;
          background: #f5f5f5;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #818181;
          font-size: 16px;
        }
      }
    }

    .btnlit{
             position: fixed;
             bottom: 15px;
             box-sizing: border-box;
             width: 345px;
             min-width: 320px;
             max-width: 750px;
             height: 40px;
             color: #fff;
             background-color: #ea4149;
             text-align: center;
             line-height: 40px;
             border-radius: 20px;
             font-size: 13px;
    }
            
    }
    .ticketlit{
        padding: 0 15px;
        background-color: #f7f7f7;
        height: 30px;
        font-size: 13px;
        color: #999;
        display: flex;
        align-items: center;
        .box{
            margin-right: 10px;
            display: flex;
            align-items: center;
            .icon{  
                font-size: 24px;
                margin-right: 5px;
            }
            .boxcontent{
              font-size: 12px;
            }
        }
    }
  }
  .details_banner {
    position: relative;
    .van-swipe {
      height: 343px;
      background: #fff;
      .van-swipe-item {
        display: flex;
        align-items: center;
        img {
          width: 100%;
        }
      }
    }
    .back {
      width: 27px;
      height: 27px;
      border-radius: 50%;
      position: absolute;
      top: 18px;
      left: 7px;
      text-align: center;
      line-height: 27px;
      opacity: 0.8;
      font-size: 18px;
      color: #fff;
      background-color: rgb(0, 0, 0, 0.2);
    }
    .search {
      width: 27px;
      height: 27px;
      border-radius: 50%;
      position: absolute;
      top: 18px;
      right: 50px;
      text-align: center;
      line-height: 26px;
      opacity: 0.8;
      font-size: 16px;
      color: #fff;
      background-color: rgb(0, 0, 0, 0.2);
    }
    .more {
      width: 27px;
      height: 27px;
      border-radius: 50%;
      position: absolute;
      top: 18px;
      right: 7px;
      text-align: center;
      line-height: 27px;
      opacity: 0.8;
      font-size: 16px;
      color: #fff;
      background-color: rgb(0, 0, 0, 0.2);
    }
  }

  .details_content {
    // padding: 8px;
    padding-top: 0;
    background-color: #f5f5f5;

    .goods_item {
      background-color: #fff;
      border-radius: 4px;
      margin: 0 8px;
      margin-top: 8px;
      .goods_text {
        padding: 0 11px;
        .goods_price {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 18px;
          .new_price {
            // font-size: 16px;
            font-size: 18px;
            font-weight: bold;
            color: #333333;
            span {
              font-size: 12px;
              transform: scale(0.9);
            }
          }
          .sold {
            font-size: 12px;
            color: #929292;
            // transform: scale(0.9);
          }
        }
        .goods_name {
          margin-top: 16px;

          display: flex;
          // align-items: center;
          .txt {
            width: 282px;
            color: #333333;
            font-size: 15px;
            line-height: 18px;
            font-weight: bold;
          }
          .favorites {
            color: #8a8a8a;
            flex: 1;
            font-size: 16px;
            text-align: end;
          }
          .has {
            color: #f2bf66;
          }
        }
        .sales {
          margin-top: 14px;
          border-top: 1px solid #f8f8f8;
          display: flex;
          justify-content: space-between;
          padding: 11px 0px;
          color: #787878;
          font-size: 12px;
          align-items: center;
          .iconfont {
            color: #aeaeae;
            font-size: 16px;
          }
        }
      }
      .brand {
        display: flex;
        justify-content: space-between;
        padding: 15px 12px;
        background-color: #fafafa;
        align-items: center;
        font-size: 12px;
        color: #8c8c8c;
        .brand_text {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          span{
            margin-right: 3px;
          }
          .iconfont {
            font-size: 20px;
          }
        }
        .icon-youjiantou{
          color: #aeaeae;
        }
      }
    }
    .shipped {
      margin: 0 8px;
      margin-top: 8px;
      background-color: #fff;
      padding: 20px 10px;
      border-radius: 4px;
      color: #373737;
      font-size: 13px;
      display: flex;
      flex-direction: column;
      .detailContent{
        display: flex;
        font-size: 13px;
        margin-bottom: 13px;
        .detail{
          margin-left: 16px;
          flex: 1;
          width: 250px;
          margin-right: 31px;
          // 文本溢出隐藏
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .iconfont{
          color: #aeaeae;
        }

      }
      .shipContent{
        display: flex;
        font-size: 13px;
        .shipped_address {
          margin-left: 16px;
          flex: 1;
          .ress {
            span {
                color: #dcdee0;
                margin: 0 3px;
            }
          }
          .shipped_time {
            margin-top: 10px;
            color: #909090;
            font-size: 12px;
          }
        }

        .iconfont{
          color: #aeaeae;
        }
      }
    }
    .comments {
      margin: 0 8px;
      margin-top: 8px;
      background-color: #fff;
      padding: 20px 10px;
      border-radius: 4px;
      color: #373737;
      font-size: 13px;
      .comments_title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          color: #383838;
          font-weight: 700;
          font-size: 15px;
        }
        .iconfont {
          color: #acacac;
        }
      }
      .comments_list {
        margin-top: 9px;
        .ul {
          display: flex;
          .li {
            width: 110px;
            height: 147px;
            position: relative;
            border-radius: 4px;
            overflow: hidden;
            margin-right: 3px;
            img {
              width: 100%;
            }
            .author {
              position: absolute;
              display: flex;
              bottom: 6px;
              left: 6px;
              .author_avatar {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                overflow: hidden;

                img {
                  width: 100%;
                }
              }
              .author_name {
                font-size: 12px;
                color: #fff;
                opacity: 0.8;
                transform: scale(0.9);
              }
            }
          }
        }
      }
    }
    .goods_store {
      background-color: #fff;
      margin: 0 8px;
      margin-top: 8px;
      padding: 20px 10px;
      border-radius: 4px;
      color: #323232;
      .goods_store_title {
        display: flex;
        .store_avatar {
          width: 37px;
          height: 37px;
          margin-right: 12px;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid #eee;
          box-shadow: 0 0 2px #ccc;
          display: flex;
          align-items: center;
          img {
            width: 100%;
          }
        }
        .store_name {
          flex: 1;
          .name {
            font-size: 14px;
            color: #323232;
          }
          .reputation {
            font-size: 12px;
            margin-top: 8px;
            color: #9f9f9f;
            display: flex;
            align-items: center;
            .txt {
              margin-right: 5px;
            }
            .score {
              margin-left: 6px;
              color: #e14c5a;
            }
          }
        }
        .iconfont {
          color: #aeaeae;
        }
      }
    }
    .text_image_details {
      margin: 0 8px;
      background-color: #fff;
      margin-top: 8px;
      padding: 20px 0px;
      border-radius: 4px;
      color: #323232;
      .text_image_details_title {
        margin-left: 10px;
        font-size: 13px;
        color: #323232;
      }
      .text_image {
        margin-top: 13px;
        width: 100%;
        img {
          width: 100%;
        }
      }
    }
  }
  // 猜你喜欢
  .like{
        h4{
            margin-left: 15px;
            margin: 18px;
            font-size: 14px;
            
        }
       .shop{
            padding: 0 7px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .box{
            width: 49.5%;
            height: 270px;
            background-color: #fff;
            border-radius: 4px;
            margin-bottom: 4px;
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

  .footer {
    width: 100%;
    height: 57px;
    background-color: #f5f5f5;
  }

  .van-action-bar.van-safe-area-bottom {
    padding: 3px 0;
    border-top: 1px solid #f6f6f6;
    display: flex;
    align-items: center;
  }

  // 轮播图样式
  .custom-indicator {
    width: 34px;
    height: 24px;
    position: absolute;
    right: 8px;
    bottom: 11px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 24px;
    opacity: 0.8;
    border-radius: 24px;
    background: rgba(0, 0, 0, 0.2);
  }
}
</style>