<template>
  <div class="pt70">
    <Appbar title="我的项目/作品"/>
    <mu-list textline="three-line">
      <mu-sub-header>今天</mu-sub-header>
      <mu-list-item :ripple="false" avatar button>
        <mu-list-item-action>
          <mu-avatar>
            <!-- <img src="../../assets/images/avatar1.jpg"> -->
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>这个周末一起吃饭么?</mu-list-item-title>
          <mu-list-item-sub-title>
            周末要来你这里出差，要不要一起吃个饭呀，实在编不下去了,哈哈哈哈哈哈
          </mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item :ripple="false" avatar button>
        <mu-list-item-action>
          <mu-avatar>
            <!-- <img src="../../assets/images/avatar2.jpg"> -->
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>Alex Qin</mu-list-item-title>
          <mu-list-item-sub-title>
            我们去看电影，最近有部烂片上映，又有吐槽的了
          </mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item :ripple="false" avatar button>
        <mu-list-item-action>
          <mu-avatar>
            <!-- <img src="../../assets/images/avatar3.jpg"> -->
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>LOL</mu-list-item-title>
          <mu-list-item-sub-title>
            周末一起 LOL
          </mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item :ripple="false" avatar button>
        <mu-list-item-action>
          <mu-avatar>
            <!-- <img src="../../assets/images/uicon.jpg"> -->
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>LOL</mu-list-item-title>
          <mu-list-item-sub-title>
            实在编不下去，这就是个demo
          </mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
export default {
  head: {
    title: '首页-我的项目/作品'
  },
  components: {
    Appbar: () => import('@/components/common/Appbar')
  },
  data () {
    return {}
  },
  computed: {},
  mounted () {},
  methods: {}
}
</script>

<style>

</style>
