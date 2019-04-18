<template>
  <div id="app">
    <nuxt class="router"/>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      
    }
  },
  components: {
   
  },
  created() {},
  mounted() {
    //this.initStatic();
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.router{
  max-width: 750px;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition:  all cubic-bezier(.55,0,.1,1)   .3s ;
}
</style>
