<template>
  <div>
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" onclick="window.history.back()">
        <i class="iconfont icon-fanhui"></i>
      </mu-button>
      <span v-text="testData.title"></span>
    </mu-appbar>
    <p class="time pt70">
      {{testData.time | formatTime}} - 洪少利 
      <span class="view-nums" v-if="testData.view">
        <i class=" mu-icon material-icons mu-icon-right" style="user-select: none;">visibility</i> {{testData.view}}
      </span>
    </p>
  </div>
</template>
 
<script>
export default {
  name: 'appbar',
  props: {
    testData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {}
  },
  components: {},
  created() {},
  mounted() {},
  methods: {}
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
    padding: 0 4px 0 30px;
  }
</style>