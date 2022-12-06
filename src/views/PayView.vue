<template>
  <div class="pay">
    <div class="nav">
      <div @click="goto('car')" class="left iconfont icon-zuojiantou"></div>
      <h5>订单支付</h5>
      <p></p>
    </div>
    <div class="null"></div>
    <div class="main">
      <div class="address">
        <div class="address_l" v-if="address">
          <div class="info">
            <div v-show="address.isDefault" class="default">
              <span >默认</span>
            </div>
            <div class="name">{{address.name}} {{address.tel}}</div>
          </div>
          <div class="address_info">
            {{address.province}} {{address.city}} {{address.county}} {{address.addressDetail}}
          </div>
        </div>
         <div class="address_l" v-if="!address">
          <div class="address_info">
            请选择默认地址
          </div>
        </div>
        <div class="address_r iconfont icon-youjiantou" @click="goto('addressList',true)"></div>
      </div>
      <div class="shop" @click="show = !show">
        <div class="shop_l">
          <div class="imgbox" v-for="item in ordersImg" :key="item.goodId">
            <img
              class="auto-img"
              :src="item.goodImg"
              alt=""
            />
          </div>
          <!-- <div class="imgbox">
            <img
              class="auto-img"
              src="../assets/images/ia_2900000000.jpg"
              alt=""
            />
          </div>
          <div class="imgbox">
            <img
              class="auto-img"
              src="../assets/images/ia_2900000000.jpg"
              alt=""
            />
          </div>
          <div class="imgbox">
            <img
              class="auto-img"
              src="../assets/images/ia_2900000000.jpg"
              alt=""
            />
          </div> -->
        </div>
        <div class="shop_r">
          <div class="num">共 {{goodsNum()}} 件</div>
          <div class="lit">(可留言)</div>
        </div>
        <div class="icon iconfont icon-youjiantou"></div>
      </div>
      <div class="price">
        <div class="money">
          <div class="title">商品金额</div>
          <div class="shop_money">￥{{num}}</div>
        </div>
        <div class="money">
          <div class="title">运费</div>
          <div class="shop_money">￥0</div>
        </div>
        <div class="line"></div>
        <div class="total">总计:￥<span>{{num}}</span></div>
      </div>
      <div class="payment">
        <div class="title">请选择支付方式</div>
        <div class="method">
          <van-radio-group v-model="checked">
            <div class="box">
              <div class="left">
                <div
                  class="logo iconfont icon-alipay"
                  style="color: #2671ff"
                ></div>
                <p>支付宝</p>
              </div>
              <van-radio name="1" checked-color="#ee0a24" />
            </div>
            <div class="box" style="border: 0">
              <div class="left">
                <div
                  class="logo iconfont icon-weixin1"
                  style="color: #16d46b"
                ></div>
                <p>微信</p>
              </div>
              <van-radio name="2" checked-color="#ee0a24" />
            </div>
          </van-radio-group>
        </div>
      </div>
    </div>
    <div class="null" style="height: 60px"></div>
    <div class="totalbox">
      <div class="right">
        <p>总计：</p>
        <div class="total">￥{{num}}</div>
      </div>
      <div @click="setOrder" class="btn">结算</div>
    </div>
    <van-popup
      v-model:show="show"
      position="bottom"
      round
      :style="{ height: '80%' }"
    >
      <div class="popup">
        <div class="navbtm">
          <h4>商品清单</h4>
          <div @click="show = !show" class="icon iconfont icon-guanbi1"></div>
        </div>
        <div class="shopping">
          <div class="content" v-for="items in ordersData" :key="items.brandId">
            <div class="titlebox">
              <div class="userimg">
                <img :src="items.brandImg" alt="" class="auto-img" />
              </div>
              <div class="name">{{ items.brandName }}</div>
            </div>
            <div class="main" v-for="item in items.item" :key="item.goodId">
              <div class="imgbox">
                <img
                  :src="item.goodImg"
                  alt=""
                  class="auto-img"
                />
              </div>
              <div class="shop_info">
                <div class="lit">
                  {{item.goodName}}
                </div>
                <p>{{item.goodValue}}</p>
                <div class="li">7天无理由退货</div>
                <div class="pricebox">
                  <div class="new">￥{{item.goodPrice}}</div>
                  <div class="num" style="font-size: 16px">x{{item.goodNums}}</div>
                </div>
              </div>
            </div>
            
            <div class="freight">
              <div class="freight_price">运费</div>
              <div class="freight_right">免运费</div>
            </div>
            <div class="comments">
              <div class="comments_left">订单备注</div>
              <input type="text" placeholder="和商家协商一致后留言" />
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="paybtn" @click="show = !show">返回结算</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount,computed,onBeforeUnmount } from "vue";
import {useRouter } from 'vue-router';
import { Dialog, Toast } from 'vant';
import 'vant/es/dialog/style';
import 'vant/es/toast/style';
export default {
  setup() {
    let list = reactive({
      checked: "1",
      show: false,
      ordersData: [],
      ordersImg: [],
      address: null,
    
    });

    const router = useRouter()

    let created = () => {
      let carOrderData = JSON.parse(
        window.localStorage.getItem("carOrderData")
      );
    //   判断是否地址
    if(window.localStorage.getItem('address')){
           //获取默认地址
        list.address = JSON.parse(window.localStorage.getItem("address"))
    }else if(JSON.parse(window.localStorage.getItem("addressData"))){
        let addressData = JSON.parse(window.localStorage.getItem("addressData"));
        addressData = addressData.filter((item) =>  item.isDefault);
        list.address = addressData[0];
    }
      

      //获取品牌和选择商品
      //判断有没有立即购买商品
      if (window.localStorage.getItem("buyNowData")) {

        let buyNowData = JSON.parse(window.localStorage.getItem("buyNowData"))
        list.ordersData.push(buyNowData)

        list.ordersImg = buyNowData.item.filter(item => {
          return item.goodImg
        })

      }else{//没有就拿购物车选中商品
        list.ordersData = carOrderData.filter((items) => {
        
          items.item = items.item.filter((item) => item.checked);

          return items.item.length;
        });

        //获取图片
        carOrderData.forEach(items => {
          items.item.forEach(item => {
              if (item.checked) {
                  list.ordersImg.push(item)
              }
          });
        });
        list.ordersImg = list.ordersImg.splice(0,4);
      }
      
     


    //   console.log(list.ordersData);
    //   console.log(list.address);
    //   console.log(list.ordersImg);
    };

    onBeforeMount(() => {
      created();
    });

    //计算总价
    const num = computed(() => {
      return list.ordersData.reduce((total, items) => {
        items.item.forEach((good) => {
          if (good.checked) {
            total += good.goodPrice * good.goodNums;
          }
        });
        return total;
      }, 0);
    });


    //跳转路由
     let goto = (path,goodId) => {
      router.push({
        name: path,
        query: {
          id: goodId,
        },
      });
    };

    // 点击结算后要调用的函数，不管支不支付都要去掉购物车订单选中状态，然后生成已支付或待支付订单
    let setNewCarOrderData = ()=>{
        let carOrderData = JSON.parse(window.localStorage.getItem("carOrderData"));

           let newCarOrderData = carOrderData.filter((items) => {
                items.item = items.item.filter((item) => !item.checked);

                return items.item.length;
            });

            // console.log(newCarOrderData);
            window.localStorage.setItem("carOrderData",JSON.stringify(newCarOrderData))
    }

    // 制作新的购物车订单
    let paySucceed = (type)=>{

            let oldOrdersData = []//旧的
            let newOrdersData = []//新的

            // 旧的订单
            if (JSON.parse(window.localStorage.getItem("ordersData")) ) {
                oldOrdersData = JSON.parse(window.localStorage.getItem("ordersData") )
            }else{
                // console.log("没有旧数据");
            }

            // 制作新的订单

            list.ordersData.forEach(items => {
                items.timeId = (+new Date()+1200000);
                items.address = list.address;
                items.type = type;
                // console.log(items);
            });

            // 
            newOrdersData = list.ordersData
            newOrdersData.push(...oldOrdersData)
            // console.log(newOrdersData);
            window.localStorage.setItem("ordersData",JSON.stringify(newOrdersData))
    }

    // 制作立即购买订单
    let buyNow = (type)=>{
            paySucceed(type);

            goto('order');
            window.localStorage.removeItem("buyNowData")

    }

    // 购买商品数量

    let goodsNum = ()=>{
      let length = 0
      list.ordersData.forEach( items => {
        length += items.item.length
      })
      return length
    }


    //生成支付订单
    let setOrder = ()=> {
      if(!list.address){
        Toast("请添加地址");
        return
      }
      if (window.localStorage.getItem("buyNowData")) {
        Dialog.confirm({
        title: '确认支付',
        message:'',
        }).then(() => {
            // 支付成功
            console.log("支付成功");
            buyNow(2)
            Toast("支付成功")
          
        }).catch(() => {
            //支付失败
            console.log("支付失败");
            buyNow(1)
            Toast("支付失败")
          
        });
      }else{

         Dialog.confirm({
        title: '确认支付',
        message:'',
        }).then(() => {
            // 支付成功
            console.log("支付成功");
            paySucceed(2)
            setNewCarOrderData()
            goto('order')
            Toast("支付成功")
        }).catch(() => {
            //支付失败
            console.log("支付失败");
            paySucceed(1)
            goto('order')
            Toast("支付失败")
            setNewCarOrderData()
        });
      }
       
    }

    onBeforeUnmount(()=>{
      window.localStorage.removeItem("buyNowData")
    })

    return {
      ...toRefs(list),
      num,
      goto,
      setOrder,
      goodsNum
    };
  },
};
</script>

