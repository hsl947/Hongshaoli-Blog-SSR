<template>
  <div>
    <Drawer />
    <nuxt class="router"/>
    <CanvasNest v-if="lazyLoad" />
    <ToTop />
  </div>
</template>
<script>
import { initFloatText, initStatic } from '~/assets/js/common'
export default {
  name: 'App',
  components: {
    CanvasNest: () => import('@/components/common/CanvasNest'),
    Drawer: () => import('@/components/common/Drawer'),
    ToTop: () => import('@/components/common/ToTop')
  },
  data () {
    return {
      lazyLoad: false
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.$nextTick(() => {
      initFloatText()
      initStatic()
      setTimeout(() => {
        this.lazyLoad = true
      }, 3000)
    })
  },
  methods: {}
}
</script>
<style>
@import '@@/assets/css/material-icons.css';
@import '@@/assets/css/iconfont.css';
@import '@@/assets/css/style.css';
@import '@@/assets/css/index.css';
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
  max-width: 980px;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition:  all cubic-bezier(.55,0,.1,1) .3s ;
}
</style>
