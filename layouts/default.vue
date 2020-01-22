<template>
  <div>
    <Drawer />
    <nuxt class="router"/>
    <CanvasNest v-if="lazyLoad" />
    <ToTop />
  </div>
</template>
<script>
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
  created () {

  },
  mounted () {
    this.initStatic()
    this.initAnimate()
    setTimeout(() => {
      this.lazyLoad = true
    }, 3000)
  },
  methods: {
    initStatic () {
      // 百度统计添加
      const hm = document.createElement('script')
      hm.src = 'https://hm.baidu.com/hm.js?3a99bc5fc48167f2e4d0c32bcba6c762'
      const s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)

      // 友盟统计添加
      const ym = document.createElement('script')
      ym.src = 'https://s23.cnzz.com/z_stat.php?id=1276871081&web_id=1276871081'
      ym.language = 'JavaScript'
      document.body.appendChild(ym)
    },
    initAnimate () {
      (function (window, document) {
        const hearts = []
        window.requestAnimationFrame = (function () {
          return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback) {
            setTimeout(callback, 1000 / 60)
          }
        })()
        init()
        function init () {
          css(`
            .heart{
              font-weight: bold;
              user-select: none;
              position: fixed;
              font-size: 18px;
              font-style: normal;
              text-shadow: 0 0 4px #999;
              z-index: 9999;
          `)
          attachEvent()
          gameloop()
        }
        function gameloop () {
          for (let i = 0; i < hearts.length; i++) {
            if (hearts[i].scale >= 1.08) {
              document.body.removeChild(hearts[i].el)
              hearts.splice(i, 1)
              continue
            }
            hearts[i].y--
            hearts[i].scale += 0.001
            hearts[i].el.style.cssText = 'color:' + hearts[i].color + ';left:' + hearts[i].x + 'px;top:' + hearts[i].y + 'px;opacity:' + hearts[i].alpha + ';transform:scale(' + hearts[i].scale + ',' + hearts[i].scale + ');'
          }
          requestAnimationFrame(gameloop)
        }
        function attachEvent () {
          const old = typeof window.onclick === 'function' && window.onclick
          window.onclick = function (event) {
            old && old()
            createHeart(event)
          }
        }
        let aIndex = 0
        function createHeart (event) {
          const a = ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善']
          aIndex = (aIndex + 1) % a.length
          const d = document.createElement('i')
          d.textContent = a[aIndex]
          d.className = 'heart'
          hearts.push({
            el: d,
            x: event.clientX - 5,
            y: event.clientY - 5,
            scale: 1,
            alpha: 1,
            color: randomColor()
          })
          document.body.appendChild(d)
        }
        function css (css) {
          const style = document.createElement('style')
          style.type = 'text/css'
          try {
            style.appendChild(document.createTextNode(css))
          } catch (ex) {
            style.styleSheet.cssText = css
          }
          document.getElementsByTagName('head')[0].appendChild(style)
        }
        function randomColor () {
          return 'rgb(' + (~~(Math.random() * 255)) + ',' + (~~(Math.random() * 255)) + ',' + (~~(Math.random() * 255)) + ')'
        }
      })(window, document)
    }
  }
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
