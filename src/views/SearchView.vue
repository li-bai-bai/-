<template>
  <div class="search_page">
    <!-- 头部搜索 -->
    <div class="search_top">
      <!-- 返回 -->
      <div class="back iconfont icon-zuojiantou" @click="$router.go(-1)"></div>
      <!-- 搜索框盒子 -->
      <div class="input_box">
        <div class="icon iconfont icon-sousuo"></div>

        <input type="text" v-model="value" :placeholder="history[0]" />
      </div>
      <!-- 搜索 -->
      <div class="cancel" @click="goto">搜索</div>
    </div>

    <!-- 主体 -->
    <div class="search_main">
      <!-- 历史记录 -->
      <div class="history_record" v-show="history.length">
        <div class="title">
          历史记录
          <!-- 删除 -->
          <div @click="del" class="delete iconfont icon-shanchu"></div>
        </div>

        <div class="ul">
          <div @click="pushValue(item)" class="li" v-for="(item,index) in history" :key="index">{{item}}</div>
        </div>
      </div>
      
      <!-- 猜你想搜 -->
      <div class="want_search">
        <div class="title">
          猜你想搜
          <!-- 换一换 -->
          <div class="change_it">
            <span class="iconfont icon-shuaxin" @click="radom"></span>
            换一换
          </div>
        </div>
        <div class="ul">
          <div class="li" v-for="item in guessList" :key="item.id" @click="pushValue(item.note_card.user.nick_name)">{{item.note_card.user.nick_name}}</div>
          
        </div>
      </div>

      <!-- 搜索发现 -->
      <div class="search_found">

        <div class="title">
            <div class="txt"> 搜索发现</div>
          <!-- 换一换 -->
          <div class="change_it">
            <span class="iconfont icon-shuaxin" @click="radomList"></span>
            换一换
          </div>
        </div>

        <div class="list">

            <div class="lis" v-for="(item,index) in hotList" :key="item.id" >
                <!-- 小圆点 颜色1 frist,2 tow,3 the -->
                <div :class="['dot',{'frist':index == 0},{'tow':index == 1},{'the':index == 2}]"></div>

                <div class="text" @click.stop="getArticleDetailFun(item.id)">
                  <span>{{item.note_card.display_title}}</span>
                    <!-- 热 hot，新 new -->
                    <div class="hot">热</div>
                </div>

                <!-- 搜索量 -->
                <div class="search_nums">
                    {{getFilter(item.note_card.interact_info.liked_count) }}
                    <!-- 上升颜色 rise，下降颜色 down-->
                    <span class="rise iconfont "></span>
                </div>
                
            </div>
            

        </div>

      </div>

    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import {useRouter} from "vue-router"

export default {
  setup() {

    const router = useRouter()
    // 声明变量
    let list = reactive({
      value:"",  //搜索关键字
      history:[],  //历史记录
      listdata:[],  //首页推荐笔记
      listdataCopy:[],  //首页推荐笔记拷贝
      guessList:[],  //猜你想搜
      hotList:[]  //热搜榜
    })

     // 跳转详情页
    let getArticleDetailFun = (id)=>{
      router.push({
        path:"/Details",
        query:{
          id
        }
      })
    }

    // 初始化判断
    let created = () => {
      // 判断是否有历史记录
      if (JSON.parse(window.localStorage.getItem("homeSearchHistory"))) {
        list.history = JSON.parse(
          window.localStorage.getItem("homeSearchHistory")
        );
        
      }

      // 判断是否有首页笔记推荐详情
      if(JSON.parse(window.localStorage.getItem("listdata"))){
        list.listdata = JSON.parse(window.localStorage.getItem("listdata"));
        list.listdataCopy = JSON.parse(window.localStorage.getItem("listdata"));
        // 数组热度排序
        list.listdataCopy = list.listdataCopy.sort((a,b)=>{
           return b.note_card.interact_info.liked_count - a.note_card.interact_info.liked_count 
        })
        // 设置猜你想搜数组
        list.guessList = list.listdata.slice(0,4);

        // 设置热搜数组
        list.hotList = list.listdataCopy.slice(0,7);
        console.log(list.hotList);
      // console.log(list.guessList);
      }
      // let i= parseInt(Math.random()*10)

    };
    // 调用方法
    created();

    // 猜你想搜换一换
    let radom = ()=>{
      let i= parseInt(Math.random()*16);
      list.guessList = list.listdata.slice(i,i+4)
    }

    // 热搜换一换
    let radomList = ()=>{
      let i= parseInt(Math.random()*16);
      list.hotList = list.listdataCopy.slice(i,i+7)
    }


    //删除历史记录
    let del = ()=>{
      list.history = [];
       window.localStorage.setItem(
        "homeSearchHistory",
        JSON.stringify(list.history)
      );
    }

    // 历史记录
    let pushValue = (value) =>{
      list.value = value;
      goto()
    }

    // 搜索
    let goto = () => {

      if (list.value.trim()!='') {
        list.history = list.history.filter(item =>item!=list.value)
        list.history.unshift(list.value)
        window.localStorage.setItem("homeSearchHistory",JSON.stringify(list.history))
      }

      console.log(list.value);

      router.push({
        name:"searchDataList",
        query: {
          data: list.value,
        },
      });

      list.value = "";
    };

     // 过滤器
    let getFilter = (value)=>{
       if(value < 10000){
          return value;
        }
        let w = value > 10000?value/10000:value;//万计算
        let y = w > 10000? parseInt(w/10000) +"亿" :parseFloat(String(w).substring(0,3)) +"万";
        return y;
    }


    return {
      ...toRefs(list),
      goto,
      del,
      pushValue,
      radom,
      radomList,
      getFilter,
      getArticleDetailFun
    };
  },
};
</script>

