<template>
    <div class="identing">
        <!-- 头部鉴别内容 -->
        <div class="headerContent">
            <div class="headerTop">
                <div class="left iconfont icon-zuojiantou" @click="$router.go(-1)"></div>
                <div class="right">
                    <span>了解鉴别</span>
                    <i class="iconfont  icon-youjiantou"></i>
                </div>
            </div>
            <div class="headermiddle">
                <h1>实物鉴别服务</h1>
                <div class="icon">
                    <span>专业团队</span>
                    <span>权威鉴别</span>
                    <span>严谨准确</span>
                </div>
            </div>
        </div>
        <!-- 中间内容 -->
        <div class="content">
            <div class="contentTop">
                <div class="lefttop">
                    <img :src="brand.image" alt="">
                </div>
                <div class="righttop">
                    <div class="title">鞋 {{brand.name}}</div>
                    <div class="middle">{{brand.name}}</div>
                    <div class="bottom">￥41.40</div>
                </div>
            </div>
            <div class="contentmiddle">先审核后鉴别</div>
            <div class="contentbottom">
                下单付款···商品审核···平台鉴别···鉴别报告
            </div>
        </div>

        <!-- 鉴定图片 -->
        <div class="idenImage">
            <div class="toptitle">
                <div class="lefttop">添加需要鉴别商品图</div>
                <div class="righttop">接收标准<span class="icon-yk_gantanhao iconfont"></span></div>
            </div>
            <div class="tips">
                *为保证服务质量,建议您提供满足拍摄要求的图片,鉴定师审核通过后,商品可寄送至平台
            </div>
            <ul>
                <li v-for="(item,index) in image" :key="index" @click="imageIndex = index">
                    <img :src="item" class="auto-img iamge" alt="">
                    <van-uploader :after-read="afterRead" />
                </li>
            </ul>
            <div class="middlecontent">
                <div class="lefttop">优惠券</div>
                <div class="righttop">无可用优惠券<span class="iconfont icon-youjiantou"></span></div>
            </div>
            <div class="middlecontent">
                <div class="lefttop">回寄包邮券</div>
                <div class="righttop">无可用包邮券<span class="iconfont icon-youjiantou"></span></div>
            </div>
            <div class="bottom">
                查看<span>《券使用说明》</span>
            </div>
        </div>

        <div class="footer">
            <div class="footerContent" @click="gopay">活动价<span>￥41.40</span></div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import { useRoute ,useRouter} from 'vue-router';
import { Dialog, Toast } from 'vant'
import 'vant/es/dialog/style';
import 'vant/es/toast/style';
export default {
    setup() {
        let route = useRoute();
        let router = useRouter();
        let list = reactive({

            fileList:[],
            // 图片
            image:[
                require("../assets/img/001.png"),
                require("../assets/img/002.png"),
                require("../assets/img/003.png")
            ],
            // 图片下标
            imageIndex:"",
            // 品牌
            brand:null,
            // 鉴定对象
            idenObj:null
        })
        // 初始化
        let created = ()=>{
            // 获取品牌数组
            let brandList = JSON.parse(window.localStorage.getItem("brandList"));
            // 获取路由传参
            let name = route.query.name;
            // 获取下标
            let index = brandList.findIndex(item => item.name == name);
            list.brand = brandList[index];
        }
        created();

        // 上传图片
        const afterRead = (file) => {
          // 此时可以自行将文件上传至服务器
        //   console.log(file.content);
        list.image[list.imageIndex] = file.content

        };

        // 付费鉴别
        let gopay = ()=>{
            Dialog.confirm({
            title: '确认支付',
            message:'',
            }).then(() => {
                // 鉴定结果数组
                let idenList = [];
                // 鉴定对象
                list.idenObj = {
                    id:+new Date(),
                    brandName:list.brand.name,
                    brandImage:list.brand.image,
                    image:list.image
                }
                idenList.push(list.idenObj);
                // 数据持久化
                window.localStorage.setItem("identResult",JSON.stringify(idenList));
                
                // 支付成功
                Toast("支付成功,鉴定结果请稍等");
                router.push({
                    name:"myhome"
                })

            }).catch(() => {
                //支付失败
                Toast("取消支付");

            });
        }

        return {
            ...toRefs(list),
            afterRead,
            gopay
        }
    },
}
</script>


