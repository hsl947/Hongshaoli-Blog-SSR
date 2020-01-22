<template>
  <div>
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button slot="left" @click="open=true" icon>
        <i class="iconfont icon-caidan"></i>
      </mu-button>
      <span>改版ing...</span>
      <!-- <span>Shaoli's Blog</span> -->
      <mu-button slot="right" @click="refresh" icon>
        <i :class="{'refreshing': refreshing}" class="iconfont icon-refresh"></i>
      </mu-button>
    </mu-appbar>
    <mu-drawer :open.sync="open" :docked="false" :left="true">
      <mu-list>
        <mu-list-item @click="open=false" button>
          <mu-list-item-title>首页</mu-list-item-title>
        </mu-list-item>
        <mu-list-item :to="'/admin'" button>
          <mu-list-item-title>Admin后台首页</mu-list-item-title>
        </mu-list-item>
        <mu-list-item :to="'/chat_login'" button>
          <mu-list-item-title>测试聊天</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button target="_blank" href="https://www.hongshaoli.cn/">
          <mu-list-item-title>关于我</mu-list-item-title>
        </mu-list-item>
        <mu-list-item @click="open = false" button>
          <mu-list-item-title>Close</mu-list-item-title>
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
