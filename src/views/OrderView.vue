<template>
  <div class="Order">
    <div class="nav">
      <div @click="goto('shopping')" class="left iconfont icon-zuojiantou"></div>
      <h5>我的订单</h5>
      <div class="iconbox">
        <div class="icon iconfont icon-sousuo"></div>
        <div
          class="icon iconfont icon-gengduo1"
          style="margin-left: 10px"
        ></div>
      </div>
    </div>
    <!-- Tab选项卡 -->
    <div class="tabs">
      <van-tabs
        sticky
        offset-top="38"
        v-model:active="active"
        animated
        swipeable
        title-inactive-color="#adadad"
        title-active-color="#000"
      >
        <van-tab title="全部">
          <div class="order_content" v-show="ordersData.length">
            <div
              v-for="items in ordersData"
              :key="items.brandId"
              class="order_item"
            >
              <!-- 品牌 -->
              <div class="order_item_title">
                <div class="left">
                  <div class="brand_img">
                    <img :src="items.brandImg" alt="" />
                  </div>
                  <div class="brand_name">{{ items.brandName }}</div>
                  <div class="iconfont icon-youjiantou"></div>
                </div>
                <div class="right">
                  <div
                    v-if="items.type == 1"
                    class="state"
                    style="color: #c7485a"
                  >
                    待付款
                  </div>
                  <div
                    v-if="items.type != 1 && items.type == 0"
                    class="state"
                    style="color: #656565"
                  >
                    已取消
                  </div>
                  <div
                    v-if="items.type == 2"
                    class="state"
                    style="color: #656565"
                  >
                    代收货
                  </div>
                  <div
                    v-if="items.type == 3"
                    class="state"
                    style="color: #656565"
                  >
                    已收货
                  </div>
                  <div
                    v-if="items.type == 4"
                    class="state"
                    style="color: #656565"
                  >
                    已评价
                  </div>
                </div>
              </div>
              <div class="order_goods">
                <!-- 商品 -->
                <div
                  v-for="item in items.item"
                  :key="item.goodId"
                  class="order_goods_items"
                >
                  <div class="order_goods_img">
                    <img :src="item.goodImg" alt="" />
                  </div>

                  <div class="order_goods_text">
                    <div class="good_name">
                      <div class="txt">
                        {{ item.goodName }}{{ item.goodValue }}
                      </div>
                      <div class="price">￥{{ item.goodPrice }}</div>
                    </div>
                    <div class="good_value">
                      <div class="value">{{ item.goodValue }}</div>
                      <div class="nums">x{{ item.goodNums }}</div>
                    </div>
                    <div class="tui">
                      <div class="huo">七天无理由</div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 配送信息 -->
              <div class="fa_huo">
                <div class="left"><span class="iconfont"></span> 配送信息</div>
                <div class="right">48小时内发货</div>
              </div>

              <!-- 订单操作 -->
              <div class="order_state">
                <div class="nums_all_price_all">
                  <div class="nums_all">共{{ items.item.length }}件</div>
                  <div class="price_all">
                    <div v-if="items.type == 1" class="pay_sata">待支付</div>
                    <div v-if="items.type == 2" class="pay_sata">已支付</div>
                    <div class="price">￥{{ priceAll(items.brandId) }}</div>
                  </div>
                </div>
                <!-- 按钮区域 -->
                <div class="btn_all">
                  <div v-if="items.type != 1&&items.type != 2" @click="delOrder(items.timeId,items.brandId)" class="btn">删除订单</div>
                  <div v-if="items.type != 1" @click="goto('goodsdetails',items.id)" class="btn">再来一单</div>
                  <div v-if="items.type == 3 " @click="comments(items, 4)" class="btn">待评价</div>
                  <div
                    v-if="items.type == 1"
                    @click="pay(items.brandId,items.timeId, 0)"
                    class="btn"
                  >
                    取消订单
                  </div>
                  <div
                    v-if="items.type == 2"
                    @click="pay(items.brandId,items.timeId, 3)"
                    class="btn"
                  >
                    确认收货
                  </div>
                  <div
                    v-if="items.type == 1"
                    @click="pay(items.brandId,items.timeId, 2)"
                    class="pay btn"
                  >
                    立即支付<van-count-down
                      :time="items.timeId - +new Date()"
                      style="color:#fff;font-size:12px;"
                      format="mm:ss"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="noshop" v-show="!ordersData.length">
            <div class="icon iconfont icon-dingdan1"></div>
            <p>暂时没有订单哦，快去加购吧~</p>
          </div>
        </van-tab>

        <van-tab title="待付款">
          <div class="order_content" v-show="getData(1).length">
            <div
              v-for="items in getData(1)"
              :key="items.brandId"
              class="order_item"
            >
              <!-- 品牌 -->
              <div class="order_item_title">
                <div class="left">
                  <div class="brand_img">
                    <img :src="items.brandImg" alt="" />
                  </div>
                  <div class="brand_name">{{ items.brandName }}</div>
                  <div class="iconfont icon-youjiantou"></div>
                </div>
                <div class="right">
                  <div
                    v-if="items.type == 1"
                    class="state"
                    style="color: #c7485a"
                  >
                    待付款
                  </div>
                  <div
                    v-if="items.type != 1 && items.type == 0"
                    class="state"
                    style="color: #656565"
                  >
                    已取消
                  </div>
                  <div
                    v-if="items.type == 2"
                    class="state"
                    style="color: #656565"
                  >
                    代收货
                  </div>
                  <div
                    v-if="items.type == 3"
                    class="state"
                    style="color: #656565"
                  >
                    已收货
                  </div>
                  <div
                    v-if="items.type == 4"
                    class="state"
                    style="color: #656565"
                  >
                    已评价
                  </div>
                </div>
              </div>
              <div class="order_goods">
                <!-- 商品 -->
                <div
                  v-for="item in items.item"
                  :key="item.goodId"
                  class="order_goods_items"
                >
                  <div class="order_goods_img">
                    <img :src="item.goodImg" alt="" />
                  </div>

                  <div class="order_goods_text">
                    <div class="good_name">
                      <div class="txt">
                        {{ item.goodName }}{{ item.goodValue }}
                      </div>
                      <div class="price">￥{{ item.goodPrice }}</div>
                    </div>
                    <div class="good_value">
                      <div class="value">{{ item.goodValue }}</div>
                      <div class="nums">x{{ item.goodNums }}</div>
                    </div>
                    <div class="tui">
                      <div class="huo">七天无理由</div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 配送信息 -->
              <div class="fa_huo">
                <div class="left"><span class="iconfont"></span> 配送信息</div>
                <div class="right">48小时内发货</div>
              </div>

              <!-- 订单操作 -->
              <div class="order_state">
                <div class="nums_all_price_all">
                  <div class="nums_all">共{{ items.item.length }}件</div>
                  <div class="price_all">
                    <div v-if="items.type == 1" class="pay_sata">待支付</div>
                    <div v-if="items.type == 2" class="pay_sata">已支付</div>
                    <div class="price">￥{{ priceAll(items.brandId) }}</div>
                  </div>
                </div>
                <!-- 按钮区域 -->
                <div class="btn_all">
                  <div v-if="items.type != 1&&items.type != 2" @click="delOrder(items.timeId,items.brandId)" class="btn">删除订单</div>
                  <div v-if="items.type != 1" @click="goto('goodsdetails',items.id)" class="btn">再来一单</div>
                  <div v-if="items.type == 3 " @click="comments(items.brandId,items.timeId, 4)" class="btn">待评价</div>
                  <div
                    v-if="items.type == 1"
                    @click="pay(items.brandId,items.timeId, 0)"
                    class="btn"
                  >
                    取消订单
                  </div>
                  <div
                    v-if="items.type == 2"
                    @click="pay(items.brandId,items.timeId, 3)"
                    class="btn"
                  >
                    确认收货
                  </div>
                  <div
                    v-if="items.type == 1"
                    @click="pay(items.brandId,items.timeId, 2)"
                    class="pay btn"
                  >
                    立即支付<van-count-down
                      :time="items.timeId - +new Date()"
                      style="color:#fff;font-size:12px;"
                      format="mm:ss"
                      @finish="setPay(items.brandId,items.timeId, 0)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="noshop" v-show="!getData(1).length">
            <div class="icon iconfont icon-dingdan1"></div>
            <p>暂时没有订单哦，快去加购吧~</p>
          </div>
        </van-tab>

        <van-tab title="待收货">
          <div class="order_content" v-show="getData(2).length">
            <div
              v-for="items in getData(2)"
              :key="items.brandId"
              class="order_item"
            >
              <!-- 品牌 -->
              <div class="order_item_title">
                <div class="left">
                  <div class="brand_img">
                    <img :src="items.brandImg" alt="" />
                  </div>
                  <div class="brand_name">{{ items.brandName }}</div>
                  <div class="iconfont icon-youjiantou"></div>
                </div>
                <div class="right">
                  <div
                    v-if="items.type == 1"
                    class="state"
                    style="color: #c7485a"
                  >
                    待付款
                  </div>
                  <div
                    v-if="items.type != 1 && items.type == 0"
                    class="state"
                    style="color: #656565"
                  >
                    已取消
                  </div>
                  <div
                    v-if="items.type == 2"
                    class="state"
                    style="color: #656565"
                  >
                    代收货
                  </div>
                  <div
                    v-if="items.type == 3"
                    class="state"
                    style="color: #656565"
                  >
                    已收货
                  </div>
                  <div
                    v-if="items.type == 4"
                    class="state"
                    style="color: #656565"
                  >
                    已评价
                  </div>
                </div>
              </div>
              <div class="order_goods">
                <!-- 商品 -->
                <div
                  v-for="item in items.item"
                  :key="item.goodId"
                  class="order_goods_items"
                >
                  <div class="order_goods_img">
                    <img :src="item.goodImg" alt="" />
                  </div>

                  <div class="order_goods_text">
                    <div class="good_name">
                      <div class="txt">
                        {{ item.goodName }}{{ item.goodValue }}
                      </div>
                      <div class="price">￥{{ item.goodPrice }}</div>
                    </div>
                    <div class="good_value">
                      <div class="value">{{ item.goodValue }}</div>
                      <div class="nums">x{{ item.goodNums }}</div>
                    </div>
                    <div class="tui">
                      <div class="huo">七天无理由</div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 配送信息 -->
              <div class="fa_huo">
                <div class="left"><span class="iconfont"></span> 配送信息</div>
                <div class="right">48小时内发货</div>
              </div>

              <!-- 订单操作 -->
              <div class="order_state">
                <div class="nums_all_price_all">
                  <div class="nums_all">共{{ items.item.length }}件</div>
                  <div class="price_all">
                    <div v-if="items.type == 1" class="pay_sata">待支付</div>
                    <div v-if="items.type == 2" class="pay_sata">已支付</div>
                    <div class="price">￥{{ priceAll(items.brandId) }}</div>
                  </div>
                </div>
                <!-- 按钮区域 -->
                <div class="btn_all">
                  <div v-if="items.type != 1&&items.type != 2" @click="delOrder(items.timeId,items.brandId)" class="btn">删除订单</div>
                  <div v-if="items.type != 1" @click="goto('goodsdetails',items.id)" class="btn">再来一单</div>
                  <div v-if="items.type == 3 " @click="comments(items.brandId,items.timeId, 4)" class="btn">待评价</div>
                  <div
                    v-if="items.type == 1"
                    @click="pay(items.brandId,items.timeId, 0)"
                    class="btn"
                  >
                    取消订单
                  </div>
                  <div
                    v-if="items.type == 2"
                    @click="pay(items.brandId,items.timeId, 3)"
                    class="btn"
                  >
                    确认收货
                  </div>
                  <div
                    v-if="items.type == 1"
                    @click="pay(items.brandId,items.timeId, 2)"
                    class="pay btn"
                  >
                    立即支付<van-count-down
                      :time="items.timeId - +new Date()"
                      style="color:#fff;font-size:12px;"
                      format="mm:ss"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="noshop" v-show="!getData(2).length">
            <div class="icon iconfont icon-dingdan1"></div>
            <p>暂时没有订单哦，快去加购吧~</p>
          </div>
        </van-tab>

        <van-tab title="已收货">
          <div class="order_content" v-show="getData(3).length">
            <div
              v-for="items in getData(3)"
              :key="items.brandId"
              class="order_item"
            >
              <!-- 品牌 -->
              <div class="order_item_title">
                <div class="left">
                  <div class="brand_img">
                    <img :src="items.brandImg" alt="" />
                  </div>
                  <div class="brand_name">{{ items.brandName }}</div>
                  <div class="iconfont icon-youjiantou"></div>
                </div>
                <div class="right">
                  <div
                    v-if="items.type == 1"
                    class="state"
                    style="color: #c7485a"
                  >
                    待付款
                  </div>
                  <div
                    v-if="items.type != 1 && items.type == 0"
                    class="state"
                    style="color: #656565"
                  >
                    已取消
                  </div>
                  <div
                    v-if="items.type == 2"
                    class="state"
                    style="color: #656565"
                  >
                    代收货
                  </div>
                  <div
                    v-if="items.type == 3"
                    class="state"
                    style="color: #656565"
                  >
                    已收货
                  </div>
                  <div
                    v-if="items.type == 4"
                    class="state"
                    style="color: #656565"
                  >
                    已评价
                  </div>
                </div>
              </div>
              <div class="order_goods">
                <!-- 商品 -->
                <div
                  v-for="item in items.item"
                  :key="item.goodId"
                  class="order_goods_items"
                >
                  <div class="order_goods_img">
                    <img :src="item.goodImg" alt="" />
                  </div>

                  <div class="order_goods_text">
                    <div class="good_name">
                      <div class="txt">
                        {{ item.goodName }}{{ item.goodValue }}
                      </div>
                      <div class="price">￥{{ item.goodPrice }}</div>
                    </div>
                    <div class="good_value">
                      <div class="value">{{ item.goodValue }}</div>
                      <div class="nums">x{{ item.goodNums }}</div>
                    </div>
                    <div class="tui">
                      <div class="huo">七天无理由</div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 配送信息 -->
              <div class="fa_huo">
                <div class="left"><span class="iconfont"></span> 配送信息</div>
                <div class="right">48小时内发货</div>
              </div>

              <!-- 订单操作 -->
              <div class="order_state">
                <div class="nums_all_price_all">
                  <div class="nums_all">共{{ items.item.length }}件</div>
                  <div class="price_all">
                    <div v-if="items.type == 1" class="pay_sata">待支付</div>
                    <div v-if="items.type == 2" class="pay_sata">已支付</div>
                    <div class="price">￥{{ priceAll(items.brandId) }}</div>
                  </div>
                </div>
                <!-- 按钮区域 -->
                <div class="btn_all">
                  <div v-if="items.type != 1&&items.type != 2" @click="delOrder(items.timeId,items.brandId)" class="btn">删除订单</div>
                  <div v-if="items.type != 1" @click="goto('goodsdetails',items.id)" class="btn">再来一单</div>
                  <div v-if="items.type == 3 " @click="comments(items, 4)" class="btn">待评价</div>
                  <div
                    v-if="items.type == 1"
                    @click="pay(items.brandId,items.timeId, 0)"
                    class="btn"
                  >
                    取消订单
                  </div>
                  <div
                    v-if="items.type == 2"
                    @click="pay(items.brandId,items.timeId, 3)"
                    class="btn"
                  >
                    确认收货
                  </div>
                  <div
                    v-if="items.type == 1"
                    @click="pay(items.brandId,items.timeId, 2)"
                    class="pay btn"
                  >
                    立即支付<van-count-down
                      :time="items.timeId - +new Date()"
                      style="color:#fff;font-size:12px;"
                      format="mm:ss"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="noshop" v-show="!getData(3).length">
            <div class="icon iconfont icon-dingdan1"></div>
            <p>暂时没有订单哦，快去加购吧~</p>
          </div>
        </van-tab>

        <van-tab title="已评价">
          <div class="order_content" v-show="getData(4).length">
            <div
              v-for="items in getData(4)"
              :key="items.brandId"
              class="order_item"
            >
              <!-- 品牌 -->
              <div class="order_item_title">
                <div class="left">
                  <div class="brand_img">
                    <img :src="items.brandImg" alt="" />
                  </div>
                  <div class="brand_name">{{ items.brandName }}</div>
                  <div class="iconfont icon-youjiantou"></div>
                </div>
                <div class="right">
                  <div
                    v-if="items.type == 1"
                    class="state"
                    style="color: #c7485a"
                  >
                    待付款
                  </div>
                  <div
                    v-if="items.type != 1 && items.type == 0"
                    class="state"
                    style="color: #656565"
                  >
                    已取消
                  </div>
                  <div
                    v-if="items.type == 2"
                    class="state"
                    style="color: #656565"
                  >
                    代收货
                  </div>
                  <div
                    v-if="items.type == 3"
                    class="state"
                    style="color: #656565"
                  >
                    已收货
                  </div>
                  <div
                    v-if="items.type == 4"
                    class="state"
                    style="color: #656565"
                  >
                    已评价
                  </div>
                </div>
              </div>
              <div class="order_goods">
                <!-- 商品 -->
                <div
                  v-for="item in items.item"
                  :key="item.goodId"
                  class="order_goods_items"
                >
                  <div class="order_goods_img">
                    <img :src="item.goodImg" alt="" />
                  </div>

                  <div class="order_goods_text">
                    <div class="good_name">
                      <div class="txt">
                        {{ item.goodName }}{{ item.goodValue }}
                      </div>
                      <div class="price">￥{{ item.goodPrice }}</div>
                    </div>
                    <div class="good_value">
                      <div class="value">{{ item.goodValue }}</div>
                      <div class="nums">x{{ item.goodNums }}</div>
                    </div>
                    <div class="tui">
                      <div class="huo">七天无理由</div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 配送信息 -->
              <div class="fa_huo">
                <div class="left"><span class="iconfont"></span> 配送信息</div>
                <div class="right">48小时内发货</div>
              </div>

              <!-- 订单操作 -->
              <div class="order_state">
                <div class="nums_all_price_all">
                  <div class="nums_all">共{{ items.item.length }}件</div>
                  <div class="price_all">
                    <div v-if="items.type == 1" class="pay_sata">待支付</div>
                    <div v-if="items.type == 2" class="pay_sata">已支付</div>
                    <div class="price">￥{{ priceAll(items.brandId) }}</div>
                  </div>
                </div>
                <!-- 按钮区域 -->
                <div class="btn_all">
                  <div v-if="items.type != 1&&items.type != 2" @click="delOrder(items.timeId,items.brandId)" class="btn">删除订单</div>
                  <div v-if="items.type != 1" @click="goto('goodsdetails',items.id)" class="btn">再来一单</div>
                  <div v-if="items.type == 3 " @click="comments(items.brandId,items.timeId, 4)" class="btn">待评价</div>
                  <div
                    v-if="items.type == 1"
                    @click="pay(items.brandId,items.timeId, 0)"
                    class="btn"
                  >
                    取消订单
                  </div>
                  <div
                    v-if="items.type == 2"
                    @click="pay(items.brandId,items.timeId, 3)"
                    class="btn"
                  >
                    确认收货
                  </div>
                  <div
                    v-if="items.type == 1"
                    @click="pay(items.brandId,items.timeId, 2)"
                    class="pay btn"
                  >
                    立即支付<van-count-down
                      :time="items.timeId - +new Date()"
                      style="color:#fff;font-size:12px;"
                      format="mm:ss"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="noshop" v-show="!getData(4).length">
            <div class="icon iconfont icon-dingdan1"></div>
            <p>暂时没有订单哦，快去加购吧~</p>
          </div>
        </van-tab>

      </van-tabs>
    </div>

    <!-- 猜你喜欢 -->
     <div class="like">
         <h4>猜你喜欢</h4>
         <!-- 商品 -->
         <div class="shop">
             <div class="box" v-for="item in guessList" :key="item.singleId" @click="goodDetail(item.commodityId)">
                 <div class="imgbox">
                 <img class="auto-img" :src="item.imgUrl" alt="">
                 </div>
                 <div class="content">
                 <div class="title">{{ item.brandName }} {{ item.commodityName }}{{ item.standardValue }}</div>
                 <div class="price">
                     <div class="new">
                     <span>￥</span>{{ parseInt(item.blackPrice) }}
                     </div>
                     <div class="old">
                     <span>￥</span>{{parseInt(item.price)}}
                     </div>
                 </div>
                 </div>
             </div>
         </div>
     </div>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import "vant/es/dialog/style";
