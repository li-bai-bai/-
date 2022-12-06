<template>
  <div class="browse">
    <div class="nav">
      <div @click="$router.go(-1)" class="left iconfont icon-zuojiantou"></div>
      <h5>浏览记录</h5>
      <div @click="edit = !edit" v-show="!edit" class="leftnav">
        <div class="icon iconfont icon-gengduo2"></div>
        <p>管理</p>
      </div>
      <div @click="edit = !edit" v-show="edit" class="secc">完成</div>
    </div>
    <div class="null"></div>
    <div class="time">今天</div>
    <van-empty description="没有浏览记录" v-if="!leftData.length"/>
    <!-- <van-loading style="text-align:center;margin-top:50px;" v-if="!leftData.length" size="48px">加载中...</van-loading> -->
    <div class="content" v-if="leftData.length > 0">
      <div class="left">
        <div
          class="article"
          v-for="item in leftData"
          :key="item.id"
          @click.stop="getArticleDetailFun(item.id)"
        >
          <div class="imgbox">
            <img :src="item.note_card.cover.url" alt="" />
            <!-- <img src="https://sns-img-qc.xhscdn.com/bf3626b5-6360-474c-870a-157956bc6a54" alt=""> -->
          </div>
          <div class="describe">
            <div class="title">
              <!-- 半开卷考试如何利用有限纸张半开卷考试如何利用有限纸张半开卷考试如何利用有限纸张 -->
              {{ item.note_card.display_title }}
            </div>
            <div class="user">
              <div class="left" :key="item.note_card.user.user_id">
                <div class="userimg">
                  <img :src="item.note_card.user.avatar" alt="" />
                </div>
                <div class="name">{{ item.note_card.user.nick_name }}</div>
              </div>

              <div class="right">
                <div class="icon icon-aixin iconfont"></div>
                <!-- <div class="num">8.4万</div>
                    <div class="icon"></div> -->
                <div class="num">
                  {{ getFilter(item.note_card.interact_info.liked_count) }}
                </div>
              </div>
            </div>
          </div>

          <!-- 删除选中 -->
          <div
            @click="setChecked(item.id)"
            v-show="edit"
            class="dele"
            @click.stop=""
          >
            <div v-show="item.checked" class="iconfont icon-gou1"></div>
            <div v-show="!item.checked" class="qui_xiao"></div>
          </div>
        </div>
      </div>
      <div class="right">
        <div
          class="article"
          v-for="item in rightData"
          :key="item.id"
          @click.stop="getArticleDetailFun(item.id)"
        >
          <div class="imgbox">
            <img :src="item.note_card.cover.url" alt="" />
            <!-- <img src="https://sns-img-qc.xhscdn.com/bf3626b5-6360-474c-870a-157956bc6a54" alt=""> -->
          </div>
          <div class="describe">
            <div class="title">
              <!-- 半开卷考试如何利用有限纸张半开卷考试如何利用有限纸张半开卷考试如何利用有限纸张 -->
              {{ item.note_card.display_title }}
            </div>
            <div class="user">
              <div class="left" :key="item.note_card.user.user_id">
                <div class="userimg">
                  <img :src="item.note_card.user.avatar" alt="" />
                </div>
                <div class="name">{{ item.note_card.user.nick_name }}</div>
              </div>
              <div class="right">
                <div class="icon icon-aixin iconfont"></div>
                <!-- <div class="num">8.4万</div>
                    <div class="icon"></div> -->
                <div class="num">
                  {{ getFilter(item.note_card.interact_info.liked_count) }}
                </div>
              </div>
            </div>
          </div>

          <!-- 删除选中 -->
          <div
            @click="setChecked(item.id)"
            v-show="edit"
            class="dele"
            @click.stop=""
          >
            <div v-show="item.checked" class="iconfont icon-gou1"></div>
            <div v-show="!item.checked" class="qui_xiao"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="edit" class="footer">
      <div class="lf">
        <div class="btn">
          <div v-show="getcheckedAll()" @click="setcheckedAll(false)" class="iconfont icon-gou1"></div>
          <div v-show="!getcheckedAll()" @click="setcheckedAll(true)" class="qui_xiao"></div>
        </div>
        <div class="txt">全选</div>
        <div class="yi_xuan">已选{{num()}}篇笔记</div>
      </div>
      <div class="fr">
        <div @click="del" class="del">删除</div>
      </div>
    </div>
    <div v-show="edit" style="height: 58px"></div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
