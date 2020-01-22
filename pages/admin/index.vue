<template>
  <div>
    <ListBtns :role="role" />
    <List :role="role" />
  </div>
</template>

<script>
export default {
  name: 'AdminIndex',
  head: {
    title: '洪少利的博客-admin'
  },
  components: {
    List: () => import('@/components/admin/List'),
    ListBtns: () => import('@/components/admin/ListBtns')
  },
  filters: {

  },
  data () {
    return {
      role: ''
    }
  },
  created () {
  },
  mounted () {
    this.$store.commit('getToken')
    this.role = this.$store.state.admin_token
  },
  methods: {

  }
}
</script>

<style>
  .mu-table th, .mu-table td{
    vertical-align: middle;
  }
  .mu-table th{
    background: #2196f3;
    color: #fff;
  }
  .mu-pagination{
    padding: 10px;
    position: fixed;
    bottom: 0;
  }
  .container{
    padding-bottom: 50px;
  }
  .mu-button{
    margin: 10px 0;
  }
  .mu-pagination-item.mu-button{
    overflow: hidden!important;
    -webkit-tap-highlight-color: transparent!important;
  }
  .justify-center{
    display: flex;
    justify-content: center;
  }
  .fr{
    float: right;
  }
  .fr::after{
    content: '';
    display: block;
    clear: both;
  }
</style>
