<template>
    <div class="identify">
      <!-- 头部搜索 -->
      <div class="search_top">
        <!-- 返回 -->
        <div class="back iconfont icon-zuojiantou" @click="$router.go(-1)"></div>
        <!-- 搜索框盒子 -->
        <div class="input_box">
          <div class="icon iconfont icon-sousuo"></div>          
          <input type="text" v-model="value" placeholder="输入aj,帮你购物避坑" @click="goto('shoppingsearch')"/>
        </div>
        <!-- 搜索 -->
        <div class="cancel iconfont icon-gerenzhongxin" @click="goto('myhome')" ></div>
      </div>
      <!-- 头部鉴别内容 -->
      <div class="compainer">
        <!-- 左边 -->
        <div class="leftcompainer">
            <h1>鉴别服务开创者</h1>
            <span>专业团队/权威鉴别/快速准确</span>
        </div>
        <div class="rightcompainer">
            <img src="../assets/img/search.gif" alt="">
        </div>
      </div>
      <!-- 内容 -->
      <div class="content">
          <div class="num">
            <p>累计鉴别超过</p>
            <!-- 数字滚动 -->
            <countTo :startVal='startVal' :endVal='endVal' :duration='2000'></countTo>
          </div>
          <div class="cooperation">
              <p>品牌合作</p>
              <ul class="coo_ul">
                <li>
                  <div class="span">
                    <span></span>
                  </div>
                  <span>考拉</span>
                </li>
                <li>
                  <div class="span">
                    <span></span>
                  </div>
                  <span>天猫</span>
                </li>
                <li>
                  <div class="span">
                    <span></span>
                  </div>
                  <span>抖音</span>
                </li>
                <li>
                  <div class="span">
                    <span></span>
                  </div>
                  <span>闲鱼</span>
                </li>
              </ul>
          </div>
          <!-- <div class="search">
              <img src="../assets/img/search.gif" alt="">
          </div> -->
          <div class="new" @click="goto('discern')">
            <p>在线鉴别</p>
          </div>
          <div class="title">
            <span>鉴别广场</span>
            <span>常见问题</span>
            <span>查批号</span>
            <span>鉴定台</span>
          </div>
      </div>

      <div style="width:100%; height:11px; background:#f7f7f7;"></div>
      <div class="iden_team">
        <h2>资深鉴别团队，专注鉴别服务</h2>
        <div class="image">
           <van-swipe class="my-swipe" indicator-color="red">
                <van-swipe-item>
                    <img src="../assets/img/jianbie1.jpg" alt="">
                </van-swipe-item>
                <van-swipe-item>
                    <img src="../assets/img/jianbie2.jpg" alt="">
                </van-swipe-item>
                <van-swipe-item>
                    <img src="../assets/img/jianbie3.jpg" alt="">
                </van-swipe-item>
            </van-swipe>
        </div>
      </div>
      <!-- 鉴定师 -->
      <div class="discrn">
        <h3>鉴别师</h3>
        <div class="all">
          <van-swipe :loop="false" :width="170" :show-indicators=false>
            <van-swipe-item v-for="item in discrn" :key="item.sysUserId">
              <div class="item">
                <div class="img">
                  <img :src="item.headImgUrl" alt="">
                </div>
                <div class="title">
                  <p class="name">{{item.nickName}}</p>
                  <span>{{item.identifiable}}</span>
                </div>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      

    </div>
</template>

<script>
import countTo from '../components/VueCountTo/vue-countTo.vue';
import { reactive, toRefs } from '@vue/reactivity'
import { getDiscriminator } from "../api/shopping.js";
import {useRouter } from 'vue-router';
export default {
    components: {
    countTo,
  },
    setup() {

        let router = useRouter();
        // 变量
        let list = reactive({

            // 鉴别开始数字
            startVal:0,
            //结束数字
            endVal:319458316,
            // 鉴定师数组
            discrn:[],
            value:""

        })
        // 初始化
        let created = ()=>{
            // 获取鉴定师数组
            getDiscriminator().then(data=>{
                console.log(data);
                list.discrn = data.data
            })
            
        }
        created();

        // 跳转路由
        let goto = (path)=>{
            router.push({
              name: path,
              
            });
        }
        return {
            ...toRefs(list),
            goto
        }
    },
}
</script>


