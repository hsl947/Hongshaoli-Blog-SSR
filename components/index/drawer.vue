<template>
  <div>
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="open=true">
        <i class="iconfont icon-caidan"></i>
      </mu-button>
      <span>改版中...</span>
      <!-- <span>Shaoli's Blog</span> -->
    </mu-appbar>
    <mu-drawer :open.sync="open" :docked="false" :left="true">
      <mu-list>
        <mu-list-item button @click="open=false">
          <mu-list-item-title>首页</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :to="'/admin'">
          <mu-list-item-title>Admin后台首页</mu-list-item-title>
        </mu-list-item>
        <!--
                <mu-list-item button :to="'/chat_login'">
                <mu-list-item-title>测试聊天</mu-list-item-title>
                </mu-list-item> 
        -->
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
  name: 'drawer',
  props: {},
  data() {
    return {
      open: false
    }
  },
  components: {},
  created() {},
  computed: {},
  methods: {},
  watch: {}
}
</script>
 
<style>
</style>