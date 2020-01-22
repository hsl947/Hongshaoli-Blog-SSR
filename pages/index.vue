<template>
  <div>
    <Drawer />
    <List :articles="articles" :loading="loading" :finished="finished" />
    <ToTop />
  </div>
</template>

<script>
export default {
  middleware: 'index',
  head: {
    title: '首页-洪少利的博客'
  },
  components: {
    Drawer: () => import('@/components/index/Drawer'),
    List: () => import('@/components/index/List'),
    ToTop: () => import('@/components/index/ToTop')
  },
  data () {
    return {}
  },
  computed: {
    articles () {
      return this.$store.state.list.data
    },
    loading () {
      return this.$store.state.list.loading
    },
    finished () {
      return this.$store.state.list.finished
    }
  },
  fetch ({ store }) {
    if (store.state.list.data.length) { return }
    return Promise.all([
      store.dispatch('fetchList')
    ])
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style>
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
    top: 0;
    height: 48px;
    line-height: 48px;
    font-size: 14px;
    display: flex;
    align-items: center;
}
.view-num .mu-icon{
  font-size: 20px;
  padding: 0 4px 0 8px;
}
.view-num .item{
  display: flex;
  align-items: center;
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
