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
      this.$toast.success('退出登录成功！');
      this.$store.commit('delToken');
      document.cookie = 'cur_user' + '=;  expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      this.$router.replace({
        name: 'admin-login'
      });
    }
  }
}
</script>
 
<style>

</style>