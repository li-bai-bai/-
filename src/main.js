import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { IndexBar, IndexAnchor,Cell } from 'vant';
import App from './App.vue'
import router from './router'

import piniaPluginPersist from 'pinia-plugin-persist'

// 引入字体图标
import "./assets/font/iconfont.css"; //本地引入



let pinia = createPinia();
pinia.use(piniaPluginPersist)

// const app = createApp();
// app.use(IndexBar);
// app.use(IndexAnchor);

createApp(App).use(pinia).use(router).use(IndexBar).use(IndexAnchor).use(Cell).mount('#app');


// 路由跳转之后始终回到顶部
router.beforeEach((to, from, next) => {  
    // chrome
    document.body.scrollTop = 0
    // firefox
    document.documentElement.scrollTop = 0
    // safari
    window.pageYOffset = 0
    next()
})