<style lang="scss" scoped>
.search_page {
  .search_top {
    padding-left: 10px;
    padding-right: 15px;
    padding-top: 14px;
    display: flex;
    align-items: center;
    .back {
      font-size: 24px;
      margin-right: 4px;
      color: #666;
    }
    .input_box {
      flex: 1;
      height: 31px;
      border-radius: 18px;
      background-color: #f6f6f6;
      display: flex;
      align-items: center;
      font-size: 15px;
      .icon {
        font-size: 20px;
        color: #a6a6a6;
        margin-left: 10px;
        margin-right: 8px;
      }
      input {
        border: none;
        background-color: #f6f6f6;
        font-size: 12px;
        line-height: 29px;
        width: 78%;
      }
    }
    .cancel {
      margin-left: 8px;
      font-size: 14px;
      color: #a4a4a4;
    }
  }

  .search_main {
    padding: 0 16px;
    .history_record {
      margin-top: 20px;
      .title {
        font-size: 14px;
        color: #323232;
        font-weight: 500;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .delete {
          color: #9f9f9f;
          font-size: 18px;
        }
      }
      .ul {
        margin-top: 14px;
        display: flex;
        flex-wrap: wrap;
        .li {
          margin-bottom: 7px;
          border: 1px solid #f3f3f3;
          padding: 7px 12px;
          border-radius: 22px;
          font-size: 12px;
          color: #323232;
          margin-right: 12px;
        }
      }
    }
    .want_search {
      font-size: 14px;
      margin-top: 14px;
      .title {
        color: #3a3a3a;
        display: flex;
        justify-content: space-between;
        display: flex;
        align-items: center;
        .change_it {
          span {
            margin-right: 5px;
            font-size: 12px;
            transform: rotate(-45deg);
            display: inline-block;
          }
          font-size: 12px;
          color: #a2a2a2;
        }
      }
      .ul {
        display: flex;
        flex-wrap: wrap;
        .li {
          width: 50%;
          margin-top: 20px;
          font-size: 12px;
          color: #363636;
        }
      }
    }
    .search_found {
        margin-top: 30px;
      .title {
        color: #3a3a3a;
        display: flex;
        justify-content: space-between;
        display: flex;
        align-items: center;
        font-size: 14px;
        .txt{
            background-image:-webkit-linear-gradient(right,#D5755D,#D4A775); 
            -webkit-background-clip:text; 
            -webkit-text-fill-color:transparent; 
        }
        .change_it {
          span {
            margin-right: 5px;
            font-size: 12px;
            transform: rotate(-45deg);
            display: inline-block;
          }
          font-size: 12px;
          color: #a2a2a2;
        }
      }
      .list{
        margin-top: 6px;
        .lis{
            padding: 16px 0;
            padding-left: 8px;
            border-bottom: 1px solid #F7F7F7;
            display: flex;
            align-items: center;
            .dot{
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background-color: #BEBEBE;
                margin-right: 14px;
                &.frist{
                    background-color: #EE9984;
                }
                &.tow{
                    background-color: #F3AD57;
                }
                &.the{
                    background-color: #FFDA68;
                }
            }
            .text{
                flex: 1;
                font-size: 13px;
                color: #414141;
                display: flex;
                align-items: center;
                span{
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  max-width: 240px;
                }
                .new,.hot{
                    margin-left: 4px;
                    width: 16px;
                    height: 16px;
                    font-size: 12px;
                    color: #fff;
                    line-height: 14px;
                    text-align: center;
                    border-radius: 2px;
                    transform: scale(.8);
                    background: linear-gradient(#DB8562,#EDB289);
                }
                .new{
                    background: linear-gradient(#E9A54B,#F0B456);
                }
                
            }
            .search_nums{
                font-size: 12px;
                color: #9F9F9F;
                transform: scale(0.9);
                display: flex;
                .rise{
                    margin-left: 10px;
                    color: #D74953;
                }
                .down{
                    color: #CBCBCB;
                    margin-left: 10px;
                    font-size: 10px;
                }
            }
        }
      }
    }
  }
}
</style>