// import { getHomefeed } from "../api/homefeed.js"
import { reactive, toRefs, onBeforeMount } from "vue";
import { getHomefeed, getArticleDetail } from "../api/homefeed.js";
export default {
  setup() {
    let router = useRouter();

    let list = reactive({
      // 首页发现页笔记详情数据
      listdata: [],
      // 首页图片数据
      listImg: null,
      // 笔记详情数据
      articleDetails: null,
      //开启管理
      edit: false,
      //历史id
      logsId: [],
      // 历史数据
      logsData: [],
      //左边数据
      leftData: [],
      //右边数据
      rightData: [],
    });

    onBeforeMount(() => {
      // 调用接收json数据
      getHomefeedFun();
       
    });

    // 调用首页 发现页 笔记数据
    let getHomefeedFun = () => {
      getHomefeed()
        .then((data) => {
          // 首页发现页笔记详情数据
          list.listdata = data.items;

          // console.log(list.listdata);

          return getArticleDetail();
        })
        .then((data) => {
          // 获取笔记详情
          list.articleDetails = data.details;
          // console.log(list.articleDetails);
        })
        .then(() => {
          //获取历史id
          if (window.localStorage.getItem("logsData")) {
            list.logsId = JSON.parse(window.localStorage.getItem("logsData"));
          }
          list.logsId.forEach((id) => {
            list.listdata.forEach((item) => {
              if (item.id == id) {
                item.checked = false;
                list.logsData.push(item);
              }
            });
          });


          window.localStorage.setItem("logsArray", JSON.stringify(list.logsData));


          setNewData();
        });
    };

    //切割方法
    let setNewData = () => {
      
      // 切割
      let length  = 1
      let data = JSON.parse(window.localStorage.getItem("logsArray"));
      if (data.length>1) {
        length= data.length / 2
      }
      list.leftData = data.splice(0,length );
      list.rightData = data.splice(0, data.length);

    };

    //跳转 笔记详情页数据 传参
    let getArticleDetailFun = (id) => {
      console.log(id);
      router.push({
        path: "/Details",
        query: {
          id,
        },
      });
    };

    // 过滤器
    let getFilter = (value) => {
      if (value < 10000) {
        return value;
      }
      let w = value > 10000 ? value / 10000 : value; //万计算
      let y = w > 10000 ? parseInt(w / 10000) + "亿" : parseInt(w) + "万";
      return y;
    };
    //改变选中
    let setChecked = (id) => {
      console.log(1);
      list.logsData.forEach((item) => {
        if (item.id == id) {
          item.checked = !item.checked;
          console.log(item.checked);
        }
      });
      window.localStorage.setItem("logsArray", JSON.stringify(list.logsData));
      setNewData();
    };
    // 全选操作
    let setcheckedAll = (flag)=>{
       list.logsData.forEach((item) => {
          item.checked =flag;
      });
      window.localStorage.setItem("logsArray", JSON.stringify(list.logsData));
      setNewData();
    }
    //全选状态
    let getcheckedAll=()=>{
      console.log(list.logsData);
      return list.logsData.every(item => item.checked)

    }
    //数量
    let num = ()=>{
       return list.logsData.reduce((total, item) => {  
          if (item.checked) {
            total ++;
          }
        return total;
      }, 0);
    }
    //删除
    let del = () => {
      let logsId = [];
      list.logsData = list.logsData.filter((item) => {
        if (!item.checked) {
          logsId.push(item.id);
          return item;
        } 
      });
      list.logsId = logsId
      console.log(list.logsId);
      window.localStorage.setItem("logsData",JSON.stringify(list.logsId))
      window.localStorage.setItem("logsArray", JSON.stringify(list.logsData));
      setNewData();
    };

    return {
      ...toRefs(list),
      getHomefeedFun,
      getFilter,
      getArticleDetailFun,
      setChecked,
      del,
      setcheckedAll,
      getcheckedAll,
      num
    };
  },
};
</script>

<style lang="scss" scoped>
.browse {
  background-color: #f7f7f7;
  height: 100vh;
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
    .secc {
      width: 61px;
      text-align: center;
      color: #e3485e;
    }
    .left {
      font-size: 24px;
    }
    h5 {
      font-size: 15px;
    }
    .leftnav {
      font-size: 12px;
      padding: 6px 10px;
      border-radius: 15px;
      border: 1px solid #ababab;
      display: flex;
      .icon {
        font-size: 12px;
        margin-right: 3px;
      }
    }
  }
  .time {
    height: 30px;
    padding: 0 12px;
    background-color: #fff;
    line-height: 30px;
    margin-bottom: 10px;
  }
  .content {
    display: flex;
    padding: 0 4px;
    background: #f6f6f6;
    justify-content: space-between;
    .left,
    .right {
      width: 49.5%;
      .article {
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 4px;
        position: relative;
        .dele {
          border-radius: 50%;
          position: absolute;
          top: 10px;
          right: 10px;
          .iconfont {
            background-color: #fff;
            color: #ff2742;
            border-radius: 50%;
            font-size: 24px;
            text-align: center;
            display: block;
          }
          .qui_xiao {
            width: 23px;
            height: 23px;
            border-radius: 50%;
            border: 1px solid #fff;
            background-color: rgba(0, 0, 0, 0.152);
          }
        }
        img {
          width: 100%;
        }
      }
    }

    .describe {
      background-color: #fefefe;
      padding: 10px;
      .title {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-weight: bold;
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 10px;
      }
      .user {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          .userimg {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            overflow: hidden;
            box-sizing: border-box;
            box-shadow: 0 0 2px #ccc;
            display: flex;
          }
          .name {
            margin-left: 5px;
            font-size: 11px;
            transform: scale(0.9);
            color: #666666;
            max-width: 50px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
        .right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .icon {
            width: 14px;
            height: 14px;
            margin-right: 4px;
          }
          .num {
            margin-top: 3px;
            font-size: 12px;
            color: #666666;
          }
        }
      }
    }
  }
  .null {
    width: 100%;
    height: 42px;
  }
  .footer {
    width: 100%;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    z-index: 3;
    padding: 10px 15px;
    font-size: 14px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    .lf {
      flex: 1;
      display: flex;
      align-items: center;
      .btn {
        display: flex;
        margin-right: 6px;
        .iconfont {
          background-color: #fff;
          color: #ff2742;
          border-radius: 50%;
          font-size: 24px;
          text-align: center;
          display: block;
        }
        .qui_xiao {
          width: 23px;
          height: 23px;
          border-radius: 50%;
          border: 1px solid #fff;
          background-color: rgba(0, 0, 0, 0.152);
        }
      }
      .txt {
        color: #707070;
        font-size: 14px;
      }
      .yi_xuan {
        color: #707070;
        border-left: 1px solid #f2f2f2;
        margin-left: 10px;
        padding-left: 12px;
      }
    }
    .fr {
      .del {
        padding: 12px 38px;
        background-color: #ff2442;
        border-radius: 30px;
        color: #fff;
      }
    }
  }
}
</style>