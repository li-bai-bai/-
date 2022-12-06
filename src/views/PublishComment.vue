<template>
  <div class="PublishComment">
    <div class="wrapper">
      <div class="header">
        <div
          @click="goto('order')"
          class="header_left iconfont icon-zuojiantou"
        ></div>
        <div class="header_center">发表评价</div>
        <div @click="setComment" class="header_right">发布</div>
      </div>
      <div class="bodyer">
        <div class="img">
          <img :src="goodData.item[0].goodImg" alt="" />
        </div>
        <div class="bodyer_top">
          <p class="type">分类：{{ goodData.brandName }}</p>
          <p class="type">商品：{{ goodData.item[0].goodName }}</p>
          <div class="score">
            <div class="star">
              <p>
                评分：
                <van-rate
                  v-model="value1"
                  :size="20"
                  :count="5"
                  color="#ffd21e"
                  void-icon="star"
                  void-color="#eee"
                  allow-half
                />
              </p>
            </div>
          </div>
        </div>
        <van-divider dashed></van-divider>
        <div class="bodyer_center">
          <!-- <input class="inp" type="text"> -->
         <textarea
            v-model="text"
            placeholder="从多个角度评价宝贝，可以帮助更多想买的人"
            cols="30"
            rows="10"
          ></textarea>
          <!-- <span v-show="text==''" style="font-size:24px;" class="iconfont icon-bianji"></span> -->
        </div>
        <div class="bodyer_bottom">
          <van-uploader v-model="fileList" multiple />
          <!-- :after-read="afterRead" -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import {Toast} from "vant"
import 'vant/es/toast/style';
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    let obj = reactive({
      text: "",
      value1: 0,
      fileList: [],
      goodData: [],
      goodsObj: null,
    });

    onBeforeMount(() => {
      created();
    });

    //商品
    let created = () => {
      obj.goodData = JSON.parse(route.query.id);
    //   console.log(obj.goodData);
    };

    //评论操作
    let setComment = () => {
      if (obj.value1) {

      let commentData = [];

      if (window.localStorage.getItem("commentData")) {
        commentData = JSON.parse(window.localStorage.getItem("commentData"))
      }

      let commentObj = {
        text: obj.text,
        rating: obj.value1,
        imgData: obj.fileList,
        ...obj.goodData,
      };

      commentData.unshift(commentObj);

    //   console.log(commentData);
      //
      window.localStorage.setItem("commentData", JSON.stringify(commentData));

    //   改变订单状态
      let ordersData = JSON.parse(window.localStorage.getItem("ordersData"));
      ordersData.forEach((items) => {
        if (items.brandId == obj.goodData.brandId &&items.timeId == obj.goodData.timeId) {
          items.type = 4;
        }
      });
      window.localStorage.setItem("ordersData", JSON.stringify(ordersData));

      //数据清空
      obj.text="";
      obj.value1 = 0;
      obj.fileList = [];
       

    //,返回订单页
      Toast('感谢您的建议')
      goto('order')
      }else{
        Toast('请为宝贝打分')
      }
     
    };

    //跳转函数
    let goto = (path, id) => {
      router.push({
        name: path,
        query: {
          id,
        },
      });
    };

    return {
      ...toRefs(obj),
      goto,
      setComment,
    };
  },
};
</script>

<style lang="scss" scoped>
.PublishComment {
  height: 100vh;
  background-color: #f7f7f7;
  .wrapper {
    min-width: 320px;
    max-width: 750px;
    margin: 0 auto;
    .header {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #f7f7f7;
      padding: 0 16px;
      position: sticky;
      left: 0;
      top: 0;
      z-index: 5;

      .header_left {
        color: #333;
        font-size: 24px;
        line-height: 50px;
      }
      .header_center {
        font-size: 18px;
        padding-left: 32px;
      }
      .header_right {
        // width: 20px;
        padding: 5px 10px;
        color: #fff;
        border-radius: 15px;
        background-image: linear-gradient(90deg, #fc9632, #f95d25);
      }
    }
    .bodyer {
      background-color: #fff;
      margin: 50px 16px 16px;
      border-radius: 8px;
      position: relative;
      .img {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%) translateY(-40%);
        width: 70px;
        height: 70px;
        img {
          border-radius: 10px;
          width: 100%;
          height: 100%;
        }
      }
      .bodyer_top {
        padding: 50px 50px 0;
        & > p {
          color: #999;
          font-size: 14px;
          line-height: 30px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
        .score {
          display: flex;
          justify-content: space-between;
          .star {
            display: flex;
          }
          p {
            color: #999;
            font-size: 14px;
          }
        }
      }
      .bodyer_center {
        padding: 20px 16px;
        font-size: 14px;
        height: 160px;
        position: relative;
        .iconfont{
          top: 18px;
          left: 15px;
          position: absolute;
          color: #999;
        }
        textarea {
          border: 0;
          width: 100%;
          height: 100%;
          resize: none;
        }
      }
      .bodyer_bottom {
        display: flex;

        padding: 0 16px;
        .van-uploader ::v-deep .van-uploader__wrapper {
          justify-content: space-between;
        }
        .van-uploader ::v-deep .van-uploader__preview-image {
          width: 87px;
          height: 87px;
        }
        .van-uploader ::v-deep .van-uploader__upload {
          width: 87px;
          height: 87px;
        }
      }
    }
  }
}
</style>