<template>
  <div class="wish_page">
    <div class="wish_title">
      <van-nav-bar
        title="心愿单"
        
        left-arrow
        @click-left="$router.go(-1)"
      />
    </div>

    <div class="wish_list">
        <div style="height: 46px;"></div>

      <div class="wish_item" v-for="item in wishData" :key="item.specificationId">
        <van-card
          :price="item.price"
          :title="item.brandName+item.value"
          :thumb="item.goodsImgs[0].imgUrl"
          @click="goto('goodsdetails',item.brandId)"
        >
          <template #footer>
            <van-button @click.stop="setWishData(item.specificationId)" style="position: absolute;right: 16px;bottom: 10px;border-radius: 3px;color:#D75663;border-color:#D75663;" size="mini">取消收藏</van-button>
            <!-- <van-button style="border-radius: 3px;color:#9E9E9E;" size="mini">已加入购物车</van-button> -->
          </template>
        </van-card>
      </div>

      <van-empty description="请添加收藏"  v-if="wishData.length == 0"/>


    </div>
  </div>
</template>

<script>
import {reactive,toRefs,onBeforeMount} from "vue"
import {useRouter} from "vue-router"
export default {
  setup() {

    let obj = reactive({
        wishData:[]
    })

    const router = useRouter()

    onBeforeMount(()=>{
        created()
    })

    let created =()=>{
        if (window.localStorage.getItem("wishData")) {
            obj.wishData = JSON.parse(window.localStorage.getItem("wishData"))
        }
        console.log(obj.wishData);
    }

    // 取消收藏
    let setWishData =(id)=>{
        obj.wishData = obj.wishData.filter( item => item.specificationId !=id)
        window.localStorage.setItem("wishData",JSON.stringify(obj.wishData))

    }

    let goto =(path,id)=>{
        console.log(path,id);
        router.push({
            name:path,
            query:{
                id
            }
        })
    }

    return {
        ...toRefs(obj),
        setWishData,
        goto
    };
  },
};
</script>

<style lang="scss" scoped>
.wish_page {
    .wish_title{
        position: fixed;
        top: 0;
        z-index: 3;
        width: 100%;
    }
    .wish_list{
        .wish_item{
            margin-top: 10px;
            position: relative;
        }
    }
    
    :deep{
      .van-badge__wrapper{
        color: #000;
        font-size: 20px;
      }
    }
}
</style>