import { defineStore } from 'pinia'

// 第一种写法 包含state,getters,actions写法
export const useStore = defineStore('index', {
    // 唯一数据源
    state: () => ({
       count: 66,
       address:["books"]
       
    }),
    // getters像计算属性一样效果
    getters: {
      
    },
    // actions 异步操作 请求api
    actions: {
      increment() {
        console.log("actions==>",this);
        this.count++
      },
    },

    persist:{
      enabled:true , //这个配置代表存储生效，而且是整个store都存储
      // storage:sessionStorage
      // storage: localStorage
      strategies: [
        { storage: localStorage, paths: ['address'] }
      ],
    }


})