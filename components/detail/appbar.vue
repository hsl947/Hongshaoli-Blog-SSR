<template>
  <div>
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" onclick="window.history.back()">
        <i class="iconfont icon-fanhui"></i>
      </mu-button>
      <span v-text="testData.title"></span>
    </mu-appbar>
    <p class="time pt70">{{testData.time | formatTime}} - 洪少利</p>
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
 
<style>
</style>