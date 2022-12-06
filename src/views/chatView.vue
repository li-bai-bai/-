<template>
  <div class="chatView">
    <div class="container chat">
      <div class="top">
        <i @click="$router.go(-1)" class="iconfont icon-zuojiantou"></i >
        <span>{{brandName}}</span>
        <i class="iconfont icon-gengduo"></i>
      </div>
      <div class="time">
        {{ time() }}
      </div>
      <meta name="referrer" content="no-referrer" />
      <div class="chat_content"  v-html="locaList.content"></div>

      <div class="chat_content" ref="content">
        <div class="chat_content_left" v-show="receive.length >= 1">
          <div
            class="chat_content_left_item"
            v-for="item in receive"
            :key="item.id"
          >
            <img src="../assets/images/ia_100000009324.png" alt="" />
            <p class="text">{{ item.name }}</p>
          </div>
        </div>
        <div class="chat_content_right" v-show="send.length >= 1">
          <div
            class="chat_content_right_item"
            v-for="item in send"
            :key="item.id"
          >
            <p class="text">{{ item.name }}</p>
            <img
              :src="Myinfo.headimg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="reply-inp">
        <div class="inp">
          <input
            type="text"
            placeholder="请发表你的评论"
            v-model="value"
            @keydown.enter="add_info"
          />
          <div class="btn" @click="add_info">发送</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { reactive, toRefs, onMounted, ref } from "vue";
import { getReply } from "../api/reply.js";
import { useRoute } from "vue-router";

export default {
  setup() {
    // Date.now()
    // 获取vue-router对象
    // let router = useRouter();
    let route = useRoute();
    let content = ref(null);
    const list = reactive({
      value: "",
      send: [],
      receive: [],
      locaList: [],
      locaLists: [],
      getList: [],
      Myinfo:[],
      brandName:null   //店铺名
    });
    function time() {
      let d = new Date();
      let hour = d.getHours();
      hour = hour > 9 ? hour : "0" + hour.toString();
      var minute = d.getMinutes();
      minute = minute > 9 ? minute : "0" + minute.toString();
      var second = d.getSeconds();
      second = second > 9 ? second : "0" + second.toString();
      return `${hour}:${minute}:${second}`;
    }
    let created = ()=>{
      //判断是否有个人信息
        if(window.localStorage.getItem("Myinfo")){
            list.Myinfo=JSON.parse(window.localStorage.getItem("Myinfo"))[0];
        }
    }
    created();
    // 添加问候
    let add_info = () => {
      list.locaLists = [];
      console.log(list.value);
      list.send.push({
        id: Date.now(),
        name: list.value,
      });
      getReply({
        key: "free",
        appid: "0",
        msg: list.value,
      }).then((data) => {
        console.log(data);
        list.receive.push({
          id: Date.now(),
          name: data.content,
        });
      });
    //   console.log(list.send);
      list.value = "";
    };
    
    
    onMounted(() => {
      
    // 店铺名
    list.brandName = route.query.name
    });

    return {
      time,
      ...toRefs(list),
      add_info,
      content,
    };
  },
};
</script>
<style lang="scss" scoped>
.chatView{
  height: 100vh;
  background: #f5f5f5;

.time {
  text-align: center;
  padding: 10px 0;
}
.chat_content {
  padding: 0 15px;
  overflow-y: scroll;
  display: flex;
  justify-content: flex-end;
  .chat_content_right {
    width: 50%;
    .chat_content_right_item {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 60px;
      .text {
        position: relative;
        max-width: 120px;
        font-size: 12px;
        background: #5187eb;
        border-radius: 10px;
        color: #fff;
        padding: 5px 14px;
        margin-right: 14px;
        word-wrap: break-word;
        line-height: 16px;
        &::before {
          display: inline-block;
          vertical-align: middle;
          position: absolute;
          right: -8px;
          top: 6px;
          border-top: 8px solid #5187eb;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          transform: rotate(268deg);
          content: "";
        }
      }
      img {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        overflow: hidden;
      }
    }
  }
  .chat_content_left {
    width: 50%;
    .chat_content_left_item {
      display: flex;
      align-items: center;
      margin-top: 60px;
      .text {
        position: relative;
        display: flex;
        justify-content: center;
        max-width: 120px;
        flex-wrap: wrap;
        font-size: 12px;
        background: #fff;
        border-radius: 10px;
        color: #000;
        line-height: 16px;
        padding: 5px 14px;
        margin-left: 14px;
        flex: 1;
        &::before {
          content: "";
          display: inline-block;
          vertical-align: middle;
          position: absolute;
          left: -9px;
          top: 7px;
          border-top: 8px solid #fff;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          transform: rotate(91deg);
        }
      }
      img {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        overflow: hidden;
      }
    }
  }
}
.chat {
  .top {
    display: flex;
    align-items: center;
    height: 38px;
    color: #fff;
    background: linear-gradient(270deg, #fff 0%, #f6f6f6 100%);
    box-shadow: 1px 2px 2px 1px #f5f5f5;
    span{
        font-size: 16px;
        color: #000;
        flex: 1;
        text-align: center;
    }
    .icon-zuojiantou,.icon-gengduo {
      margin:0 10px;
      font-size: 20px;
      color: #000;

    }
  }
  .content {
    margin-top: 25px;
    .time {
      text-align: center;
      color: #8c8d8f;
      font-size: 12px;
      margin-bottom: 10px;
    }
    ul {
      li {
        margin-bottom: 10px;
        padding: 5px 15px;
        display: flex;
        justify-content: flex-end;
        img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
        }
        .text {
          // display: inline-block;
          margin-left: 16px;
          margin-right: 14px;
          padding: 10px;
          max-width: 250px;
          font-size: 14px;
          word-wrap: break-word;
          border-radius: 5px;
          height: 100%;
          line-height: 130%;
          position: relative;
          color: #fff;
          background: linear-gradient(270deg, #7b0b3b 0%, #d51c78 100%);
          &::before {
            display: inline-block;
            vertical-align: middle;
            position: absolute;
            right: -8px;
            top: 7px;
            border-top: 8px solid #8e4ff5;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            transform: rotate(-90deg);
            content: "";
          }
        }
      }
    }
  }
}

.reply-inp {
  padding: 10px 20px;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #fff;
  .inp {
    display: flex;
    // margin: 11px 0 0;
    align-items: flex-end;
    justify-content: space-between;
    input {
      width: 262px;
      height: 30px;
      line-height: 30px;
      border-radius: 6px;
      font-size: 12px;
      padding: 0 10px;
      color: #757575;
      background: #f2f2f4;
      outline: none;
      border: none;
      margin-right: 8px;
    }
    .btn {
      width: 56px;
      font-size: 12px;
      border-radius: 8px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      color: #fff;
      background:#598be7;
    }
  }
}
}
</style>