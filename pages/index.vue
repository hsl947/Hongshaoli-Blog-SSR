<template>
  <div>
    <drawer></drawer>
    <list :articles="articles" :loading="loading" :finished="finished"></list>
    <to-top></to-top>
  </div>
</template>

<script>
export default {
  head: {
    title: '首页-洪少利的博客'
  },
  data() {
    return {
      
    }
  },
  components: {
    drawer: resolve => {require(['@/components/index/drawer'], resolve)},
    toTop: resolve => {require(['@/components/index/toTop'], resolve)},
    list: resolve => {require(['@/components/index/list'], resolve)}
  },
  fetch({ store }) {
    if(store.state.list.data.length) return;
    return Promise.all([
      store.dispatch('fetchList')
    ])
  },
  computed: {
    articles() {
      return this.$store.state.list.data
    },
    loading() {
      return this.$store.state.list.loading
    },
    finished() {
      return this.$store.state.list.finished
    }
  },
  methods: {
    
  },
  mounted() {
    
  }
}
</script>

<style>
/* .container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
} */
.mu-paper{
  background: none;
}
.mu-drawer{
  background: #fff;
}
.mu-list{
  padding-bottom: 0;
  margin-bottom: 8px;
  background: #fff;
}
.mu-list>li{
  border-bottom: solid 1px rgba(0,0,0,.12);
}
.no-data{
  color: #999;
  font-size: 14px;
  text-align: center;
  padding: 10px 0;
}
.icon-caidan, .icon-jiantou{
  font-size: 26px;
}
.view-num{
    position: absolute;
    right: 20px;
    height: 48px;
    line-height: 48px;
    font-size: 14px;
}
.view-num .mu-icon{
  font-size: 20px;
  vertical-align: text-top;
}
@keyframes refreshRotate{
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.refreshing{
  animation: refreshRotate 2s 1;
}
</style>
