<template>
  <div class="pt70">
    <Appbar :title="testData.title" :backFn="toList"/>
    <Content :testData="testData" />
    <Comments :testData="comments" />
  </div>
</template>

<script>
export default {
  name: 'BlogDetail',
  components: {
    Appbar: () => import('@/components/common/Appbar'),
    Content: () => import('@/components/detail/Content'),
    Comments: () => import('@/components/detail/Comments')
  },
  data () {
    return {

    }
  },
  head () {
    const { testData } = this
    return {
      title: testData.title || '',
      meta: [
        { hid: 'description', name: 'description', content: testData.description },
        { hid: 'keywords', name: 'keywords', content: testData.description }
      ]
    }
  },
  validate ({ params, store }) {
    return params.id
  },
  computed: {
    testData () {
      return this.$store.state.list.details
    },
    comments () {
      return this.$store.state.list.comments
    }
  },
  fetch ({ store, params }) {
    const paramsId = { _id: params.id }
    return Promise.all([
      store.dispatch('fetchListDetail', paramsId),
      store.dispatch('updateListNum', paramsId),
      store.dispatch('fetchComments', paramsId)
    ])
  },
  created () {

  },
  mounted () {

  },
  methods: {
    toList () {
      // 为了保持后退滚动条位置
      const hasBackUrl = localStorage.getItem('hasBackUrl')
      if (hasBackUrl === 'yes') {
        window.history.back()
      } else {
        this.$router.push(`/`)
      }
    }
  }
}
</script>

<style>
  .mu-appbar{
    top: 0;
  }
  .time{
    font-size: 16px;
    color: #999;
    line-height: 30px;
    padding: 10px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
  }
</style>
