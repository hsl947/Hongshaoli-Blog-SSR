<template>
  <div>
    <nuxt class="router"/>
    <canvas-nest v-if="lazyLoad"></canvas-nest>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      lazyLoad: false
    }
  },
  components: {
    canvasNest: resolve => {require(['@/components/canvas-nest'], resolve)}
  },
  created() {},
  mounted() {
    this.initStatic();
    setTimeout(()=>{
      this.lazyLoad = true;
    }, 3000);
  },
  methods: {
    initStatic() {
      // 百度统计添加
      var _hmt = _hmt || [];
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?3a99bc5fc48167f2e4d0c32bcba6c762";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);

      // 友盟统计添加
      const ym = document.createElement("script");
      ym.src = "https://s23.cnzz.com/z_stat.php?id=1276871081&web_id=1276871081";
      ym.language = "JavaScript";
      document.body.appendChild(ym);
    }
  },
  watch:{}
};
</script>
<style>
@import '@@/static/css/iconfont.css';
@import '@@/static/css/style.css';
@import '@@/static/css/index.css';
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.router{
  max-width: 750px;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition:  all cubic-bezier(.55,0,.1,1) .3s ;
}
</style>
