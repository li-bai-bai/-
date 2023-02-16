<template>
  <div class="address_list">
    <div class="address_nav_top">
      <div @click="$router.back()" class="back iconfont icon-zuojiantou"></div>
      <div class="text">地址列表</div>
    </div>

    <div class="address_content" v-show="addressData">

      <van-swipe-cell v-for="item in addressData" :key="item.id">
        <div class="address_item" @click.stop="setAddress(item.id)">
          <div class="address_item_title">
            <!-- 默认 -->
            <div class="default" v-show="item.isDefault">默认</div>
            <div class="address_item_name">{{ item.name }}</div>
            <div class="address_item_number">{{ item.tel }}</div>
          </div>
          <!-- 详细地址 -->
          <div class="address_item_full">
            {{ item.province }} {{ item.city }} {{ item.county }}
            {{ item.addressDetail }}
          </div>
          <!-- 编辑 -->
          <div
            @click="edit(item.id)"
            class="address_item_edit iconfont icon-bianji"
          ></div>
        </div>
        <template #right>
          <van-button
            @click="delAddress(item.id)"
            text="删除"
            type="danger"
            class="delete-button"
          />
        </template>
      </van-swipe-cell>

      <!-- 没有地址显示 -->
      <div
        class="address_item_null"
        v-show="addressData && !addressData.length"
      >
        <div class="iconfont icon-dizhi"></div>

        <p>还没有地址哦，请添加新地址~</p>
      </div>
    </div>
    <!-- 添加地址 -->
    <div class="add_address">
      <router-link custom to="/addAddress" v-slot="{ navigate }">
        <div @click="navigate" class="add_address_btn">添加新地址</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, } from "vue";
import { useRouter,useRoute } from "vue-router";
import { useStore } from '../store/index.js'
export default {
  setup() {
    // 获取vue-router对象
    const router = useRouter();
    const route = useRoute();

    // 获取pinia对象
    let store = useStore();
    console.log(store.address);

    let list = reactive({
      addressData: [],
    });
    
    // 初始化判断
    let created = () => {
      // 判断是否有地址
      if (JSON.parse(window.localStorage.getItem("addressData"))) {
        list.addressData = JSON.parse(
          window.localStorage.getItem("addressData")
        );
      }

        

      // if(store.address){
      //   list.addressData = store.address
      // }
    };
    // 调用方法
    created();

    let setAddress = (id)=>{
      if(route.query.id){

        let index = list.addressData.findIndex(item => item.id == id)
        console.log(index);
         window.localStorage.setItem("address",JSON.stringify(list.addressData[index]))

         router.go(-1)
        }
    }

    //将地址id传过去
    let edit = (id) => {
      // console.log(obj);
      router.push({
        name: "addAddress",
        query: {
          data: id,
        },
      });
    };

    // 删除功能
    let delAddress = (id) => {
      list.addressData = list.addressData.filter((item) => item.id != id);

      // 修改pinia
      // store.$patch({
      //   address:list.addressData
      // })
      window.localStorage.setItem(
        "addressData",
        JSON.stringify(list.addressData)
      );
    };

    return {
      ...toRefs(list),
      created,
      edit,
      delAddress,
      setAddress,
    };
  },
};
</script>

<style lang="scss" scoped>
.address_list {
  .goods-card {
    margin: 0;
    background-color: white;
  }

  .delete-button {
    height: 100%;
  }
  width: 100%;
  // height: 100%;
  background-color: #fafafa;
  height: 100vh;
  .address_nav_top {
    position: relative;
    // margin-top: 11px;
    background-color: #fff;
    padding: 14px;
    color: #373737;
    font-size: 15px;
    text-align: center;
    .back {
      position: absolute;
      left: 17px;
      color: #393939;
      font-size: 24px;
      font-weight: 500;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .address_content {
    padding: 0 8px;
    border-top: 1px solid #eee;
    .address_item {
      position: relative;
      margin-top: 10px;
      background-color: #fff;
      border-radius: 8px;
      padding: 16px;
      .address_item_title {
        display: flex;
        align-items: center;
        .default {
          margin-right: 4px;
          width: 27px;
          height: 17px;
          background-color: #333333;
          color: #fff;
          text-align: center;
          line-height: 17px;
          font-size: 12px;
          transform: scale(0.9);
          border-radius: 2px;
        }
        .address_item_name {
          margin-right: 4px;
          color: #373737;
          font-size: 13px;
        }
        .address_item_number {
          color: #8f8f8f;
          font-size: 12px;
        }
      }
      .address_item_full {
        margin-top: 10px;
        line-height: 17px;
        width: 289px;
        color: #404040;
        font-size: 12px;
      }
      .address_item_edit {
        position: absolute;
        right: 17px;
        top: 50%;
        transform: translateY(-50%);
        color: #9a9a9a;
        font-size: 24px;
      }
    }
    .address_item_null {
      margin-top: 50%;
      height: 100%;
      color: #ababab;
      text-align: center;
      .iconfont {
        font-size: 70px;
      }
      p {
        margin-top: 50px;
        font-size: 14px;
        text-align: center;
      }
    }
  }
  .add_address {
    position: absolute;
    border-top: 1px solid #eeeeee;
    background-color: #fff;
    bottom: 0;
    width: 100%;
    padding: 8px 0;
    .add_address_btn {
      width: 343px;
      height: 40px;
      border-radius: 40px;
      text-align: center;
      line-height: 40px;
      margin: 0 auto;
      color: #fff;
      font-size: 14px;
      background-color: #e93f48;
    }
  }
}
</style>