<style lang="scss" scoped>
.identing{
    position: relative;
    height: 100vh;
    background: #f4f4f8;
    .headerContent{
        width: 100%;
        height: 210px;
        background: linear-gradient(#3d4254 53%,#fff);

        .headerTop{
            width: 100%;
            display: flex;
            justify-content: space-between;
            height: 50px;
            align-items: center;
            .left{
                margin-left: 10px;
                font-size: 26px;
                color: #fff;
            }
            .right{
                height: 26px;
                width: 79px;
                background: #556675;
                border-top-left-radius: 13px;
                border-bottom-left-radius: 13px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                span{
                    font-size: 12px;
                    color: #fff;
                }
                i{
                    color: #fff;
                    margin-right: 5px;
                }
            }
        }
        .headermiddle{
            margin-top: 5px;
            h1{
                margin-left: 16px;
                font-size: 25px;
                font-weight: bold;
                color: #fff;
            }
            .icon{
                margin-top: 10px;
                margin-left: 16px;
                font-size: 12px;
                color: #a7a9b1;
                span{
                    margin-right: 10px;
                }
            }
        }
    }

    .content{
        position: absolute;
        top: 118px;
        height: 160px;
        width: 355px;
        margin: 0 10px;
        background: #fff;
        border-radius: 5px;
        padding: 10px;
        box-sizing: border-box;

        .contentTop{
            display: flex;
            align-items: center;
            width: 100%;
            height: 70px;
            .lefttop{
                width: 68px;
                height: 68px;
                display:flex;
                align-items: center;
                border: 1px solid rgb(231, 230, 230);

                img{
                    width: 100%;
                }
            }
            .righttop{
                margin-left: 10px;

                .title{
                    font-size: 18px;
                    font-weight: bold;
                }
                .middle{
                    margin-top: 10px;
                    font-size: 12px;
                    color: #4e4e4e;
                }
                .bottom{
                    margin-top: 15px;
                    font-size: 13px;
                    font-weight: bold;
                }
            }
        }
        .contentmiddle{
            margin-top: 25px;
            font-size: 15px;
            font-weight: bold;
        }
        .contentbottom{
            margin-top: 10px;
            font-size: 12px;
            color: #4c4d50;
        }

    }


    .idenImage{
        margin: 0 10px;
        background: #fff;
        margin-top:80px;
        width: 355px;
        border-radius: 5px;
        padding: 10px;
        box-sizing: border-box;

        .toptitle{
            margin-top:6px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .lefttop{
                font-size: 15px;
                font-weight: bold;
            }
            .righttop{
                display: flex;
                align-items: center;
                font-size: 12px;
                color: #7a7a89;
                span{
                    font-size: 14px;
                    margin-left: 3px;
                }
            }
        }
        .tips{
            margin-top: 10px;
            font-size: 12px;
            color: #92929f;
            line-height: 18px;
        }
        ul{
            margin-top: 13px;
            display: flex;
            
            li{
                display: flex;
                align-items: center;
                justify-content: center;
                height: 77px;
                width: 77px;
                border: 1px dashed #e0e0e9;
                margin-right: 8px;
                color: #7c7c8c;
                font-size: 12px;
                position: relative;
                .iamge{
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 10;
                }
                ::v-deep .van-uploader{
                    position: absolute;
                    top: 0;
                    left: 0px;
                    opacity: 0;
                    z-index: 999;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    .van-uploader__upload{
                        margin: 0;
                    }
                }
            }
        }
        .middlecontent{
            margin-top: 25px;
            display: flex;
            justify-content: space-between;

            .lefttop{
                font-size: 15px;
                font-weight: bold;
            }

            .righttop{
                font-size: 12px;
                color: #7a7a89;
                span{
                    font-size: 14px;
                    margin-left: 3px;
                }
            }
        }
        .bottom{
            margin-top: 25px;
            font-size: 12px;
            color:#7a7a89 ;
            span{
                font-size: 13px;
                font-weight: bold;
                color: black;
            }
        }
    }

    .footer{
        margin-top: 18px;
        background: #fff;
        height: 60px;
        padding: 0 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .footerContent{
            height: 40px;
            width: 100%;
            background: #06c2c3;
            text-align: center;
            line-height: 40px;
            font-size: 17px;
            font-weight: bold;
            color: #fff;
            border-radius: 5px;
            span{
                font-size: 18px;
            }
        }
    }

    
}
</style>