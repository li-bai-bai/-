<template>
  <div class="navbar">
    <div class="nav_content">
      <router-link custom :to="{name:'home'} " v-slot="{ href,navigate, isActive }">
        <div
          :href="href"
          @click="navigate"
          :class="['item', isActive && 'router-link-active']"
        >
          首页
        </div>
      </router-link>

      <router-link
        custom
        to="/shopping"
        v-slot="{ href, navigate, isActive }"
      >
        <div
          :href="href"
          @click="navigate"
          :class="['item', isActive && 'router-link-active']"
        >
          购物
        </div>
      </router-link>

      <!-- 加号 -->
       <router-link
        custom
        to="/release"
        v-slot="{ href, navigate, isActive }"
      >
        <div
          :href="href"
          @click="navigate"
          :class="['publish','iconfont',,'icon-jiahao','item', isActive && 'router-link-active']"
        >
          购物
        </div>
      </router-link>
       

       <router-link
        custom
        to="/service"
        v-slot="{ href, navigate, isActive }"
      >
        <div
          :href="href"
          @click="navigate"
          :class="['item', isActive && 'router-link-active']"
        >
          服务
        </div>
      </router-link>

       <router-link
        custom
        to="/myhome"
        v-slot="{ href, navigate, isActive }"
      >
        <div
          :href="href"
          @click="navigate"
          :class="['item', isActive && 'router-link-active']"
        >
          我
        </div>
      </router-link>


    </div>
    <!-- 防止遮挡底部内容-->
    <div class="footer"></div>

  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.navbar {
   
  .nav_content {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-top: 1px solid #F6F6F6;
    background-color: #fff;
    height: 46px;
    position: fixed;
    bottom: 0;
    min-width: 320px;
    max-width: 750px;
    width: 100%;
    z-index: 3;
    .item {
      font-size: 15px;
      font-weight: bold;
      color: #9e9e9e;
      &.router-link-active {
        color: #343434;
        
      }
      &:last-of-type{
        padding: 0 5px;
      }
    }
    .publish{
        width: 47px;
        height: 35px;
        background-color: #FF2744;
        border-radius: 14px;
        color: #fff;
        text-align: center;
        line-height: 35px;
        font-size: 24px;
        font-weight: 700;
    }
  }
  .footer{
    height: 47px;
  }
}
</style>