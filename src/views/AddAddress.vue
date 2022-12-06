<template>
  <div class="address_list">
    <div class="address_nav_top">
      <div @click="$router.back()" class="back iconfont icon-zuojiantou"></div>
      <div class="text">创建新地址</div>
    </div>

    <div class="address_content">
      <div class="address_item">
        <van-address-edit
          :area-list="areaList"
          show-set-default
          show-search-result
          :area-columns-placeholder="['请选择', '请选择', '请选择']"
          @save="onSave"
          save-button-text="保存新地址"
          :address-info="defaultData()"
        />
      </div>
    </div>
    <!-- 添加地址 -->
    <!-- <div class="add_address">
      <div @click="onSave" class="add_address_btn">保存地址</div>
    </div> -->
  </div>
</template>

<script>
import { onBeforeMount} from "vue";
import { useRoute,useRouter } from "vue-router";
import { Toast } from "vant";
import 'vant/es/toast/style';
import { areaList } from "@vant/area-data";
export default {
  setup() {

    

    let route = useRoute()
    let router = useRouter()

    onBeforeMount(()=>{
     defaultData()
      
    });

    // 默认数据
    let defaultData = () => {
      if (JSON.parse(window.localStorage.getItem("addressData"))) {
        
        let oldData = JSON.parse(window.localStorage.getItem("addressData"))
        oldData = oldData.filter(item =>item.id == route.query.data)
        return oldData[0]
      }else{
        return [];

      }

    }

    
    
    const onSave = (e) => {
      
      let addressArr = [];

      let obj = {
        id:parseInt(route.query.data)?parseInt(route.query.data):+new Date(),
        name: e.name,
        tel: e.tel,
        province: e.province,
        city: e.city,
        county: e.county,
        addressDetail: e.addressDetail,
        isDefault: e.isDefault,
        areaCode: e.areaCode,
        country: e.country,
        postalCode: e.postalCode,
      }

      let old = JSON.parse(window.localStorage.getItem("addressData"))
      if (old) {
        console.log(old);

        addressArr = old.filter(item=>item.id!=obj.id)

        if (obj.isDefault) {
          addressArr.forEach(item => {
            item.isDefault = false
          });
        }

        addressArr.unshift(obj)

      }else{
        addressArr.push(obj)
      }

      window.localStorage.setItem("addressData",JSON.stringify(addressArr))
      Toast("保存成功")

      // 跳转路由
      router.go(-1);
    };

    return {
      onSave,
      // 选择城市数组
      areaList,
      defaultData
    };
  },
};
</script>

<style lang="scss" scoped>
.address_list {
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
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
    }
  }
  .add_address {
    position: absolute;
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