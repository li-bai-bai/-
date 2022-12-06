<template>
    <div class="care">
        <div class="nav">
            <div @click="$router.go(-1)" class="left iconfont icon-zuojiantou"></div>
            <h5>{{Myinfo.name}}</h5>
            <p style="width:24px;"></p>
        </div>
        <div class="null"></div>
    
    <div class="tabs">
      <van-tabs 
      sticky offset-top="38"
      animated 
      swipeable 
      title-inactive-color="#adadad"
      title-active-color="#000"
      line-height="3px"
      line-width="25px"

      >
        <van-tab  title-class="Lit_tabs"  title='关注 '>
          <div class="content">
            <div class="box" v-for="item in follow" :key="item.articleId">
              <div class="user" @click="gouser(item.user_id)">
                <div class="userimg">
                  <img :src="item.operateHeadImg" alt="" class="auto-img">
                </div>
                <div class="username">{{item.operateUserName}}</div>
              </div>
              <div class="btn" @click="followFun(item.user_id)">
                <div class="follow con" v-if="!item.follow">关注</div>
                <div class="follow " v-if="item.follow">已关注</div>
              </div>
            </div>
            <van-empty v-if="follow.length==0" description="暂无关注"/>
          </div>
        </van-tab>
        <van-tab  title-class="Lit_tabs"  title='粉丝 '>
          <van-empty description="暂无粉丝"/>
        </van-tab>
     
      </van-tabs>
    </div>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useRouter } from 'vue-router'
export default {
    setup () {
      let router = useRouter();
      let list = reactive({
        //关注数据
        follow:[],
        // 全部数据
        Alldata:[],
        // 个人信息
        Myinfo:[],
      })
      let created=()=>{
        //判断是否有所有详情页数据
        if(window.localStorage.getItem("articleDetails")){
            list.Alldata=JSON.parse(window.localStorage.getItem("articleDetails"));
        }
        list.follow=list.Alldata.filter(item=>item.follow==true);
        window.localStorage.setItem("follow",JSON.stringify(list.follow))
        
        //判断是否有所有详情页数据
        if(window.localStorage.getItem("follow")){
            list.follow=JSON.parse(window.localStorage.getItem("follow"));
        }

        //判断是否有所有详情页数据
        if(window.localStorage.getItem("Myinfo")){
            list.Myinfo=JSON.parse(window.localStorage.getItem("Myinfo"))[0];
        }
      }
      // 点击关注
      let followFun = (id)=>{
        let index = list.Alldata.findIndex(item=>item.user_id==id);
        if(list.Alldata[index].follow){
          list.Alldata[index].follow=false;
          // 所有详情页数据
          window.localStorage.setItem("articleDetails",JSON.stringify(list.Alldata));
        }else if(!list.Alldata[index].follow){
          list.Alldata[index].follow=true;
          // 所有详情页数据
          window.localStorage.setItem("articleDetails",JSON.stringify(list.Alldata));
        }
        created();
      }
      let gouser=(id)=>{
        router.push({
          path:"/authorHomePage",
          query:{
            id
          }
        })
      }
      created();
        return {
          ...toRefs(list),
          followFun,
          gouser
        }
    }
}
</script>

<style lang="scss" scoped>
.care{
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
    height: 38px;
  }
  .tabs{
    ::v-deep .Lit_tabs{
      
      font-weight: bold;
    }
    ::v-deep .van-sticky--fixed{
      width: 100%;
      min-width: 320px;
      max-width: 750px;
    }
    .content{
      padding: 10px 12px 0px;
      .box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        font-size: 13px;
        border-bottom: 1px solid #eee;
        .user{
          display: flex;
          align-items: center;
          .userimg{
            width: 35px;
            height: 35px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 8px;
          }
        }
        .btn{
          display: flex;
          align-items: center;
          font-size: 12px;
          .follow{
            width: 70px;
            height: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #ccc;
            border-radius: 15px;
            color: #838383;

          }
          .con{
            background-color: #EA3F49;
            opacity: 0.9;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>