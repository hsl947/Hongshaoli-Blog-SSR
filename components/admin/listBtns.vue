<template>
  <div>
        <mu-button @click="add" color="success">添加</mu-button>
        <mu-button @click="exit" color="error" class="fr">退出登录</mu-button>
  </div>
</template>
 
<script>
export default {
  name: 'listBtns',
  props: {
      role: String
  },
  data() {
    return {}
  },
  components: {},
  created() {},
  mounted() {
    
  },
  methods: {
    add() {
      if(!this.role || this.role == 'guest'){
        this.$toast.error('访客模式不允许操作！');
        return;
      }
      this.$router.push({
        path: '/admin/add'
      });
    },
    exit() {
      this.$axios.post('/admin/logout').then(({data})=> {
          if(data.status == 200){
            this.$toast.success(data.message);
            this.$store.commit('delToken');
            this.$router.replace({
              name: 'admin-login'
            });
          }else{
            this.$toast.error(data.message);
          }
      });
      
    }
  }
}
</script>
 
<style>

</style>