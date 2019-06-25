<template>
  <div v-cloak>
      <appbar :testData="testData"></appbar>
      <contents :testData="testData"></contents>
  </div>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
      
    }
  },
  head(){
    const {testData} = this;
    return{
      title: testData.title || '',
      meta:[
        {hid:'description', name:'description',content:testData.description},
        {hid:'keywords', name:'keywords',content:testData.description}
      ]
    }
  },
  validate({ params, store }) {
    return params.id
  },
  fetch({ store, params }) {
    return Promise.all([
      store.dispatch('fetchListDetail', {_id: params.id})
    ])
  },
  computed: {
    testData() {
      return this.$store.state.list.details
    }
  },
  components: {
    appbar: resolve => {require(['@/components/detail/appbar'], resolve)},
    contents: resolve => {require(['@/components/detail/contents'], resolve)}
  },
  methods: {
    
  },
  created() {

  },
  mounted() {

  }
};
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
  }
  .ql-container.ql-snow{
    font-size: 16px;
    line-height: 28px;
  }
  .ql-snow .ql-editor pre.ql-syntax{
      font-family: 'Sailec Light', sans-serif;
  }
</style>
