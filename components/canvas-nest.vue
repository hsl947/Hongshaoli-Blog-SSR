<template>
  <div id="canvas-area" class="canvas-area">
    <vue-canvas-nest :config="{color: rgbColor, count: count}" :el="'#canvas-area'"></vue-canvas-nest>
  </div>
</template>

<script>
/**
 * canvas网格组件
 * 用法：<canvas-nest></canvas-nest>
 */
import vueCanvasNest from 'vue-canvas-nest'
export default {
  name: 'CanvasNest',
  components: {
    vueCanvasNest
  },
  props: {

  },
  data () {
    return {
      count: 88,
      rgbColor: '1,1,1'
    }
  },
  created () {
    if (this.isMobile()) {
      this.count = 33
    }
  },
  methods: {
    isMobile () {
      const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag
    }
  }
}
</script>

<style>
    .canvas-area{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -2;
    }
</style>
