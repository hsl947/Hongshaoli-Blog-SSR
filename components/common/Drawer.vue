<template>
  <div>
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button slot="left" @click="open=true" icon>
        <i class="iconfont icon-caidan"></i>
      </mu-button>
      <h3>Shaoli's Blog</h3>
      <mu-button slot="right" @click="refresh" icon>
        <i :class="{'refreshing': refreshing}" class="iconfont icon-refresh"></i>
      </mu-button>
    </mu-appbar>
    <mu-drawer :open.sync="open" :docked="false" :left="true">
      <mu-list>
        <mu-list-item button>
          <mu-list-item-title style="color: #2196f3">😃-欢迎光临-😀</mu-list-item-title>
        </mu-list-item>
        <mu-list-item :to="'/'" @click="open=false" button>
          <mu-list-item-title>🐶Blog-首页</mu-list-item-title>
        </mu-list-item>
        <mu-list-item :to="'/admin'" @click="open=false" button>
          <mu-list-item-title>🐱Blog-管理后台</mu-list-item-title>
        </mu-list-item>
        <mu-list-item :to="'/project'" @click="open=false" button>
          <mu-list-item-title>🦊我的项目/作品</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button target="_blank" href="https://www.hongshaoli.cn/">
          <mu-list-item-title>🐨关于我</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>
export default {
  name: 'Drawer',
  components: {},
  props: {},
  data () {
    return {
      open: false,
      refreshing: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    refresh () {
      if (this.refreshing) { return }
      this.$store.commit('updateListEnd', false)
      this.$store.commit('updateListPage', 1)
      this.$store.dispatch('fetchList', { page: 1 })
      this.refreshing = true
      window.scrollTo(0, 0)
      setTimeout(() => {
        this.refreshing = false
      }, 2000)
    }
  }
}
</script>

<style>
</style>