<style lang="scss" scoped>
.identify{
  padding-bottom: 40px;
  background: #f5f5f8;

  .search_top {
    padding-left: 6px;
    padding-right: 14px;
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
      height: 33px;
    //   border-radius: 18px;
      background-color: #fff;
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
        background-color: #fff;
        font-size: 12px;
        line-height: 29px;
        width: 78%;
      }
    }
    .cancel {
      margin-left: 8px;
      font-size: 20px;
      color: #000;
    }
  }
  .compainer{
    margin: 0 14px;
    margin-top: 11px;
    // height: 73px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
    .leftcompainer{
        padding-left: 16px;
        display: flex;
        flex-direction: column;
        h1{
            margin-top: 18;
            font-size: 23px;
            font-weight: bold;

        }
        span{
            margin-top: 7px;
            font-size: 12px;
            color: #9c9ca9;
        }
    }
    .rightcompainer{
        width: 100px;
        height: 98px;
        overflow: hidden;
        padding-right: 11px;
        position: relative;
        img{
            position: absolute;
            top: 2px;
            width: 100px;
        }
    }

  }
  .content{
    // margin-top: 11px;
    position: relative;
    padding: 0 14px;
    padding-bottom: 16px;
      .num{
        padding-top: 14px;
          p{
            &:nth-child(1){
              font-size: 12px;
              color: #8e8e8e;
              margin-bottom: 7px;
            }
          }
           span{
              color:#000;
              font-size: 28px;
              font-weight: bold;
            }
      }
      .cooperation{
        p{
          font-size: 12px;
          color: #252525;
          height: 36px;
          line-height: 36px;
          font-weight: bold;
        }
        .coo_ul{
          display: flex;
            li{
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-right: 14px;
              font-size: 12px;
              color: #838383;
              .span{
                  width: 46px;
                  height: 46px;
                  background-color: #f7f7f7;
                  border-radius: 50%;
                span{
                  margin-top: 9px;
                  margin-left: 9px;
                  display: inline-block;
                  width: 29px;
                  height: 29px;
                  background: url(../assets/img/index.png) no-repeat 0 0;
                  background-size: 201px 29px;
                }

              }
              &:nth-child(2){
                 .span{
                    span{
                      background-position: -58px 0;
                    }
                 }
              }
              &:nth-child(3){
                 .span{
                    span{
                      background-position:-115px 0;
                    }
                 }
              }
              &:nth-child(4){
                 .span{
                    span{
                      background-position: - 173px 0;
                    }
                 }
              }
            }
        }
      }
      .search{
        width: 131px;
        position: absolute;
        right: 0;
        top: 0px;
        &::after{
            width: 100%;
            height: 2px;
            background-color: #fff;
            content: "";
            position: absolute;
            bottom: 0;
          }
          img{
          width: 100%;
          }
      }
      .new{
        display: flex;
        height: 44px;
        justify-content: space-between;
        align-items: center;
        margin-top: 8px;
        border: 1px solid #06c2c3;
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 42px;
          p{
              background-color: #06c2c3;
              color: #fff;
              font-size: 17px;
              font-weight: bold;
              width: 100%;
              height: 100%;
              text-align: center;
              line-height: 44px;
          }
      }
      .title{
        position: absolute;
        bottom: 17px;
        right: 14px;
          span{
            font-size: 12px;
            color: #000;
            font-weight: bold;
            padding: 0 8px;
            position: relative;
              &::after{
                content: "";
                position: absolute;
                width: 1px;
                height: 17px;
                right: 0;
                top: -1px;
                background-color: #939393;
                border-radius: 2px;
              }
              &:last-of-type{
                &::after{
                  width: 0;
                }
              }
          }
      }
  }
  .iden_team{
    padding: 3px 14px;
    h2{
      height: 40px;
      line-height: 40px;
      font-size: 15px;
      font-weight: bold;
    }

    .my-swipe .van-swipe-item {
        // height: 380px;
        display: flex;
        align-items: center;
        width: 347px;
        height: 195px;
        overflow:hidden;
        img{
            // width: 100%; 
            height: 100%;

            &:first-child{
                margin-left: 5px;
            }
        }
    }
    
  }
  .discrn{
    padding: 2px 14px 40px 14px;
    h3{
      font-size: 15px;
      font-weight: bold;
      height: 47px;
      line-height: 47px;
    }
    .all{
      width: 100%;
      height: 94px;
       .van-swipe{
        height: 100%;
          .van-swipe-item{
            .item{
                background-color: #fff;
                border-radius: 6px;
                margin-right: 10px;
                padding: 0 0px 0 9px;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                  .img{
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 1px solid #eee;

                      img{
                        width: 100%;
                        height: 100%;
                      }
                  }
                  .title{
                    width: 110px;
                         .name{
                          font-size: 10px;
                          margin-left: 10px;
                          font-weight: bold;
                         }
                         span{
                          font-size: 10px;
                          display: inline-block;
                          transform: scale(0.8);
                          line-height: 18px;
                          display: -webkit-box;
                          -webkit-box-orient: vertical;
                          -webkit-line-clamp: 3;
                          overflow: hidden;
                          text-overflow: ellipsis;
                         }
                  }
              }
          }
       }
    }
  }
}
</style>