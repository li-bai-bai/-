<template>
  <div class="myhome">
     <!-- 顶部菜单和分享 -->
      <div class="my_banner_top">
        <div
          is-link
          @click="showPopup"
          class="menu iconfont icon-gengduo2"
        ></div>

        <div class="img" v-if="Myinfo">
          <img :src="Myinfo.headimg" alt="">
        </div>

        <div @click="showShare = true" class="share iconfont icon-fenxiang_2"></div>
      </div>


    <div class="my_banner">
     

      <!-- 左菜单栏 -->
      <!-- 弹出框 -->
      <van-popup
        v-model:show="show"
        position="left"
        :style="{ height: '101%', width: '50%', 'margin-top': '-1px' }"
      >
        <div class="menu_content">

          <router-link custom to="/draft" v-slot="{ navigate }">
            <div  @click="navigate" class="item">
              <div class="iconfont icon-caogaoxiang"></div>
              我的草稿
            </div>
          </router-link>
          
          <router-link custom to="/browse" v-slot="{ navigate }">
            <div  @click="navigate" class="item">
              <div class="iconfont icon-lishijilu_huaban"></div>
              浏览记录
            </div>
          </router-link>
          
          <!-- <div class="item">
            <div class="iconfont icon-qianbao"></div>
            钱包
          </div> -->

          <router-link custom to="/addressList" v-slot="{ navigate }">
            <div  @click="navigate" class="item">
              <div class="iconfont icon-dizhi"></div>
              地址列表
            </div>
          </router-link>

          <router-link custom to="/order" v-slot="{ navigate }">
            <div  @click="navigate" class="item">
              <div class="iconfont icon-dingdan"></div>
              订单
            </div>
          </router-link>
          
          <router-link custom to="/car" v-slot="{ navigate }">
            <div  @click="navigate" class="item">
              <div class="iconfont icon-gouwuche"></div>
              购物车
            </div>
          </router-link>
          
          <div class="item">
            <div class="iconfont icon-qiaquan"></div>
            卡券
          </div>
          <div @click="goto('wishList')" class="item">
            <div class="iconfont icon-shoucangqingdan"></div>
            心愿单
          </div>
          
          <router-link custom to="/identifyResult" v-slot="{ navigate }">
            <div  @click="navigate" class="item">
              <div class="iconfont icon-jianding-xianxing"></div>
              我的鉴定
            </div>
          </router-link>

          <!-- <div class="item">
            <div class="iconfont icon-qiaquan"></div>
            卡券
          </div> -->
          <!-- <div class="item">
            <div class="iconfont icon-huiyuan"></div>
            小红卡会员
          </div> -->
          <div class="item" @click="quit">
            <div class="iconfont icon-shezhi"></div>
            退出登录
          </div>
        </div>
      </van-popup>

      <!-- 分享弹出面版 -->
      <van-share-sheet
        v-model:show="showShare"
        title="立即分享给好友"
        :options="options"
        @select="onSelect"
      />

      <!-- 头像和名字 -->
      <div class="my_name" v-if="Myinfo">
        <div class="img"   @click="ImagePreview([Myinfo.headimg])">
          <img :src="Myinfo.headimg" alt="" />

        </div>
          <div class="add_books iconfont icon-jia"></div>
        <!-- 名字和id -->
        <div class="my_name_middle">
          <div class="nike_name">{{Myinfo.name}}</div>
          <div class="my_id">用户号：{{Myinfo.user_id}}</div>
        </div>
      </div>

      <!-- 个人信息 -->
      <div class="my_content" v-if="Myinfo">
        <!-- 自我介绍 -->
        <div class="my_introduce">{{Myinfo.introduce}}</div>

        <!-- 性别 -->
        <div class="my_sex_age">
          <div class="sex">♂</div>
          <div class="age">19岁</div>
        </div>

        <!-- 底部收藏和编辑 -->
        <div class="my_content_foot">
          <!-- 左边 -->
          <div class="left">
            <div class="li" @click="gocare">
              <p>{{follow.length}}</p>
              <p>关注</p>
            </div>
            <div class="li">
              <p>0</p>
              <p>粉丝</p>
            </div>
            <div class="li">
              <p>0</p>
              <p>获赞与收藏</p>
            </div>
          </div>

          <!-- 右边编辑 -->
          <div class="right">
            <!-- 编辑 -->
            <div class="editable" @click="goEdit">编辑资料</div>
            <!-- 设置 -->
            <div class="settings iconfont icon-shezhi"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 笔记 收藏 赞过 -->
    <div class="my_note_collection_liked">
      <div class="my_note_content">
        <van-tabs
          v-model:active="active"
          swipeable
          animated
          title-inactive-color="#808080"
          title-active-color="#2F2F2F"
          offset-top="54px"
          sticky
        >
          <van-tab title="作品">
            <div class="my_content" v-if="worksLeft.length>0">
              <!-- 左边 -->
              <div class="left" >

                <div v-for="works_l in worksLeft" :key="works_l.user_id" class="my_content_item">
           
                    <!-- 笔记图片 -->
                    <div @click="godetails(works_l.note_card?works_l.id:works_l.articleId)"  class="my_note_img" >
                      <img :src="works_l.note_card?works_l.note_card.cover.url:works_l.pictures" alt="" />
                    </div>
                    <!-- 笔记标题 -->
                    <div class="my_note_title">
                      {{works_l.note_card?works_l.note_card.display_title:works_l.title}}
                    </div>
                    <!-- 笔记作者 -->
                    <div class="author">
                      <!-- 作者头像和名字 -->
                      <div class="avatar_name">
                        <!-- 头像 -->
                        <div class="author_avatar">
                          <img :src="Myinfo.headimg" alt="" />
                        </div>

                        <!-- 名字 -->
                        <div class="author_name">{{Myinfo.name}}</div>
                      </div>

                      <!-- 点赞 (icon-aixin未点赞) (icon-aixin1已点赞)-->
                      <div @click="like(works_l.id?works_l.id:works_l.articleId)" class="like iconfont icon-aixin" v-show="!works_l.praise">
                        <div class="num">{{getFilter(works_l.note_card?works_l.note_card.interact_info.liked_count:works_l.praiseAmount)}}</div>
                      </div>
                      <div @click="like(works_l.id?works_l.id:works_l.articleId)" class="like iconfont icon-aixin1" v-show="works_l.praise">
                        <div class="num">{{getFilter(works_l.note_card?works_l.note_card.interact_info.liked_count:works_l.praiseAmount)}}</div>
                      </div>
                    </div>
 
                </div>
              </div>
              <!-- 右边 -->
              <div class="right">

                <div v-for="works_r in worksRight" :key="works_r.user_id" class="my_content_item">
           
                    <!-- 笔记图片 -->
                    <div @click="godetails(works_r.note_card?works_r.id:works_r.articleId)" class="my_note_img" >
                      <img :src="works_r.note_card?works_r.note_card.cover.url:works_r.pictures" alt="" />
                    </div>
                    <!-- 笔记标题 -->
                    <div class="my_note_title">
                      {{works_r.note_card?works_r.note_card.display_title:works_r.title}}
                    </div>
                    <!-- 笔记作者 -->
                    <div class="author">
                      <!-- 作者头像和名字 -->
                      <div class="avatar_name">
                        <!-- 头像 -->
                        <div class="author_avatar">
                          <img :src="Myinfo.headimg" alt="" />
                        </div>

                        <!-- 名字 -->
                        <div class="author_name">{{Myinfo.name}}</div>
                      </div>

                      <!-- 点赞 (icon-aixin未点赞) (icon-aixin1已点赞)-->
                      <div @click="like(works_r.id?works_r.id:works_r.articleId)" class="like iconfont icon-aixin" v-show="!works_r.praise">
                        <div class="num">{{getFilter(works_r.note_card?works_r.note_card.interact_info.liked_count:works_r.praiseAmount)}}</div>
                      </div>
                      <div @click="like(works_r.id?works_r.id:works_r.articleId)" class="like iconfont icon-aixin1" v-show="works_r.praise">
                        <div class="num">{{getFilter(works_r.note_card?works_r.note_card.interact_info.liked_count:works_r.praiseAmount)}}</div>
                      </div>
                    </div>
 
                </div>
              </div>

            </div>
            <van-empty description="暂无内容" v-if="worksLeft.length==0"/>
          </van-tab>
          <van-tab title="收藏">
            <div class="my_content" v-if="collectLeft.length>0">
              <!-- 左边 -->
              <div class="left" >

                <div v-for="collcet_l in collectLeft" :key="collcet_l.user_id" class="my_content_item">
                    <div v-if="!collcet_l.user_id">
                    <!-- 笔记图片 -->
                    <div @click="godetails(collcet_l.note_card?collcet_l.id:collcet_l.articleId)"  class="my_note_img" >
                      <img :src="collcet_l.note_card?collcet_l.note_card.cover.url:collcet_l.pictures" alt="" />
                    </div>
                    <!-- 笔记标题 -->
                    <div class="my_note_title">
                      {{collcet_l.note_card?collcet_l.note_card.display_title:collcet_l.title}}
                    </div>
                    <!-- 笔记作者 -->
                    <div class="author">
                      <!-- 作者头像和名字 -->
                      <div class="avatar_name">
                        <!-- 头像 -->
                        <div class="author_avatar">
                          <img :src="collcet_l.note_card?collcet_l.note_card.user.avatar:collcet_l.operateHeadImg" alt="" />
                        </div>

                        <!-- 名字 -->
                        <div class="author_name">{{collcet_l.note_card?collcet_l.note_card.user.nick_name:collcet_l.operateUserName}}</div>
                      </div>

                      <!-- 点赞 (icon-aixin未点赞) (icon-aixin1已点赞)-->
                      <div @click="like(collcet_l.id?collcet_l.id:collcet_l.articleId)" class="like iconfont icon-aixin" v-show="!collcet_l.praise">
                        <div class="num">{{getFilter(collcet_l.note_card?collcet_l.note_card.interact_info.liked_count:collcet_l.praiseAmount)}}</div>
                      </div>
                      <div @click="like(collcet_l.id?collcet_l.id:collcet_l.articleId)" class="like iconfont icon-aixin1" v-show="collcet_l.praise">
                        <div class="num">{{getFilter(collcet_l.note_card?collcet_l.note_card.interact_info.liked_count:collcet_l.praiseAmount)}}</div>
                      </div>
                    </div>
                    </div>
                    <div v-if="collcet_l.user_id">
                    <!-- 笔记图片 -->
                    <div @click="godetails(collcet_l.note_card?collcet_l.id:collcet_l.articleId)"  class="my_note_img" >
                      <img :src="collcet_l.note_card?collcet_l.note_card.cover.url:collcet_l.pictures" alt="" />
                    </div>
                    <!-- 笔记标题 -->
                    <div class="my_note_title">
                      {{collcet_l.note_card?collcet_l.note_card.display_title:collcet_l.title}}
                    </div>
                    <!-- 笔记作者 -->
                    <div class="author">
                      <!-- 作者头像和名字 -->
                      <div class="avatar_name">
                        <!-- 头像 -->
                        <div class="author_avatar">
                          <img :src="Myinfo.headimg" alt="" />
                        </div>

                        <!-- 名字 -->
                        <div class="author_name">{{Myinfo.name}}</div>
                      </div>

                      <!-- 点赞 (icon-aixin未点赞) (icon-aixin1已点赞)-->
                      <div @click="like(collcet_l.id?collcet_l.id:collcet_l.articleId)" class="like iconfont icon-aixin" v-show="!collcet_l.praise">
                        <div class="num">{{getFilter(collcet_l.note_card?collcet_l.note_card.interact_info.liked_count:collcet_l.praiseAmount)}}</div>
                      </div>
                      <div @click="like(collcet_l.id?collcet_l.id:collcet_l.articleId)" class="like iconfont icon-aixin1" v-show="collcet_l.praise">
                        <div class="num">{{getFilter(collcet_l.note_card?collcet_l.note_card.interact_info.liked_count:collcet_l.praiseAmount)}}</div>
                      </div>
                    </div>
                    </div>
                </div>
              </div>
              <!-- 右边 -->
              <div class="right">

                <div v-for="collect_r in collectRight" :key="collect_r.user_id" class="my_content_item">
                    <div v-if="!collect_r.user_id">
                    <!-- 笔记图片 -->
                    <div @click="godetails(collect_r.note_card?collect_r.id:collect_r.articleId)" class="my_note_img" >
                      <img :src="collect_r.note_card?collect_r.note_card.cover.url:collect_r.pictures" alt="" />
                    </div>
                    <!-- 笔记标题 -->
                    <div class="my_note_title">
                      {{collect_r.note_card?collect_r.note_card.display_title:collect_r.title}}
                    </div>
                    <!-- 笔记作者 -->
                    <div class="author">
                      <!-- 作者头像和名字 -->
                      <div class="avatar_name">
                        <!-- 头像 -->
                        <div class="author_avatar">
                          <img :src="collect_r.note_card?collect_r.note_card.user.avatar:collect_r.operateHeadImg" alt="" />
                        </div>

                        <!-- 名字 -->
                        <div class="author_name">{{collect_r.note_card?collect_r.note_card.user.nick_name:collect_r.operateUserName}}</div>
                      </div>

                      <!-- 点赞 (icon-aixin未点赞) (icon-aixin1已点赞)-->
                      <div @click="like(collect_r.id?collect_r.id:collect_r.articleId)" class="like iconfont icon-aixin" v-show="!collect_r.praise">
                        <div class="num">{{getFilter(collect_r.note_card?collect_r.note_card.interact_info.liked_count:collect_r.praiseAmount)}}</div>
                      </div>
                      <div @click="like(collect_r.id?collect_r.id:collect_r.articleId)" class="like iconfont icon-aixin1" v-show="collect_r.praise">
                        <div class="num">{{getFilter(collect_r.note_card?collect_r.note_card.interact_info.liked_count:collect_r.praiseAmount)}}</div>
                      </div>
                    </div>
                    </div>
                    <div v-if="collect_r.user_id">
                    <!-- 笔记图片 -->
                    <div @click="godetails(collect_r.note_card?collect_r.id:collect_r.articleId)" class="my_note_img" >
                      <img :src="collect_r.note_card?collect_r.note_card.cover.url:collect_r.pictures" alt="" />
                    </div>
                    <!-- 笔记标题 -->
                    <div class="my_note_title">
                      {{collect_r.note_card?collect_r.note_card.display_title:collect_r.title}}
                    </div>
                    <!-- 笔记作者 -->
                    <div class="author">
                      <!-- 作者头像和名字 -->
                      <div class="avatar_name">
                        <!-- 头像 -->
                        <div class="author_avatar">
                          <img :src="Myinfo.headimg" alt="" />
                        </div>

                        <!-- 名字 -->
                        <div class="author_name">{{Myinfo.name}}</div>
                      </div>

                      <!-- 点赞 (icon-aixin未点赞) (icon-aixin1已点赞)-->
                      <div @click="like(collect_r.id?collect_r.id:collect_r.articleId)" class="like iconfont icon-aixin" v-show="!collect_r.praise">
                        <div class="num">{{getFilter(collect_r.note_card?collect_r.note_card.interact_info.liked_count:collect_r.praiseAmount)}}</div>
                      </div>
                      <div @click="like(collect_r.id?collect_r.id:collect_r.articleId)" class="like iconfont icon-aixin1" v-show="collect_r.praise">
                        <div class="num">{{getFilter(collect_r.note_card?collect_r.note_card.interact_info.liked_count:collect_r.praiseAmount)}}</div>
                      </div>
                    </div>
                    </div>
                </div>
              </div>

            </div>
            <van-empty description="暂无内容" v-if="collectLeft.length==0"/>
          </van-tab>
          <van-tab title="赞过">
            <div class="my_content" v-if="goodLeft.length>0">
              <!-- 左边 -->
              <div class="left" >

                <div v-for="good_l in goodLeft" :key="good_l.user_id" class="my_content_item">
                    <div v-if="!good_l.user_id">
                    <!-- 笔记图片 -->
                    <div @click="godetails(good_l.note_card?good_l.id:good_l.articleId)"  class="my_note_img" >
                      <img :src="good_l.note_card?good_l.note_card.cover.url:good_l.pictures" alt="" />
                    </div>
                    <!-- 笔记标题 -->
                    <div class="my_note_title">
                      {{good_l.note_card?good_l.note_card.display_title:good_l.title}}
                    </div>
                    <!-- 笔记作者 -->
                    <div class="author">
                      <!-- 作者头像和名字 -->
                      <div class="avatar_name">
                        <!-- 头像 -->
                        <div class="author_avatar">
                          <img :src="good_l.note_card?good_l.note_card.user.avatar:good_l.operateHeadImg" alt="" />
                        </div>

                        <!-- 名字 -->
                        <div class="author_name">{{good_l.note_card?good_l.note_card.user.nick_name:good_l.operateUserName}}</div>
                      </div>

                      <!-- 点赞 (icon-aixin未点赞) (icon-aixin1已点赞)-->
                      <div @click="like(good_l.id?good_l.id:good_l.articleId)" class="like iconfont icon-aixin" v-show="!good_l.praise">
                        <div class="num">{{getFilter(good_l.note_card?good_l.note_card.interact_info.liked_count:good_l.praiseAmount)}}</div>
                      </div>
                      <div @click="like(good_l.id?good_l.id:good_l.articleId)" class="like iconfont icon-aixin1" v-show="good_l.praise">
                        <div class="num">{{getFilter(good_l.note_card?good_l.note_card.interact_info.liked_count:good_l.praiseAmount)}}</div>
                      </div>
                    </div>
                    </div>
                    <div v-if="good_l.user_id">
                    <!-- 笔记图片 -->
                    <div @click="godetails(good_l.note_card?good_l.id:good_l.articleId)"  class="my_note_img" >
                      <img :src="good_l.note_card?good_l.note_card.cover.url:good_l.pictures" alt="" />
                    </div>
                    <!-- 笔记标题 -->
                    <div class="my_note_title">
                      {{good_l.note_card?good_l.note_card.display_title:good_l.title}}
                    </div>
                    <!-- 笔记作者 -->
                    <div class="author">
                      <!-- 作者头像和名字 -->
                      <div class="avatar_name">
                        <!-- 头像 -->
                        <div class="author_avatar">
                          <img :src="Myinfo.headimg" alt="" />
                        </div>

                        <!-- 名字 -->
                        <div class="author_name">{{Myinfo.name}}</div>
                      </div>

                      <!-- 点赞 (icon-aixin未点赞) (icon-aixin1已点赞)-->
                      <div @click="like(good_l.id?good_l.id:good_l.articleId)" class="like iconfont icon-aixin" v-show="!good_l.praise">
                        <div class="num">{{getFilter(good_l.note_card?good_l.note_card.interact_info.liked_count:good_l.praiseAmount)}}</div>
                      </div>
                      <div @click="like(good_l.id?good_l.id:good_l.articleId)" class="like iconfont icon-aixin1" v-show="good_l.praise">
                        <div class="num">{{getFilter(good_l.note_card?good_l.note_card.interact_info.liked_count:good_l.praiseAmount)}}</div>
                      </div>
                    </div>
                    </div>
                </div>
              </div>
              <!-- 右边 -->
              <div class="right">

                <div v-for="good_r in goodRight" :key="good_r.user_id" class="my_content_item">
                    <div v-if="!good_r.user_id">
                    <!-- 笔记图片 -->
                    <div @click="godetails(good_r.note_card?good_r.id:good_r.articleId)" class="my_note_img" >
                      <img :src="good_r.note_card?good_r.note_card.cover.url:good_r.pictures" alt="" />
                    </div>
                    <!-- 笔记标题 -->
                    <div class="my_note_title">
                      {{good_r.note_card?good_r.note_card.display_title:good_r.title}}
                    </div>
                    <!-- 笔记作者 -->
                    <div class="author">
                      <!-- 作者头像和名字 -->
                      <div class="avatar_name">
                        <!-- 头像 -->
                        <div class="author_avatar">
                          <img :src="good_r.note_card?good_r.note_card.user.avatar:good_r.operateHeadImg" alt="" />
                        </div>

                        <!-- 名字 -->
                        <div class="author_name">{{good_r.note_card?good_r.note_card.user.nick_name:good_r.operateUserName}}</div>
                      </div>

                      <!-- 点赞 (icon-aixin未点赞) (icon-aixin1已点赞)-->
                      <div @click="like(good_r.id?good_r.id:good_r.articleId)" class="like iconfont icon-aixin" v-show="!good_r.praise">
                        <div class="num">{{getFilter(good_r.note_card?good_r.note_card.interact_info.liked_count:good_r.praiseAmount)}}</div>
                      </div>
                      <div @click="like(good_r.id?good_r.id:good_r.articleId)" class="like iconfont icon-aixin1" v-show="good_r.praise">
                        <div class="num">{{getFilter(good_r.note_card?good_r.note_card.interact_info.liked_count:good_r.praiseAmount)}}</div>
                      </div>

                    </div>
                    </div>
                    <div v-if="good_r.user_id">
                    <!-- 笔记图片 -->
                    <div @click="godetails(good_r.note_card?good_r.id:good_r.articleId)" class="my_note_img" >
                      <img :src="good_r.note_card?good_r.note_card.cover.url:good_r.pictures" alt="" />
                    </div>
                    <!-- 笔记标题 -->
                    <div class="my_note_title">
                      {{good_r.note_card?good_r.note_card.display_title:good_r.title}}
                    </div>
                    <!-- 笔记作者 -->
                    <div class="author">
                      <!-- 作者头像和名字 -->
                      <div class="avatar_name">
                        <!-- 头像 -->
                        <div class="author_avatar">
                          <img :src="Myinfo.headimg" alt="" />
                        </div>

                        <!-- 名字 -->
                        <div class="author_name">{{Myinfo.name}}</div>
                      </div>

                      <!-- 点赞 (icon-aixin未点赞) (icon-aixin1已点赞)-->
                      <div @click="like(good_r.id?good_r.id:good_r.articleId)" class="like iconfont icon-aixin" v-show="!good_r.praise">
                        <div class="num">{{getFilter(good_r.note_card?good_r.note_card.interact_info.liked_count:good_r.praiseAmount)}}</div>
                      </div>
                      <div @click="like(good_r.id?good_r.id:good_r.articleId)" class="like iconfont icon-aixin1" v-show="good_r.praise">
                        <div class="num">{{getFilter(good_r.note_card?good_r.note_card.interact_info.liked_count:good_r.praiseAmount)}}</div>
                      </div>

                    </div>
                    </div>

                </div>
              </div>

            </div>
            <van-empty description="暂无内容" v-if="goodLeft.length==0"/>
          </van-tab>
          
        </van-tabs>
      </div>
    </div>

    <!-- 顶部导航组件 -->
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { reactive, ref, toRefs } from "vue";
import { Toast ,ImagePreview  } from 'vant';
import 'vant/es/toast/style';
// import { showToast } from 'vant';
import 'vant/es/image-preview/style';
import { useRouter } from 'vue-router';
export default {
  components: { NavBar },

  setup() {
    const active = ref(0);
    const show = ref(false);
    const showPopup = () => {
      show.value = true;
    };
    const router = useRouter();
    const showShare = ref(false);
    const options = [
      { name: '微信', icon: 'wechat' },
      { name: '微博', icon: 'weibo' },
      { name: '复制链接', icon: 'link' },
      { name: '分享海报', icon: 'poster' },
      { name: '二维码', icon: 'qrcode' },
    ];

    const onSelect = (option) => {
      // console.log(option);
      showShare.value = false;
      
      Toast(option.name);

    };

    let list=reactive({
        // 所有详情页数据
        Alldata:[],
        // 首页推荐数据
        listdata:[],
        // 首页美妆数据
        HomeMakeupList:[],
        // 首页最新列表数据
        HomeNewList:[],

        worksgood:[],
        // 发布的作品数据
        works:[],
        // 左边数组
        worksLeft:[],
        // 右边数组
        worksRight:[],

        // 所有收藏数据
        collect:[],
        // 左右数据
        collectLeft:[],
        collectRight:[],

        // 所有点赞数据
        good:[],//对象
        // goodArray:[],//数组
        goodLeft:[],
        goodRight:[],

        // 首页推荐页点赞
        Homegood:[],
        // 首页美妆页点赞
        HomeMakeupgood:[],
        // 首页最新页点赞
        HomeNewgood:[],
        // 关注数据
        follow:[],
        // 个人信息
        Myinfo:null
    })
    // 详情页跳转
    let godetails = (id) =>{
      router.push({
        path:"/Details",
        query:{
          id
        }
      })
    }
    let gocare=()=>{
      router.push("/care")
    }
    // 点赞 传入图文详情页id
    let like =(id)=>{
      
      // 点击的图文在全部数据所在下标
      let Allindex = list.Alldata.findIndex(item=>item.articleId==id);
      // 首页推荐列表所在下标
      let index=list.listdata.findIndex(item=>item.id==id);
      // 首页美妆列表所在下标
      let index_makeup=list.HomeMakeupList.findIndex(item=>item.articleId==id);
      // 首页最新列表所在下标
      let index_new=list.HomeNewList.findIndex(item=>item.articleId==id);
      if(!list.Alldata[Allindex].praise){
        list.Alldata[Allindex].praise=1
        list.Alldata[Allindex].praiseAmount+=1;
        if(index!=-1 && index_makeup==-1 && index_new==-1){//首页推荐
            // 点赞数加一
            list.listdata[index].note_card.interact_info.liked_count = parseInt(list.listdata[index].note_card.interact_info.liked_count) + 1;
            //改变点赞状态
            list.listdata[index].praise=true;
            // 存入数据
            window.localStorage.setItem("listdata",JSON.stringify(list.listdata));
        }else if(index_makeup!=-1 && index==-1 && index_new==-1){//首页美妆

            list.HomeMakeupList[index_makeup].praiseAmount+=1;
            //改变点赞状态
            list.HomeMakeupList[index_makeup].praise=true;
            // 存入数据
            window.localStorage.setItem("HomeMakeup",JSON.stringify(list.HomeMakeupList));
        }else if(index_new!=-1 && index==-1 && index_makeup==-1){//首页最新

            list.HomeNewList[index_new].praiseAmount+=1;
            //改变点赞状态
            list.HomeNewList[index_new].praise=true;
            // 存入数据
            window.localStorage.setItem("HomeNew",JSON.stringify(list.HomeNewList));
        }
        // 所有详情页数据
        window.localStorage.setItem("articleDetails",JSON.stringify(list.Alldata));
      }else if(list.Alldata[Allindex].praise){
        list.Alldata[Allindex].praise=0;
        list.Alldata[Allindex].praiseAmount-=1;
        if(index!=-1 && index_makeup==-1 && index_new==-1){//首页推荐
            // 点赞数加一
            list.listdata[index].note_card.interact_info.liked_count = parseInt(list.listdata[index].note_card.interact_info.liked_count) - 1;
            //改变点赞状态
            list.listdata[index].praise=false;
            // 存入数据
            window.localStorage.setItem("listdata",JSON.stringify(list.listdata));
        }else if(index_makeup!=-1 && index==-1 && index_new==-1){//首页美妆

            list.HomeMakeupList[index_makeup].praiseAmount-=1;
            //改变点赞状态
            list.HomeMakeupList[index_makeup].praise=false;
            // 存入数据
            window.localStorage.setItem("HomeMakeup",JSON.stringify(list.HomeMakeupList));

        }else if(index_new!=-1 && index==-1 && index_makeup==-1){//首页最新

            list.HomeNewList[index_new].praiseAmount-=1;
            //改变点赞状态
            list.HomeNewList[index_new].praise=false;
            // 存入数据
            window.localStorage.setItem("HomeNew",JSON.stringify(list.HomeNewList));
        }
        // 所有详情页数据
        window.localStorage.setItem("articleDetails",JSON.stringify(list.Alldata));
      }
      created();
    }
    // 初始化
    let created = () =>{
        //判断是否有首页推荐数据
        if(window.localStorage.getItem("listdata")){
            list.listdata=JSON.parse(window.localStorage.getItem("listdata"));
        }
        //判断是否有首页美妆数据
        if(window.localStorage.getItem("HomeMakeup")){
            list.HomeMakeupList=JSON.parse(window.localStorage.getItem("HomeMakeup"));
        }
        //判断是否有首页最新数据
        if(window.localStorage.getItem("HomeNew")){
            list.HomeNewList=JSON.parse(window.localStorage.getItem("HomeNew"));
        }

        //判断是否有所有详情页数据
        if(window.localStorage.getItem("articleDetails")){
            list.Alldata=JSON.parse(window.localStorage.getItem("articleDetails"));
        }
       
        //判断是否有个人信息
        if(window.localStorage.getItem("Myinfo")){
          list.Myinfo=JSON.parse(window.localStorage.getItem("Myinfo"))[0];
        }
        // 个人发布的作品数据
        list.works=list.Alldata.filter(item=>item.user_id==404);
        window.localStorage.setItem("Myworks",JSON.stringify(list.works));

        // 首页推荐页已点赞数据 
        list.Homegood=list.listdata.filter(item=>item.praise==true);
        // 首页美妆页已点赞数据
        list.HomeMakeupgood=list.HomeMakeupList.filter(item=>item.praise==true);
        // 首页最新页已点赞数据
        list.HomeNewgood=list.HomeNewList.filter(item=>item.praise==true);
        // 个人作品
        list.worksgood=list.works.filter(item=>item.praise==1);
        // 合并所有点赞数据
        list.good=list.good.concat(list.Homegood).concat(list.HomeMakeupgood).concat(list.HomeNewgood).concat(list.worksgood);
        // 将所有点赞数据存入localstory中
        window.localStorage.setItem("good",JSON.stringify(list.good));
        //判断是否有所有点赞数据
        if(window.localStorage.getItem("good")){
          list.good=JSON.parse(window.localStorage.getItem("good"));
        }
        // 点赞部分 
        // 对象转换成数组
        // list.goodArray.push(list.good);
        // 切割数组长度向上取整
        let goodlength=Math.ceil(list.good.length/2);
        // 点赞左边数据
        list.goodLeft=list.good.splice(0,goodlength);
        // 点赞右边数据
        list.goodRight=list.good.splice(-goodlength);
        
        //收藏数据
        list.collect=list.Alldata.filter(item=>item.collect==true);
        window.localStorage.setItem("collect",JSON.stringify(list.collect));
        //判断是否有所有收藏数据
        if(window.localStorage.getItem("collect")){
            list.collect=JSON.parse(window.localStorage.getItem("collect"));
        }
        // 收藏部分
        let collectlength=Math.ceil(list.collect.length/2);
        list.collectLeft=list.collect.splice(0,collectlength);
        list.collectRight=list.collect.splice(-collectlength);

        // 切割数组长度向上取整
        let workslength=Math.ceil(list.works.length/2);
        // // 个人作品左边数组
        list.worksLeft=list.works.splice(0,workslength);
        // // 个人作品右边数组
        list.worksRight=list.works.splice(-workslength);

        // 已关注数据
        list.follow=list.Alldata.filter(item=>item.follow==true);
        window.localStorage.setItem("follow",JSON.stringify(list.follow));
        //判断是否有所有关注数据
        if(window.localStorage.getItem("follow")){
            list.follow=JSON.parse(window.localStorage.getItem("follow"));
        }
    }   
    created();

    // 过滤器
    let getFilter = (value)=>{
       if(value < 10000){
          return value;
        }
        let w = value > 10000?value/10000:value;//万计算
        let y = w > 10000? parseInt(w/10000) +"亿" :parseInt(w) +"万";
        return y;
    }
    let goto = (path,id)=>{
      router.push({
        name:path,
        id
      })
    }

    // 退出登录
    let quit = ()=>{
      router.push({
        name:"login"
      })
      window.localStorage.removeItem("tokenXiao")
    }

    let goEdit = ()=>{
      router.push("/Edit")
    }
    return { active, show, showPopup, options,
      onSelect,
      showShare,
      ImagePreview,
      quit,
      godetails,
      getFilter,
      like,
      goto,
      gocare,
      goEdit,
      ...toRefs(list)
    };
  },
};
</script>

