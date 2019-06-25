<template>
  <mu-button @click="toTop" id="toTop" button class="mu-button mu-fab-button mu-inverse">
    <div class="mu-button-wrapper">
      <div class="mu-ripple-wrapper"></div>
      <i class="iconfont icon-jiantou"></i>
    </div>
  </mu-button>
</template>
 
<script>
export default {
  name: 'toTop',
  props: {},
  data() {
    return {}
  },
  components: {},
  created() {},
  mounted() {
    this.initTimer()
  },
  methods: {
    initTimer() {
      var timer1,
        toTop = document.getElementById('toTop')
      window.onscroll = () => {
        if (timer1) clearTimeout(timer1)
        timer1 = setTimeout(() => {
          let scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop
          if (scrollTop > 300) {
            toTop.style.bottom = '16px'
          } else {
            toTop.style.bottom = '-80px'
          }
        }, 300)
      }
    },
    toTop() {
      var timer2
      if (timer2) clearTimeout(timer2)
      timer2 = setTimeout(() => {
        window.scrollTo(0, 0)
        clearInterval(timer2)
      }, 50)
    }
  }
}
</script>
 
<style>
#toTop {
  user-select: none;
  outline: none;
  -webkit-appearance: none;
  background-color: #2196f3;
  position: fixed;
  right: 16px;
  bottom: -80px;
  z-index: 101;
  min-width: 56px;
  transition: all 0.3s;
}
</style>