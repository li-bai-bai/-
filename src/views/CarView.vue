<template>
  <div class="shopCar">
    <div class="nav">
      <div @click="goto('shopping')" class="left iconfont icon-zuojiantou"></div>
      <h5>购物车({{ carOrderData.length }})</h5>
      <div class="icon iconfont icon-dingdan" @click="goto('order')" style="font-size:18px;"></div>
    </div>
    <div class="null"></div>

    

<van-pull-refresh :disabled="backIconsLength?true:false" v-model="loading" @refresh="onRefresh">

    <div class="CarShop">

      <div
        class="car_content"
        :v-if="carOrderData.length"
        v-for="items in carOrderData"
        :key="items.brandId"
      >
        <div class="title">
          <div class="checkbox">
            <div
              @click.stop="setBrand(true, items.brandId)"
              v-show="!brandAll(items.brandId)"
              class="check"
            ></div>
            <div
              @click.stop="setBrand(false, items.brandId)"
              v-show="brandAll(items.brandId)"
              class="check iconfont icon-gou1"
              style="color: red; border: none"
            ></div>
          </div>
          <div class="logo">
            <img class="auto-img" :src="items.brandImg" alt="" />
          </div>
          <div class="name">{{ items.brandName }}</div>
          <div class="icon iconfont icon-youjiantou"></div>
        </div>

        <van-swipe-cell v-for="goodItem in items.item" :key="goodItem.goodId">
          <div class="box" >
            <div class="checkbox">
              <div
                v-show="!goodItem.checked"
                @click.stop.stop="editChecked(items.brandId, goodItem.goodId)"
                class="check"
              ></div>
              <div
                v-show="goodItem.checked"
                @click.stop="editChecked(items.brandId, goodItem.goodId)"
                class="check iconfont icon-gou1"
                style="color: red; border: none"
              ></div>
            </div>
            <div class="imgbox">
              <img :src="goodItem.goodImg" alt="" class="auto-img" />
            </div>
            <div class="right">
              <div class="shop_name" @click.stop="goto('goodsdetails',items.id)">
                {{ goodItem.goodName + goodItem.goodValue }}
              </div>
              <div class="ticket">
                <p @click.stop="showDetail(items.brandId, goodItem.goodId)">
                  {{ goodItem.goodValue }}
                </p>
                <div class="lit iconfont icon-sanjiaoxing_shang"></div>
              </div>
              <div class="btm">
                <div class="price"><span>￥</span>{{ goodItem.goodPrice }}</div>

                <div class="numbox" v-show="goodItem.setNums">
                  <div
                    @click.stop="subGoodNums(items.brandId, goodItem.goodId)"
                    class="add"
                  >
                    -
                  </div>
                  <div class="number">{{ goodItem.goodNums }}</div>
                  <div
                    @click.stop="addGoodNums(items.brandId, goodItem.goodId)"
                    class="add"
                  >
                    +
                  </div>
                </div>

                <div @click="editNums(items.brandId, goodItem.goodId)" v-show="!goodItem.setNums" class="num">x{{ goodItem.goodNums }}</div>
              </div>
            </div>
          </div>
          <template #right>
            <van-button
              v-show="!getCarWish(goodItem.goodId).length"
              style="background-color: #f2bf66; border-color: #f2bf66"
              square
              text="移入心愿单"
              type="danger"
              class="delete-button"
              @click="getWishData(items,goodItem)"
            />
            <van-button
              v-show="getCarWish(goodItem.goodId).length"
              style="color:#ccc;background-color: #F7F7F7; border-color: #F7F7F7"
              square
              text="取消心愿单"
              type="danger"
              class="delete-button"
              @click="getWishData(items,goodItem)"
            />
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button del"
              @click.stop="delGood(items.brandId, goodItem.goodId)"
            />
          </template>
        </van-swipe-cell>
      </div>

     

      <div v-if="!carOrderData.length" class="noshop">
        <div class="icon iconfont icon-gouwuche"></div>
        <p>您的购物车暂时没有商品哦，快去加购吧~</p>
      </div>
    </div>

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

