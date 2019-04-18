const pkg = require('./package')
const resolve = require('path').resolve;

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: "洪少利的主页, 加载中...",
    meta: [
      { charset: 'utf-8' },
      { renderer: 'webkit' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0' },
      { hid: 'description', name: 'description', content: '这是洪少利的个人网站，也是个人主页，平时记录一些技术博客文章等等' },
      { hid: 'Keywords', name: 'Keywords', content: '洪少利,HongShaoli,洪少利的个人网站，洪少利的博客，洪少利的个人主页' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#ff5722' },

  /*
   ** Global CSS
   */
  css: [
    
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '~plugins/MuseUI',
      ssr: true,
    },
    {
      src: '~plugins/main',
      ssr: true,
    },
    {
      src: '~plugins/vue-quill-editor',
      ssr: true,
    }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true,
    prefix: '/api', // baseURL
    credentials: true
  },

  proxy: {
    '/api': {
      target: 'http://localhost:8008', // 代理地址
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', //将 /api 替换掉
      },
    },
  },
  
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      /*
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      */
    }
  },
  vendor: ['muse-ui'],   //防止被打包多次
  server: {
    port: 3000, // default: 3000
    host: '127.0.0.1', // default: localhost
  }
}
