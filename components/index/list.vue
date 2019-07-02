<template>
  <mu-load-more class="pt70" :loading="loading" @load="load" :loaded-all="finished">
    <mu-paper :z-depth="1" class="demo-list-wrap" ref="container">
      <mu-list textline="three-line" v-for="(item, index) in articles" :key="item._id">
        <mu-sub-header>
          {{item.time | formatTime}}
          <span class="view-num" v-if="item.view">
            <i class=" mu-icon material-icons mu-icon-right" style="user-select: none;">visibility</i> {{item.view}}
          </span>  
        </mu-sub-header>
        <mu-list-item button @click="toDetail(item, index)">
          <mu-list-item-content>
            <mu-list-item-title v-text="item.title"></mu-list-item-title>
            <mu-list-item-sub-title v-text="item.description"></mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
      </mu-list>
      <p class="no-data" v-if="finished">- 我也是有底线的 -</p>
    </mu-paper>
  </mu-load-more>
</template>
 
<script>
export default {
  name: 'list',
  props: {
      finished: Boolean,
      loading: Boolean,
      articles: Array
  },
  data() {
    return {
      
    }
  },
  components: {},
  created() {},
  methods: {
    load() {
      this.$store.dispatch('fetchList', this.nextPageParams())
    },
    toDetail(item, index) {
      this.$router.push(`/blog/${item._id}`)
    },
    nextPageParams() {
      return {
        page: this.$store.state.list.page + 1
      }
    }
  }
}
</script>
 
<style>
</style>