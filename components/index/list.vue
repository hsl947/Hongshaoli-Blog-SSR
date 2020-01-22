<template>
  <mu-load-more :loading="loading" @load="load" :loaded-all="finished" class="pt70">
    <mu-paper ref="container" :z-depth="1" class="demo-list-wrap">
      <mu-list v-for="(item, index) in articles" :key="item._id" textline="three-line">
        <mu-sub-header>
          {{ item.time | formatTime }}
          <p class="view-num">
            <span v-if="item.comments.length" class="item">
              <i class=" mu-icon material-icons mu-icon-right" style="user-select: none;">comment</i> {{ item.comments.length }}
            </span>
            <span v-if="item.view" class="item">
              <i class=" mu-icon material-icons mu-icon-right" style="user-select: none;">visibility</i> {{ item.view }}
            </span>
          </p>
        </mu-sub-header>
        <mu-list-item :to="'/blog/'+item._id" button>
          <mu-list-item-content>
            <mu-list-item-title v-text="item.title"></mu-list-item-title>
            <mu-list-item-sub-title v-text="item.description"></mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
      </mu-list>
      <p v-if="finished" class="no-data">- 我也是有底线的 -</p>
    </mu-paper>
  </mu-load-more>
</template>

<script>
export default {
  name: 'List',
  components: {},
  props: {
    finished: Boolean,
    loading: Boolean,
    articles: Array
  },
  data () {
    return {

    }
  },
  created () {},
  methods: {
    load () {
      this.$store.dispatch('fetchList', this.nextPageParams())
    },
    toDetail (item, index) {
      this.$router.push(`/blog/${item._id}`)
    },
    nextPageParams () {
      return {
        page: this.$store.state.list.page + 1
      }
    }
  }
}
</script>

<style>
</style>
