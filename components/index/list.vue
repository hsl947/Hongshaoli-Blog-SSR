<template>
  <mu-load-more class="pt70" :loading="loading" @load="load" :loaded-all="finished">
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
    toDetail(_id) {
      this.$router.push(`/blog/${_id}`)
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