import 'vant/es/toast/style';
import { reactive, toRefs, onBeforeMount } from "vue";
import {useRouter } from "vue-router"
import { getAllSortDetail } from "../api/shopping.js";
export default {
  setup() {
    let data = reactive({
      active: 0,
      ordersData: [],
      guessList:[]
    });

  const router = useRouter()

    onBeforeMount(() => {
      created();
    });
    //初始化获取订单数据
    let created = () => {
      if (window.localStorage.getItem("ordersData")) {
        data.ordersData = JSON.parse(window.localStorage.getItem("ordersData"));
      }
      console.log(data.ordersData);
    };

    //过滤整个订单数据
    let getData = (type) => {
      return data.ordersData.filter((item) => item.type == type);
    };

    // 品牌总价钱
    let priceAll = (id) => {
      // console.log(id);
      let priceAll = 0;
      data.ordersData.forEach((items) => {
        if (items.brandId == id) {
          items.item.forEach((item) => {
            priceAll += item.goodPrice * item.goodNums;
          });
        }
      });

      return priceAll;
    };


    let setPay = (brandId,id, type)=>{
      data.ordersData.forEach((items) => {
            if (items.brandId == brandId&&items.timeId==id) {
              items.type = type;
            }
            data.active = type
          });
          window.localStorage.setItem(
            "ordersData",
            JSON.stringify(data.ordersData)
          );
    }

    // 获取猜你喜欢数组
    let getAllSortDetailFun = ()=>{
      getAllSortDetail().then(datas=>{
        
        data.guessList = datas.item[0].items;
        console.log(datas);
        console.log(data.guessList);
      })
    }
    getAllSortDetailFun();

    // 跳转商品详情的方法
    let goodDetail = (id) =>{
      // console.log(id);

      router.push({
        path:"/goodsdetails",
        query:{
          id
        }
      })
    }
    //支付功能
    let pay = (brandId,id, type) => {
      let name 
      if (type==2) {
        name = '支付'
      }else if (type==3) {
        name = '收货'
      }else{
        name = '取消'
      }

      Dialog.confirm({
        title: "确认" + name,
     
      })
        .then(() => {

          setPay(brandId,id, type);
          Toast( name + "成功")
          
        })
        .catch(() => {
          Toast("取消")
        });
    };

    // 删除订单
    let delOrder = (id,brandId)=>{
        console.log(id,brandId);
        data.ordersData = data.ordersData.filter( item => item.timeId != id||item.brandId!=brandId)
        Toast("删除成功")
        window.localStorage.setItem(
            "ordersData",
            JSON.stringify(data.ordersData)
          );
    }

    // 评论功能
    let comments = (obj)=>{

      goto('PublishComment',JSON.stringify(obj))

    }



    //跳转路由
     let goto = (path,goodId) => {
      router.push({
        name: path,
        query: {
          id: goodId,
        },
      });
    };

    return {
      ...toRefs(data),
      getData,
      priceAll,
      pay,
      delOrder,
      goto,
      comments,
      setPay,
      goodDetail
    };
  },
};
</script>

