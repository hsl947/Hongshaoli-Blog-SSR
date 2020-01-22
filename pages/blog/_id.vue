<template>
  <div v-cloak>
    <Appbar :testData="testData" />
    <Content :testData="testData" />
    <Comments :testData="comments" />
  </div>
</template>

<script>
export default {
  name: 'Detail',
  components: {
    Appbar: () => import('@/components/detail/Appbar'),
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
    return Promise.all([
      store.dispatch('fetchListDetail', { _id: params.id }),
      store.dispatch('updateListNum', { _id: params.id }),
      store.dispatch('fetchComments', { _id: params.id })
    ])
  },
  created () {

  },
  mounted () {

  },
  methods: {

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
  .ql-container.ql-snow{
    font-size: 16px;
    line-height: 28px;
  }
  .ql-snow .ql-editor pre.ql-syntax{
      font-family: 'Sailec Light', sans-serif;
  }
</style>