</van-pull-refresh>

    <div class="null" style="height: 65px"></div>
    <div class="totalbox" v-if="carOrderData.length">
      <div class="left">
        <div class="checkbox">
          <div
            @click="setBrandAll(true)"
            v-show="!orderAll"
            class="check"
          ></div>
          <div
            @click="setBrandAll(false)"
            v-show="orderAll"
            class="check iconfont icon-gou1"
            style="color: red; border: none"
          ></div>
        </div>
        <h4>全选</h4>
      </div>
      <div class="right">
        <p>总计：</p>
        <div class="total">￥{{ num }}</div>
        <div class="btn" @click.stop="pay('pay')">结算</div>
      </div>
    </div>
    <!-- 弹窗 -->
    <van-popup
      v-model:show="show"
      round
      position="bottom"
      :style="{ height: '60%' }"
    >
      <div class="suit">
        <div class="top">
          <div class="imgbox">
            <img
              :src="specificationsList[editId].goodsImgs[0].imgUrl"
              alt=""
              class="auto-img"
            />
          </div>
          <div class="right">
            <div class="title">
              {{ goodDetailList[brandIndex].name
              }}{{ specificationsList[editId].value }}
            </div>
            <div class="price">
              <span>￥</span>{{ specificationsList[editId].price }}
            </div>
          </div>
        </div>
      </div>
      <div class="ticketlit">
        <div class="box">
          <div class="icon iconfont icon-duigou"></div>
          <div class="iconContent">品牌旗舰</div>
        </div>
        <div class="box">
          <div class="icon iconfont icon-duigou"></div>
          <div class="iconContent">极速发货</div>
        </div>
        <div class="box">
          <div class="icon iconfont icon-duigou"></div>
          <div class="iconContent">7天无理由退货</div>
        </div>
      </div>
      <div class="suit">
        <div class="suitdetails">
          <h4>套装明细</h4>
          <div class="ticketbox">
            <div
              :class="['li', { con: index == editId }]"
              v-for="(item, index) in specificationsList"
              :key="index"
              @click="editId = index"
            >
              {{ item.value }}
            </div>
            <!-- <div class="li con">水乳洁面三件套</div> -->
          </div>
        </div>
        <div class="btnlitdiv">
        <div class="btnlit" @click="editGood">确认</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { ref,reactive, toRefs, computed } from "vue";