<style lang="scss" scoped>
.pay {
  background-color: #f7f7f7;
  min-height: 100vh;
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
      width: 24px;
      font-size: 14px;
    }
  }
  .null {
    width: 100%;
    height: 50px;
  }
  .main {
    padding: 0 10px;
  }
  .address {
    padding: 17px 9px;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 10px;
    box-shadow: 0 0 1px #ccc;
    .address_l {
      width: 95%;
      .info {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        .default {
          border: 1px solid #ccc;
          border-radius: 3px;
          padding: 2px;
          font-size: 12px;
          margin-right: 5px;
          span {
            transform: scale(0.9);
            display: inline-block;
          }
        }
        .name {
          font-size: 12px;
        }
      }
      .address_info {
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .address_r {
      color: #ccc;
      font-size: 18px;
    }
  }
  .shop {
    padding: 21px 10px;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 10px;
    box-shadow: 0 0 1px #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .shop_l {
      width: 260px;
      display: flex;
      .imgbox {
        width: 58px;
        height: 58px;
        border-radius: 8px;
        overflow: hidden;
        margin-right: 7px;
      }
    }
    .shop_r {
      text-align: center;
      font-size: 14px;
      .lit {
        margin-top: 5px;
        font-size: 12px;
        color: #ccc;
      }
    }
    .icon {
      font-size: 18px;
      color: #ccc;
    }
  }
  .price {
    padding: 20px 10px;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 10px;
    box-shadow: 0 0 1px #ccc;
    .line {
      height: 1px;
      background-color: #eee;
    }
    .money {
      display: flex;
      justify-content: space-between;
      margin-bottom: 17px;
      .title {
        font-size: 13px;
      }
      .shop_money {
        font-size: 14px;
      }
    }
    .total {
      margin-top: 15px;
      display: flex;
      justify-content: flex-end;
      font-size: 13px;
      span {
        font-size: 16px;
      }
    }
  }
  .payment {
    font-size: 14px;
    padding: 20px 10px 15px;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 10px;
    box-shadow: 0 0 1px #ccc;
    .title {
      text-align: center;
    }
    .method {
      .box {
        height: 45px;
        display: flex;
        border-bottom: 1px solid #eee;
        align-items: center;
        justify-content: space-between;
        .left {
          display: flex;
          align-items: center;
        }
      }
      .logo {
        font-size: 20px;
        margin-right: 8px;
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
    }
    .btn {
      font-size: 14px;
      border-radius: 18px;
      color: #fff;
      width: 105px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background-color: #ea4149;
    }
  }
  :deep .van-popup__close-icon {
    font-size: 18px;
  }
  .popup {
    background-color: #f7f7f7;
    position: relative;
    .navbtm {
      position: fixed;
      background-color: #fff;
      border-top-right-radius: 25px;
      border-top-left-radius: 25px;
      width: 100%;
      padding: 18px 0 16px;
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
      h4 {
        font-size: 15px;
      }
      .icon {
        color: #898989;
        font-size: 18px;
        position: fixed;
        right: 15px;
        margin-top: -1px;
      }
    }
    .shopping {
      padding: 60px 10px;
      .content {
        padding: 15px 10px;
        border-radius: 8px;
        margin-bottom: 10px;
        background-color: #fff;
        .titlebox {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          .userimg {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            overflow: hidden;
            border: 1px solid #999;
          }
          .name {
            font-size: 12px;
            margin-left: 5px;
          }
        }
        .main {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
          .imgbox {
            width: 85px;
            height: 85px;
            border-radius: 8px;
            overflow: hidden;
            margin-right: 10px;
          }
          .shop_info {
            width: 230px;
            .lit {
              font-size: 14px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              margin-bottom: 5px;
            }
            p {
              font-size: 12px;
              color: #898989;
              margin-bottom: 3px;
            }
            .li {
              width: 85px;
              height: 15px;
              font-size: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #e67582;
              border-radius: 3px;
              margin-bottom: 5px;
              border: 1px solid #c787a7;
            }
            .pricebox {
              display: flex;
              justify-content: space-between;
              font-size: 15px;
            }
          }
        }
        .freight {
          margin-top: 10px;
          margin-bottom: 15px;
          display: flex;
          justify-content: space-between;
          .freight_price {
            font-size: 14px;
          }
          .freight_right {
            font-size: 14px;
            font-weight: bold;
          }
        }
        .comments {
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          input {
            width: 142px;
            box-sizing: border-box;
            border: 0;
            outline: none;
          }
        }
      }
    }
    .footer {
      position: fixed;
      z-index: 99;
      bottom: 0;
      height: 60px;
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      box-shadow: 0 0 2px #ccc;
      width: 100%;
      min-width: 320px;
      max-width: 750px;
      .paybtn {
        width: 100%;
        height: 40px;
        border-radius: 25px;
        font-size: 14px;
        color: #fff;
        line-height: 40px;
        background-color: #ea4149;
        text-align: center;
      }
    }
  }
}
</style> 