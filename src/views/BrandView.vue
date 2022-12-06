<template>
  <div class="myhome">
    <div class="my_banner">
      <div class="brand">
        <div @click="back" class="back iconfont icon-zuojiantou"></div>

        <div class="brand_name">
          <div class="name">
            <div class="img">
              <img
                :src="brandData.currentSingleProduct.goodsImgs[0].imgUrl"
                alt=""
              />
            </div>
            {{ brandData.brandName }}
          </div>
          <div class="reputation">
            卖家口碑
            <van-rate v-model="value" void-color="#eee" :size="12" allow-half />
            <span>4.60</span>
          </div>
        </div>
        <div class="moer iconfont icon-gengduo"></div>
      </div>
    </div>

    <div class="my_note_collection_liked">
      <div class="my_note_content">
        <van-tabs
          v-model:active="active"
          swipeable
          animated
          title-inactive-color="#808080"
          title-active-color="#2F2F2F"
          offset-top="0px"
          sticky
        >
          <van-tab v-for="index in 1" :title="'商品'" :key="index">
            <div class="goods_list">
              <!-- 左边商品 -->
              <div class="left_goods" >
                <div @click="back" class="item" v-for="item in leftData" :key="item.specificationId">
                  <!-- 图片 -->
                  <div class="goods_img">
                    <img :src="item.goodsImgs[0].imgUrl" alt="" />
                  </div>
                  <!-- 描述 -->
                  <div class="goods_text">
                    <!-- name -->
                    <div class="goods_title">{{item.value}}</div>
                    <!-- 价格 -->
                    <div class="goods_price">
                      <div class="new_price">￥{{item.price}}</div>
                      <div class="kill_price">￥{{item.originalPrice}}</div>
                    </div>
                    <!-- 两件打折 -->
                    <span class="discount">{{item.stock}}人付款 </span>
                    <!-- 店铺 -->
                    <div class="store">
                      nike 旗舰店
                      <span class="iconfont icon-youjiantou1"></span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 右边商品 -->
              <div class="right_goods">
                <div @click="back" class="item" v-for="item in rightData" :key="item.specificationId">
                  <!-- 图片 -->
                  <div class="goods_img">
                    <img :src="item.goodsImgs[0].imgUrl" alt="" />
                  </div>
                  <!-- 描述 -->
                  <div class="goods_text">
                    <!-- name -->
                    <div class="goods_title">{{item.value}}</div>
                    <!-- 价格 -->
                    <div class="goods_price">
                      <div class="new_price">￥{{item.price}}</div>
                      <div class="kill_price">￥{{item.originalPrice}}</div>
                    </div>
                    <!-- 两件打折 -->
                    <span class="discount">{{item.stock}}人付款 </span>
  
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>

    <!-- 顶部导航组件 -->
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    let obj = reactive({
      value: 4.6,
      active: 0,
      brandData: null, //品牌数据，
      leftData:null,
      rightData:null,
    });

    const router = useRouter();
    const route = useRoute();

    onBeforeMount(() => {
      getData();
    });

    let getData = () => {
      let brandData = JSON.parse(
        window.localStorage.getItem("goodDetailList")
      ).filter((item) => item.brandId == route.query.id);
      obj.brandData = brandData[0];
      console.log(obj.brandData);
      obj.leftData = obj.brandData.specificationsList.splice(0,obj.brandData.specificationsList.length/2)
      obj.rightData = obj.brandData.specificationsList.splice(0,obj.brandData.specificationsList.length)
      //specificationsList
      console.log(obj.leftData);
      console.log(obj.rightData);
    };

    let goto = (path, id) => {
      router.push({
        name: path,
        query: {
          id,
        },
      });
    };

    let back = () => {
      router.go(-1);
    };

    return {
      ...toRefs(obj),
      goto,
      back,
    };
  },
};
</script>

<style lang="scss" scoped>
.myhome {
  height: 100vh;

  .my_banner {
    padding-top: 20px;
    height: 118px;
    background: linear-gradient(#444365, #6264705f);
    .brand {
      padding: 17px;
      display: flex;

      .brand_name {
        font-size: 14px;
        color: #fff;
        flex: 1;
        .name {
          display: flex;
          align-items: center;
          .img {
            margin-right: 5px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }

        .reputation {
          display: flex;
          align-items: center;
          font-size: 12px;
          margin-top: 18px;
          span {
            color: #ee0a24;
          }
        }
      }
      .back,
      .moer {
        color: #fff;
        font-size: 24px;
      }
      .back {
        transform: translateX(-8px);
      }
    }
  }

  .my_note_collection_liked {
    padding-top: 16px;
    background-color: #6163705b;
    .my_note_content {
      background-color: #fafafa;
      border-top-right-radius: 18px;
      border-top-left-radius: 18px;
      overflow: hidden;
      .goods_list {
        padding: 0 5px;
        background-color: #fafafa;
        display: flex;
        justify-content: space-between;
        .left_goods,
        .right_goods {
          .item {
            background-color: #fff;
            margin-top: 8px;
            width: 180px;
            border-radius: 4px;
            overflow: hidden;
            .goods_img {
              width: 100%;
              img {
                width: 100%;
              }
            }
            .goods_text {
              padding: 13px 9px;
              .goods_title {
                color: #353535;
                font-size: 14px;
                overflow: hidden;
                -webkit-line-clamp: 2;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                text-overflow: ellipsis;
                line-height: 18px;
              }
              .discount {
                display: inline-block;
                font-size: 12px;
                color: #a3a3a3;
                margin-top: 4px;
                transform: scale(0.9) translateX(-2px);
                border-radius: 2px;
                border: 1px solid #f8f8f8;
                padding: 2px 3px;
              }
              .goods_price {
                display: flex;
                margin-top: 6px;
                .new_price {
                  font-size: 12px;
                  color: #414141;
                }
                .kill_price {
                  font-size: 12px;
                  color: #9a9a9a;
                  transform: scale(0.8);
                  text-decoration: line-through;
                }
              }
              .store {
                margin-top: 4px;
                font-size: 12px;
                transform: scale(0.9) translateX(-6px);
                color: #c1c1c1;

                display: flex;
                align-items: center;
              }
            }
          }
        }
      }
    }
  }
}
</style>