import { useRouter } from "vue-router";
import { getAllSortDetail } from "../api/shopping.js";
import "vant/es/toast/style";
import { Toast } from 'vant';
export default {
  setup() {
    // 使用到的变量
    let router = useRouter();
    let obj = reactive({
      // 商品详情分类弹出层
      show: false,
      // 所有商品详情内容数组
      goodDetailList: [],
      // 购物车数组
      carOrderData: [],
      // 商品当前店铺下标
      brandIndex: 0,
      // 商品分类当前下标
      editId: 0,
      // 当前商品分类数组
      specificationsList: [],
      // 修改旧的商品id
      detailId: 0,
      //旧的品牌id
      brandId: 0,
      backIconsLength:0,
      wishData:[],//心愿单数据
      // 猜你喜欢数组
      guessList:[]
    });

    let loading = ref(false)

    // 初始化判断
    let created = () => {
      // 判断是否有购物车数组
      if (JSON.parse(window.localStorage.getItem("carOrderData"))) {
        obj.carOrderData = JSON.parse(
          window.localStorage.getItem("carOrderData")
        );
      }
      // 判断是否有所有商品详情数组
      if (window.localStorage.getItem("goodDetailList")) {
        obj.goodDetailList = JSON.parse(
          window.localStorage.getItem("goodDetailList")
        );
      }

       if (window.localStorage.getItem("wishData")) {
          obj.wishData = JSON.parse(window.localStorage.getItem("wishData"))
        }

      // console.log(obj.carOrderData);
    };
    // 调用方法
    created();

    // 购物车商品分类
    let showDetail = (brandId, goodId) => {
      // 弹出层
      obj.show = true;
      // 商品店铺分类id
      obj.brandId = brandId;
      obj.detailId = goodId;

      // 店铺下标 商品数组当前店铺下标
      obj.brandIndex = obj.goodDetailList.findIndex(
        (item) => item.brandId == brandId
      );
      // console.log(obj.brandIndex ,"店铺");
      // 当前商品分类数组
      obj.specificationsList =
        obj.goodDetailList[obj.brandIndex].specificationsList;
      // 当前商品分类下标
      let goodIndex = obj.specificationsList.findIndex(
        (item) => item.specificationId == goodId
      );
      // console.log(goodIndex,"商品");
      // 设置商品分类当前下标
      obj.editId = goodIndex;
      // console.log(obj.editId);
    };

    // 更换商品
    let editGood = () => {
      obj.show = false;
      //  console.log(obj.brandIndex);
      console.log(obj.editId);
      let index1 = obj.carOrderData.findIndex(
        (item) => item.brandId == obj.brandId
      );
      let index2 = obj.carOrderData[index1].item.findIndex(
        (item) => item.goodId == obj.detailId
      );
      obj.carOrderData[index1].item[index2].goodId =
        obj.specificationsList[obj.editId].specificationId;
      obj.carOrderData[index1].item[index2].goodImg =
        obj.specificationsList[obj.editId].goodsImgs[0].imgUrl;
      obj.carOrderData[index1].item[index2].goodPrice =
        obj.specificationsList[obj.editId].price;
      obj.carOrderData[index1].item[index2].goodValue =
        obj.specificationsList[obj.editId].value;

      console.log(index2);
      // 715590709654062382
      window.localStorage.setItem(
        "carOrderData",
        JSON.stringify(obj.carOrderData)
      );
    };
    //商品数量减一
    let subGoodNums = (brandId, goodId) => {
      // obj.sumPrice = 0
      obj.carOrderData.forEach((items) => {
        if (items.brandId == brandId) {
          items.item.forEach((good) => {
            if (good.goodId == goodId && good.goodNums > 1) {
              good.goodNums -= 1;
            }
          });
        }
      });
      window.localStorage.setItem(
        "carOrderData",
        JSON.stringify(obj.carOrderData)
      );
    };

    //商品数量加一
    let addGoodNums = (brandId, goodId) => {
      obj.carOrderData.forEach((items) => {
        if (items.brandId == brandId) {
          items.item.forEach((good) => {
            if (good.goodId == goodId) {
              if (good.goodNums<good.stock) {
                good.goodNums += 1;
              }else{
                Toast("库存不足")
              }
            }
          });
        }
      });
      window.localStorage.setItem(
        "carOrderData",
        JSON.stringify(obj.carOrderData)
      );
    };

    //删除商品
    let delGood = (brandId, goodId) => {
      let index = obj.carOrderData.findIndex((item) => item.brandId == brandId);
      obj.carOrderData[index].item = obj.carOrderData[index].item.filter(
        (items) => items.goodId != goodId
      );

      if (!obj.carOrderData[index].item.length) {
        //商品为0，进行过滤
        obj.carOrderData = obj.carOrderData.filter(
          (item) => item.brandId != brandId
        );
      }

      window.localStorage.setItem(
        "carOrderData",
        JSON.stringify(obj.carOrderData)
      );
    };

    //修改选择状态
    let editChecked = (brandId, goodId) => {
      obj.carOrderData.forEach((items) => {
        if (items.brandId == brandId) {
          items.item.forEach((good) => {
            if (good.goodId == goodId) {
              good.checked = !good.checked;
            }
          });
        }
      });
      window.localStorage.setItem(
        "carOrderData",
        JSON.stringify(obj.carOrderData)
      );
    };

    //计算总价
    const num = computed(() => {
      return obj.carOrderData.reduce((total, items) => {
        items.item.forEach((good) => {
          if (good.checked) {
            total += good.goodPrice * good.goodNums;
          }
        });
        return total;
      }, 0);
    });

    // 品牌商品功能
    let setBrand = (flag, brandId) => {
      let index = obj.carOrderData.findIndex((item) => item.brandId == brandId);
      obj.carOrderData[index].item.forEach((good) => {
        good.checked = flag;
      });

      window.localStorage.setItem(
        "carOrderData",
        JSON.stringify(obj.carOrderData)
      );
    };

    // 品牌商品判断
    let brandAll = (brandId) => {
      let index = obj.carOrderData.findIndex((item) => item.brandId == brandId);

      return obj.carOrderData[index].item.every((item) => {
        return item.checked; //只要有一个为false不满足条件
      });
    };

    // 全选功能
    let setBrandAll = (flag) => {
      obj.carOrderData.forEach((items) => {
        items.item.forEach((good) => {
          good.checked = flag;
        });
      });
      window.localStorage.setItem(
        "carOrderData",
        JSON.stringify(obj.carOrderData)
      );
    };

    // 全选判断
    let orderAll = computed(() => {
      let flag;

      for (let i = 0; i < obj.carOrderData.length; i++) {
        for (let j = 0; j < obj.carOrderData[i].item.length; j++) {
          if (obj.carOrderData[i].item[j].checked) {
            flag = true;
          } else {
            flag = false;
            return;
          }
        }
      }
      return flag;
    });


    // 改变输入状态
    let editNums =(brandId, goodId)=>{
      obj.carOrderData.forEach((items) => {
        if (items.brandId == brandId) {
          items.item.forEach((good) => {
            if (good.goodId == goodId) {
              good.setNums = true;
            }
          });
        }
      });
      window.localStorage.setItem(
        "carOrderData",
        JSON.stringify(obj.carOrderData)
      );
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

    // 获取猜你喜欢数组
    let getAllSortDetailFun = ()=>{
      getAllSortDetail().then(data=>{
        
        obj.guessList = data.item[0].items;
        console.log(data);
        console.log(obj.guessList);
      })
    }
    getAllSortDetailFun();

    //跳转判断
    let pay = (path)=>{
      if (num.value) {
        goto(path)
      }
    }
    //路由跳转
    let goto = (path,goodId) => {
      console.log(path,goodId);
      router.push({
        name: path,
        query: {
          id: goodId,
        },
      });
    };

    const onRefresh = () => {
      scrollFun()

      setTimeout(() => {
        Toast('刷新成功');
        loading.value = false;
        obj.carOrderData.forEach((items) => {
          items.item.forEach((good) => {
              good.setNums = false;
          });
      });
      window.localStorage.setItem(
        "carOrderData",
        JSON.stringify(obj.carOrderData)
      );
      }, 500);

       
    };
    // 滚动距离
    let scrollFun = ()=>{
      window.onscroll = ()=>{
      // 获取滚动高度
        obj.backIconsLength = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
        // console.log(obj.backIconsLength);
      }
    }

    // 心愿单数据操作
    let setWishData = (items,goods)=>{
      if (goods.carhasWish) {


        obj.wishData = obj.wishData.filter( item => item.specificationId !=goods.goodId)
        window.localStorage.setItem("wishData",JSON.stringify(obj.wishData))

      }else{

        let wish = {
          price:goods.goodPrice,
          goodsImgs:[{imgUrl:goods.goodImg}],
          brandId:items.id,
          brandName:goods.goodName,
          value:goods.goodValue,
          specificationId:goods.goodId,
        }
       
        obj.wishData.unshift(wish)
         window.localStorage.setItem("wishData",JSON.stringify(obj.wishData))

      }
    }

    //心愿单购物车操作
    let getWishData = (brand,good)=>{
      // console.log(brand);
      // console.log(good);
       obj.carOrderData.forEach((items) => {
        if (items.brandId == brand.brandId) {
          items.item.forEach((goods) => {
            if (goods.goodId == good.goodId) {
              goods.carhasWish = !good.carhasWish;
              setWishData(items,goods);
            }
          });
        }
      });
      window.localStorage.setItem(
        "carOrderData",
        JSON.stringify(obj.carOrderData)
      );
    }

    let getCarWish =(id)=>{
      return obj.wishData.filter(item => item.specificationId == id)
    }
      

    return {
      ...toRefs(obj),
      loading,
      onRefresh,
      subGoodNums,
      addGoodNums,
      editChecked,
      num,
      brandAll,
      setBrand,
      setBrandAll,
      orderAll,
      showDetail,
      delGood,
      goto,
      editGood,
      pay,
      editNums,
      getWishData,
      getCarWish,
      goodDetail
    };
  },
};
</script>

<style lang="scss" scoped>
.shopCar {
  background-color: #f7f7f7;
  height: 100%;
  .nav {
    width: 100%;
    box-sizing: border-box;
    min-width: 320px;
    max-width: 750px;
    position: fixed;
    top: 0;
    z-index: 999;
    padding: 14px 12px;
    height: 42px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .left {
      font-size: 24px;
    }
    h5 {
      font-size: 15px;
    }
    p {
      font-size: 14px;
    }
  }
  .null {
    width: 100%;
    height: 50px;
  }
  .CarShop {
    padding: 0 10px;
    .car_content {
      padding: 10px;
      border-radius: 10px;
      background: #fff;
      margin-bottom: 10px;
      .title {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .checkbox {
          display: flex;
          margin-left: 1px;
        }
        .check {
          width: 20px;
          height: 20px;
          font-size: 20px;
          border-radius: 50%;
          box-sizing: border-box;
          box-shadow: 0 0 2px #ccc;
          border: 1px solid #ccc;
          margin-right: 9px;
          overflow: hidden;
        }
        .logo {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          overflow-x: hidden;
          box-sizing: border-box;
          box-shadow: 0 0 2px #333;
          margin-right: 5px;
          overflow: hidden;
        }
        .name {
          margin-right: 6px;
          font-size: 13px;
        }
        .icon {
          font-size: 18px;
        }
      }
      .box {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .checkbox {
          display: flex;
          margin-left: 1px;
        }
        .check {
          width: 20px;
          height: 20px;
          font-size: 20px;
          border-radius: 50%;
          box-sizing: border-box;
          box-shadow: 0 0 2px #ccc;
          border: 1px solid #ccc;
          margin-right: 9px;
        }
        .imgbox {
          width: 100px;
          height: 100px;
          background-color: #ccc;
          border-radius: 5px;
          overflow: hidden;
          margin-right: 10px;
        }
        .right {
          height: 90px;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .shop_name {
            width: 200px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .ticket {
            border-radius: 2px;
            padding: 3px 5px;
            background-color: #f4f4f4;
            display: flex;
            align-items: center;
            width: 78px;
            p {
              display: inline-block;
              font-size: 12px;
              color: #898989;
              margin-right: 3px;
              overflow: hidden;
              width: 60px;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .lit {
              font-size: 12px;
              display: inline-block;
            }
          }
          .btm {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .price {
              color: #e51927;
              font-size: 14px;
              span {
                font-size: 12px;
              }
            }
            .numbox {
              display: flex;
              align-items: center;
              .number {
                margin: 0 10px;
              }
              .add {
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
            .num {
              padding: 5px 6px;
              border-radius: 40%;
              border: 1px solid #ccc;
              font-size: 12px;
            }
          }
        }
      }
    }
    .noshop {
      height: 200px;
      font-size: 13px;
      color: #999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .icon {
        font-weight: 100;
        font-size: 60px;
        color: #ccc;
        margin-bottom: 30px;
      }
    }
  }
  .van-button {
    height: 100%;
    padding: 0 5px;
    font-size: 12px;
  }
  :deep {
    .van-swipe-cell__right {
      right: -1px;
    }

    .van-button .van-button__text {
      width: 42px;
      text-indent: 0.5em;
    }
    .del {
      border-bottom-right-radius: 10px;
    }
  }
  .like {
    h4 {
      margin-left: 15px;
      margin: 18px;
      font-size: 14px;
    }
    .shop {
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .box {
        width: 49.5%;
        height: 270px;
        background-color: #fff;
        border-radius: 4px;
        margin-bottom: 4px;
        overflow: hidden;
        .imgbox {
          width: 100%;
          // height: 183px;
        }
        .content {
          padding: 10px 15px;
          .title {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            font-weight: bold;
            font-size: 13px;
            line-height: 20px;
            margin-bottom: 15px;
          }
          .price {
            font-size: 15px;
            display: flex;
            align-items: flex-end;
            .old {
              color: #999;
              font-size: 12px;
              text-decoration: line-through;
              margin-left: 8px;
              margin-bottom: 1px;
              span {
                font-size: 12px;
              }
            }
            span {
              font-size: 13px;
            }
          }
        }
      }
    }
  }
  .totalbox {
    position: fixed;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    min-width: 320px;
    max-width: 750px;
    background-color: #fff;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    box-shadow: 0 0 2px #ccc;
    transition: all 0.5s linear;

    .left {
      display: flex;
      align-items: center;
      .checkbox {
        display: flex;
      }
      .check {
        width: 20px;
        height: 20px;
        font-size: 20px;
        border-radius: 50%;
        box-sizing: border-box;
        box-shadow: 0 0 2px #ccc;
        border: 1px solid #ccc;
        margin-right: 9px;
        overflow: hidden;
      }
      h4 {
        font-size: 14px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      p {
        font-size: 12px;
      }
      .total {
        font-size: 16px;
        color: #ea4149;
        margin-right: 10px;
      }
      .btn {
        border-radius: 18px;
        color: #fff;
        width: 105px;
        height: 40px;
        font-size: 14px;
        text-align: center;
        line-height: 40px;
        background-color: #ea4149;
      }
    }
  }
  .suit {
    padding: 15px;
    .top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .imgbox {
        width: 81px;
        height: 81px;
        overflow: hidden;
        border-radius: 5px;
      }
      .right {
        width: 230px;
        margin-right: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          line-height: 20px;
          margin-top: 1px;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .price {
          span {
            font-size: 14px;
          }
          font-size: 18px;
        }
      }
    }

    .suitdetails {
      margin-bottom: 40px;
      h4 {
        font-size: 14px;
        margin-bottom: 14px;
        font-weight: bold;
      }
      .ticketbox {
        display: flex;
        flex-wrap: wrap;
        .li {
          margin-bottom: 15px;
          padding: 6px 11px;
          font-size: 12px;
          background-color: #f4f4f4;
          color: #898989;
          border-radius: 15px;
          margin-right: 10px;
        }
        .con {
          background-color: #fce9ed;
          color: #ea4149;
        }
      }
    }
    .btnlitdiv{
       position: fixed;
      bottom: -11px;
      width: 100%;
      background: #fff;
      height: 59px;
      .btnlit {
     
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
  }
  .ticketlit {
    padding: 0 15px;
    background-color: #f7f7f7;
    height: 30px;
    font-size: 13px;
    color: #999;
    display: flex;
    align-items: center;
    .box {
      margin-right: 10px;
      display: flex;
      align-items: center;
      .icon {
        font-size: 24px;
        margin-right: 5px;
      }
      .iconContent {
        font-size: 12px;
      }
    }
  }
}
</style>