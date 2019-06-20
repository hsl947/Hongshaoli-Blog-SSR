<template>
  <div v-cloak>
      <mu-appbar style="width: 100%;" color="primary">
        <mu-button icon slot="left" onclick="window.history.back()">
          <i class="iconfont icon-fanhui"></i>
        </mu-button>
        <span v-text="testData.title"></span>
      </mu-appbar>
      <p class="time pt70">{{testData.time | formatTime}} - 洪少利</p>
      <div class="ql-container ql-snow" style="border: none;height: auto;">
        <div class="ql-editor" v-html="testData.content"></div>
      </div>
  </div>
</template>

<script>
//import axios from 'axios'
export default {
  name: "detail",
  data() {
    return {
      
    }
  },
  head(){
    return{
      title: this.testData.title,
      meta:[
        {hid:'description', name:'description',content:this.testData.description},
        {hid:'keywords', name:'keywords',content:this.testData.description}
      ]
    }
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
  /*
  async asyncData(e){
    let param = {
      _id: e.params.id
    };

    let {data} = await axios.post('http://localhost:3000/list/detail', param);
    return {testData: data.data};
  },
  */
  components: {

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
