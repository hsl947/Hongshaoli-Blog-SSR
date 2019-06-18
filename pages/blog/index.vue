<template>
  <div>
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="open = !open">
        <i class="iconfont icon-caidan"></i>
      </mu-button>
      <span>Shaoli's Blog</span>
    </mu-appbar>
    <mu-load-more class="pt70" :loading="$store.state.list.loading" @load="load" :loaded-all="$store.state.list.finished">
      <mu-paper :z-depth="1" class="demo-list-wrap" ref="container">
        <mu-list textline="three-line" v-for="item in articles" :key="item._id">
          <mu-sub-header>{{item.time | formatTime}}</mu-sub-header>
          <mu-list-item button @click="toDetail(item._id)">
            <mu-list-item-content>
              <mu-list-item-title v-text="item.title"></mu-list-item-title>
              <mu-list-item-sub-title v-text="item.description"></mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
        <p class="no-data" v-if="$store.state.list.finished">- 我也是有底线的 -</p>
      </mu-paper>
    </mu-load-more>
    <mu-drawer :open.sync="open" :docked="false" :left="true">
      <mu-list>
        <mu-list-item button @click="open=false">
          <mu-list-item-title>首页</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :to="'/admin'">
          <mu-list-item-title>Admin后台首页</mu-list-item-title>
        </mu-list-item>
        <!-- <mu-list-item button :to="'/chat_login'">
          <mu-list-item-title>测试聊天</mu-list-item-title>
        </mu-list-item> -->
        <mu-list-item button target="_blank" href="https://www.hongshaoli.cn/">
          <mu-list-item-title>关于我</mu-list-item-title>
        </mu-list-item>
        <mu-list-item  @click="open = false" button>
          <mu-list-item-title>Close</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
    <mu-button id="toTop" button class="mu-button mu-fab-button mu-inverse">
      <div class="mu-button-wrapper">
        <div class="mu-ripple-wrapper"></div>
        <i class="iconfont icon-jiantou"></i>
      </div>
    </mu-button>
  </div>
</template>

<script>
//import Logo from '~/components/Logo.vue'

export default {
  head: {
    title: '首页-洪少利的博客'
  },
  data() {
    return {
      open: false,
      testData: []
    }
  },
  components: {
    //Logo
  },
  async fetch({ store }) {
      await store.dispatch('fetchList')
  },
  computed: {
    articles() {
      return this.$store.state.list.data
    }
  },
  methods: {
    nextPageParams() {
      return {
        page: this.$store.state.list.page + 1
      }
    },
    load () {
      this.$store.dispatch('fetchList', this.nextPageParams());
    },
    toDetail(_id) {
      this.$router.push(`/blog/${_id}`);
    },
    initTimer() {
      var timer1, timer2; 
      var toTop = document.getElementById("toTop");
      window.onscroll = () => { 
        if (timer1) clearTimeout(timer1);
        timer1 = setTimeout(() =>{
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop > 300) { 
              toTop.style.bottom = "16px"; 
            }else { 
              toTop.style.bottom = "-80px"; 
            } 
        }, 300);
      }
      toTop.onclick = () => { 
        if (timer2) clearTimeout(timer2);
        timer2 = setTimeout(() =>{
            window.scrollTo(0, 0);
            clearInterval(timer1);
        }, 50);
      }
    }
  },
  mounted() {
    this.initTimer();
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
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
#toTop{
  user-select: none; 
  outline: none; 
  -webkit-appearance: none; 
  background-color: #2196f3; 
  position: fixed; 
  right: 16px; 
  bottom: -80px; 
  z-index: 101;
  min-width:56px;
  transition: all .3s;
}
.icon-caidan, .icon-jiantou{
  font-size: 26px;
}
</style>
