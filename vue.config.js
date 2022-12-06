const { defineConfig } = require('@vue/cli-service');
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/xiaohongshu': {
        target: 'https://www.fastmock.site/mock/3289a8cc05af18bb0ce861c9af49eb3f',
        ws: true,
        changeOrigin: true
      },
      // 人工智能回答
      //http://api.qingyunke.com/api.php
      '/api.php': {
        target: 'http://api.qingyunke.com',
        ws: false,
        changeOrigin: true,
      },
    }
  },
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
})

