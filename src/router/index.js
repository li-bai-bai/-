import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  // 重定向
  {
    path: '/',
    redirect: "/home"
  },

  //首页
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },

  // 购物
  {
    path: '/shopping',
    name: 'shopping',
    component: () => import('../views/ShoppingView.vue')
  },
  
  //服务
  {
    path: '/service',
    name: 'service',
    component: () => import('../views/ServiceView.vue')
  },

  //我的
  {
    path: '/myhome',
    name: 'myhome',
    component: () => import('../views/MyhomeView.vue')
  },

  // 搜索
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView.vue')
  },
  //购物车
  {
    path: '/car',
    name: 'car',
    component: () => import('../views/CarView.vue')
  },
  // 商品搜索
  {
    path: '/shoppingsearch',
    name: 'shoppingsearch',
    component: () => import('../views/ShoppingSearch.vue')
  },

  // 购物搜索 分类搜索
  {
    path: '/categoryList',
    name: 'categoryList',
    component: () => import('../views/CategoryListView.vue')
  },
  // 笔记图文详情
  {
    path:'/Details',
    name:'Details',
    component: () => import('../views/ArticleDetailsView.vue')
  },
  // 商品详细信息
  {
    path: '/goodsdetails',
    name: 'goodsdetails',
    component: () => import('../views/GoodsDetails.vue')
  },
  // 订单页
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/OrderView.vue')
  },
  // 浏览记录页
  {
    path: '/browse',
    name: 'browse',
    component: () => import('../views/BrowseView.vue')
  },
  // 草稿页
  {
    path: '/draft',
    name: 'draft',
    component: () => import('../views/DraftView.vue')
  },
  // 发布页
  {
    path: '/release',
    name: 'release',
    component: () => import('../views/ReleaseView.vue')
  },
  
  // 地址列表
  {
    path: '/addressList',
    name: 'addressList',
    component: () => import('../views/AddressList.vue')
  },
  // 添加地址
  {
    path: '/addAddress',
    name: 'addAddress',
    component: () => import('../views/AddAddress.vue')
  },
  // 私信
  {
    path: '/private',
    name: 'private',
    component: () => import('../views/PrivateView.vue')
  },
  // 初始登录
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  // 分类全部
  {
    path: '/categorySearch',
    name: 'categorySearch',
    component: () => import('../views/CategorySearch.vue')
  },
  // 作者主页
  {
    path: '/authorHomePage',
    name: 'authorHomePage',
    component: () => import('../views/AuthorHomePage.vue')
  },
  // 手机号登录页
  {
    path: '/phone',
    name: 'phone',
    component: () => import('../views/PhoneView.vue')
  },
  // 商品评价页
  {
    path: '/evaluate',
    name: 'evaluate',
    component: () => import('../views/EvaluateView.vue')
  },
  // 排行榜
  {
    path: '/ranking',
    name: 'ranking',
    component: () => import('../views/RankingView.vue')
  },
  // 首页搜索数据列表
  {
    path: '/searchDataList',
    name: 'searchDataList',
    component: () => import('../views/SearchDataList.vue')
  },
  // 订单支付页
  {
    path: '/pay',
    name: 'pay',
    component: () => import('../views/PayView.vue')
  },
  // 鉴别页
  {
    path:"/identify",
    name:"identify",
    component:()=>import("../views/identifyView.vue")
  },
  // 在线鉴别页
  {
    path:"/discern",
    name:"discern",
    component:()=>import("../views/discernView.vue")
  },
  // 正在鉴别页
  {
    path:"/identing",
    name:"identing",
    component:()=>import("../views/identingView.vue")
  },
  //商品评论
  {
    path:"/PublishComment",
    name:"PublishComment",
    component:()=>import("../views/PublishComment.vue")
  },
  // 关注页面
  {
    path:"/care",
    name:"care",
    component:()=>import("../views/CareView.vue")
  },
  // 鉴定结果页
  {
    path:'/identifyResult',
    name:'identifyResult',
    component:()=>import("../views/identifyResultView.vue")
  },
  // 商品分类导航页
  {
    path:'/navigation',
    name:'navigation',
    component:()=>import("../views/navigationView.vue")
  },
  // 店铺客服人工智能回答
  {
    path:'/chat',
    name:'chat',
    component:()=>import("../views/chatView.vue")
  },
  //商品评论
  {
    path:"/wishList",
    name:"wishList",
    component:()=>import("../views/WishListView.vue")
  },
  // 修改个人信息
  {
    path:"/Edit",
    name:"Edit",
    component:()=>import("../views/EditMyinfoView.vue")
  },
  {
    path:"/Brand",
    name:"Brand",
    component:()=>import("../views/BrandView.vue")
  }
  

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // linkActiveClass: "active",
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  }
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
    let token = window.localStorage.getItem("tokenXiao");
    // 判断有没有登录
	if (!token) {
		if (to.name == "login" || to.name == 'phone') {
			next();
		} else {
			router.push('login')
		}
	} else {
		next();
	}
});


export default router