<style lang="scss" scoped>
.myhome {
  .van-empty{
    padding: 40px 0px 59px;
  }
  .my_banner_top {
      background: linear-gradient(#444365, #4A4967);
      position: fixed;
      width: 100%;
      top: 0;
      height: 54px;
      display: flex;
      align-items: center;
      justify-content: space-between;
     
      color: #fff;
      z-index: 3;
      overflow: hidden;
      .img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        transform: translateY(42px);
        img{
          width: 100%;
        }
      }
      .iconfont {
        margin: 0 18px;
        font-size: 20px;
        opacity: 0.9;
      }
    }
  .my_banner {
    padding-top: 54px;
    background: linear-gradient(#444365, #626470);
    .menu_content {
      margin-top: 35px;
      padding: 0 28px;
      .item {
        // color: #3a3a3a;
        color: black;
        font-size: 14px;
        height: 50px;
        display: flex;
        align-items: center;
        font-weight: bold;
        .iconfont{
          margin-right: 10px;
          font-weight: normal;
          font-size: 20px;
        }
      }
    }

    .my_name {
      padding-top: 7px;
      padding-left: 16px;
      display: flex;
      position: relative;
      .img {
        width: 75px;
        height: 75px;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0 0 2px #ccc;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
        
          width: 100%;
          // height: 100%;
          display: block;
        }
      }
        .add_books {
          position: absolute;
          width: 24px;
          height: 24px;
          background-color: #fee903;
          text-align: center;
          line-height: 24px;
          border-radius: 50%;
          font-size: 10px;
          font-weight: 700;
          top: 63px;
          left: 63px;
        }
      .my_name_middle {
        color: #fff;
        margin-left: 19px;
        .nike_name {
          margin-top: 18px;
          font-size: 19px;
          font-weight: 700;
        }
        .my_id {
          margin-top: 15px;
          font-size: 11px;
          opacity: 0.3;
        }
      }
    }
    .my_content {
      padding-left: 16px;
      padding-bottom: 6px;
      .my_introduce {
        margin-top: 17px;
        color: #fff;
        font-size: 14px;
        opacity: 0.9;
      }
      .my_sex_age {
        margin-top: 12px;
        display: flex;
        background-color: rgb(255, 255, 255, 0.1);
        width: 50px;
        align-items: center;
        height: 19px;
        border-radius: 20px;
        justify-content: center;
        .sex {
          font-size: 12px;
          color: #8dafd3;
          margin-right: 5px;
        }
        .age {
          color: #fff;
          font-size: 11px;
          opacity: 0.9;
        }
      }
      .my_content_foot {
        margin-top: 20px;
        display: flex;
        .left {
          display: flex;
          .li {
            font-size: 12px;
            text-align: center;
            opacity: 0.9;
            color: #fff;
            margin-right: 27px;
            p {
              &:last-of-type {
                font-size: 11px;
                margin-top: 6px;
              }
            }
          }
        }
        .right {
          display: flex;
          flex: 1;

          .editable {
            width: 86px;
            height: 30px;
            font-size: 13px;
            color: #fff;
            text-align: center;
            line-height: 30px;
            border-radius: 30px;
            opacity: 0.9;
            border: 1px solid #fff;
            margin-right: 25px;
            background-color: rgb(255, 255, 255, 0.1);
          }
          .settings {
            width: 43px;
            height: 30px;
            color: #fff;
            text-align: center;
            line-height: 30px;
            border-radius: 30px;
            font-size: 18px;
            opacity: 0.9;
            border: 1px solid #fff;
            background-color: rgb(255, 255, 255, 0.1);
          }
        }
      }
    }
  }

  .my_note_collection_liked {
    padding-top: 16px;
    background-color: #616370;
    .my_note_content {
      background-color: #fafafa;
      border-top-right-radius: 9px;
      border-top-left-radius: 9px;
      overflow: hidden;
      .my_content {
        padding: 0 5px;
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #ededed;
        .my_content_item {
          background-color: #fff;
          width: 180px;
          border-radius: 5px;
          margin-top: 5px;
          overflow: hidden;
          .my_note_img {
            width: 100%;
            img {
              width: 100%;
            }
          }
          .my_note_title {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                margin-top: 10px;
                line-height: 20px;
                font-size: 14px;
                font-weight: bold;
                padding: 2px 8px 2px 10px;
          }
          .author {
            margin-top: 8px;
            padding: 0 8px;
            padding-bottom: 10px;
            align-items: center;
            display: flex;
            .avatar_name {
              flex: 1;
              display: flex;
              align-items: center;
              .author_avatar {
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background-color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: 0 0 3px #999;
                overflow: hidden;
                img {
                  width: 100%;
                }
              }
              .author_name {
                width: 94px;
                margin-left: 2px;
                color: #838383;
                font-size: 11px;
                transform: scale(0.9);
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
            .like {
              display: flex;
              color: #7a7a7a;
              .num {
                font-size: 10px;
                margin-left: 4px;
                color: #757575;
                line-height: 15px;
              }
              &.icon-aixin1 {
                color: #fe2842;
              }
            }
          }
        }
      }
    }
  }
}
</style>