<style lang="scss" scoped>
.Order {
  background-color: #f7f7f7;
  height: 100%;
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
      width: 52px;
      font-size: 24px;
    }
    h5 {
      font-size: 15px;
    }
    p {
      font-size: 14px;
    }
    .iconbox {
      display: flex;
      .icon {
        font-size: 21px;
      }
    }
  }
  .tabs {
    .order_content {
      padding: 0 8px;

      .order_item {
        margin-top: 10px;
        padding: 16px 10px;
        background-color: #fff;
        border-radius: 11px;
        .order_item_title {
          color: #373737;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .left {
            flex: 1;
            display: flex;
            align-items: center;
            .brand_img {
              width: 20px;
              height: 20px;
              margin-right: 4px;
              overflow: hidden;
              border-radius: 50%;
              img {
                width: 100%;
              }
            }
          }
          .right {
            .state {
              font-size: 14px;
            }
          }
        }
        .order_goods {
          margin-top: 6px;
          .order_goods_items {
            margin-top: 12px;
            display: flex;
            .order_goods_img {
              flex: 1;
              margin-right: 12px;
              width: 86px;
              height: 86px;
              border-radius: 7px;
              overflow: hidden;
              img {
                width: 100%;
              }
            }
            .order_goods_text {
              flex: 1;
              .good_name {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .txt {
                  width: 190px;
                  font-size: 12px;
                  color: #393939;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
                .price {
                  font-size: 14px;
                  color: #323232;
                }
              }
              .good_value {
                margin-top: 11px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 12px;
                color: #9f9f9f;
              }
              .tui {
                margin-top: 7px;
                display: flex;
                .huo {
                  border: 1px solid #f4f4f4;
                  color: #585858;
                  font-size: 12px;
                  transform: scale(0.9) translateX(-4px);
                  border-radius: 3px;
                  padding: 2px;
                }
              }
            }
          }
        }
        .fa_huo {
          padding: 9px 8px;
          margin-top: 8px;
          border-radius: 5px;
          background-color: #fafafa;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .left {
            color: #454545;
            font-size: 12px;
          }
          .right {
            color: #999999;
            font-size: 12px;
          }
        }
        .order_state {
          margin-top: 13px;
          .nums_all_price_all {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .nums_all {
              font-size: 12px;
              color: #949494;
            }
            .price_all {
              display: flex;
              .pay_sata {
                color: #3f3f3f;
                font-size: 12px;
              }
              .price {
                font-size: 14px;
                color: #353535;
              }
            }
          }
          .btn_all {
            margin-top: 17px;
            display: flex;
            justify-content: flex-end;
            .btn {
              padding: 10px 15px;
              border: 1px solid #f0f0f0;
              font-size: 12px;
              background-color: #fff;
              border-radius: 18px;
              margin-right: 5px;
              color: #383838;
              height: 13px;
              &.pay {
                display: flex;
                align-items: center;
                padding: 10px 15px;
                border: 1px solid #e93f48;
                font-size: 12px;
                background-color: #e93f48;
                color: #fff;
                border-radius: 18px;
              }
            }
          }
        }
      }
    }
    .noshop {
      height: 200px;
      font-size: 13px;
      color: #999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .icon {
        font-weight: 100;
        font-size: 60px;
        color: #ccc;
        margin-bottom: 30px;
      }
    }

    margin-top: 38px;
    ::v-deep .Lit_tabs {
      font-weight: bold;
    }
    ::v-deep .van-sticky--fixed {
      width: 100%;
      min-width: 320px;
      max-width: 750px;
    }
    :deep .van-tabs__line {
      bottom: 22px;
    }
  }
  .null {
    width: 100%;
    height: 50px;
  }
  .like {
    h4 {
      margin-left: 15px;
      margin: 18px;
      font-size: 14px;
    }
    .shop {
      padding: 0 7px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .box {
        width: 49.5%;
        height: 270px;
        background-color: #fff;
        border-radius: 4px;
        margin-bottom: 4px;
        overflow: hidden;
        .imgbox {
          width: 100%;
          // height: 183px;
        }
        .content {
          padding: 10px 15px;
          .title {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            font-weight: bold;
            font-size: 13px;
            line-height: 20px;
            margin-bottom: 15px;
          }
          .price {
            font-size: 15px;
            display: flex;
            align-items: flex-end;
            .old {
              color: #999;
              font-size: 12px;
              text-decoration: line-through;
              margin-left: 8px;
              margin-bottom: 1px;
              span {
                font-size: 12px;
              }
            }
            span {
              font-size: 13px;
            }
          }
        }
      }
    }
  }
}
</style>