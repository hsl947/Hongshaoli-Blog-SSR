<template>
  <mu-appbar style="width: 100%;" color="primary">
    <mu-button slot="left" @click="backFn" icon>
      <i class="iconfont icon-fanhui"></i>
    </mu-button>
    <span v-text="title"></span>
  </mu-appbar>
</template>

<script>
export default {
  name: 'CommonAppbar',
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    },
    backFn: {
      type: Function,
      default: () => window.history.back()
    }
  },
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped>

</style>
