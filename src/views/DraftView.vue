<template>
    <div class="draft">
        <div class="nav">
            <div @click="$router.go(-1)" class="left iconfont icon-zuojiantou"></div>
            <h5>本地草稿</h5>
            <p></p>
        </div>
        <div class="null"></div>
        <div class="toast">❗ 草稿在应用卸载后会被删除，请及时发布</div>
        <div class="draftbox">
            <div class="my_content">
              <!-- 左边 -->
              <div class="left" >

                <div class="my_content_item" v-for="save_L in save_boxL" :key="save_L.id">
           
                    <!-- 笔记图片 -->
                    <div @click="gorelease(save_L.id)" class="my_note_img" >
                      <img :src="save_L.img" alt="" />
                    </div>
                    <!-- 笔记标题 -->
                    <div class="my_note_title">
                      {{save_L.title}}
                    </div>
                    <!-- 笔记作者 -->
                    <div class="author">
                      <!-- 作者头像和名字 -->
                      <div class="avatar_name">
                        <!-- 头像 -->
                        <!-- <div class="author_avatar">
                          <img src="" alt="" />
                        </div> -->

                        <!-- 名字 -->
                        <div class="author_name">刚刚</div>
                      </div>

                      <!-- 点赞 (icon-aixin未点赞) (icon-aixin1已点赞)-->
                      <div @click="del(save_L.id)" class="like iconfont icon-shanchu">
                        <div class="num"></div>
                      </div>
                    </div>
 
                </div>
                
              </div>
              <!-- 右边 -->
              <div class="right">

                <div class="my_content_item" v-for="save_R in save_boxR" :key="save_R.id">
           
                    <!-- 笔记图片 -->
                    <div @click="gorelease(save_R.id)" class="my_note_img" >
                      <img :src="save_R.img" alt="" />
                    </div>
                    <!-- 笔记标题 -->
                    <div class="my_note_title">
                      {{save_R.title}}
                    </div>
                    <!-- 笔记作者 -->
                    <div class="author">
                      <!-- 作者头像和名字 -->
                      <div class="avatar_name">
                        <!-- 头像 -->
                        <!-- <div class="author_avatar">
                          <img src="../assets/image/IMG_20221016_221132.jpg" alt="" />
                        </div> -->

                        <!-- 名字 -->
                        <div class="author_name">刚刚</div>
                      </div>

                      <!-- 点赞 (icon-aixin未点赞) (icon-aixin1已点赞)-->
                      <div @click="del(save_R.id)" class="like iconfont icon-shanchu">
                        <div class="num"></div>
                      </div>
                    
                    </div>
 
                </div>
               
              </div>

            </div>
            <van-empty v-if="save_box.length==0" description="暂无内容" />
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useRouter } from 'vue-router'
export default {
    setup () {
        let router = useRouter();
        let list =reactive({
            save_box:[],
            save_boxL:[],
            save_boxR:[],
        })
        let created=()=>{
            //判断是否有所有收藏数据
            if(window.localStorage.getItem("save_box")){
                list.save_box=JSON.parse(window.localStorage.getItem("save_box"));
            }
            // 切割数组长度向上取整
            let save_boxlength=Math.ceil(list.save_box.length/2);
            // 点赞左边数据
            list.save_boxL=list.save_box.slice(0,save_boxlength);
            // 点赞右边数据
            if(list.save_box.length > 1){
              list.save_boxR=list.save_box.slice(-save_boxlength);
            }

            // list.save_boxL = [];
            // list.save_boxR = [];
            // // 切割数组
            // for(let i = 0 ; i<list.save_box.length;i++){

            //   if( i == 0 || i%2 == 0){
            //     list.save_boxL.push(list.save_box[i]);
            //     // console.log(i);
            //   }else if( i % 2 != 0){
            //     list.save_boxR.push(list.save_box[i]);
            //     // console.log(i,"奇数");
            //   }
            // }
        }   
        created();
        let del=(id)=>{
            console.log(id);
            let index= list.save_box.findIndex(item=>item.id==id);
            list.save_box.splice(index,1);
            window.localStorage.setItem("save_box",JSON.stringify(list.save_box));
            created();
        }
        let gorelease=(id)=>{
            console.log(id);
            router.push({
                path:"/release",
                query:{
                    id
                }
            })
        }
        return {
            gorelease,
            del,
            ...toRefs(list)
        }
    }
}
</script>

<style lang="scss" scoped>
.draft{
    background-color: #f7f7f7;
    .nav{
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
        .left{
            font-size: 24px;
        }
        h5{
            font-size: 15px;
        }
        p{
            width: 24px;
            font-size: 14px;
        }
    }
    .toast{
        height: 32px;
        display: flex;
        align-items: center;
        padding: 0 17px;
        font-size: 12px;
        background-color: #f7f7f7;
    }
    .draftbox{
        
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
            
            padding: 0 3px;
            padding-bottom: 5px;
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
    .null{
        width: 100%;
        height: 50px;
    }
}
</style>