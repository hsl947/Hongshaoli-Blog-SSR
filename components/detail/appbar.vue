<template>
  <div>
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button slot="left" @click="toList" icon>
        <i class="iconfont icon-fanhui"></i>
      </mu-button>
      <span v-text="testData.title"></span>
    </mu-appbar>
    <div class="time pt70">
      {{ testData.time | formatTime }}
      <p class="view-nums">
        <span v-if="testData.comments.length" class="item">
          <i class=" mu-icon material-icons mu-icon-right" style="user-select: none;">comment</i> {{ testData.comments.length }}
        </span>
        <span v-if="testData.view" class="item">
          <i class=" mu-icon material-icons mu-icon-right" style="user-select: none;">visibility</i> {{ testData.view }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Appbar',
  components: {},
  props: {
    testData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {
    toList () {
      // 为了保持后退滚动条位置
      const hasBackUrl = localStorage.getItem('hasBackUrl')
      if (hasBackUrl === 'yes') {
        window.history.back()
      } else {
        this.$router.push(`/`)
      }
    }
  }
}
</script>

<style scoped>
  .view-nums{
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  .view-nums .mu-icon{
    font-size: 20px;
    padding: 0 4px 0 8px;
  }
  .view-nums .item{
    display: flex;
    align-items: center;
  }
</style>
