<template>
  <div class="container">
      <mu-appbar style="width: 100%;" color="primary">
        <mu-button icon slot="left" onclick="window.history.back()">
          <i class="iconfont icon-fanhui"></i>
        </mu-button>
        <span>登录</span>
      </mu-appbar>
      <mu-form ref="form" :model="formData" class="mu-demo-form pt70">
        <mu-form-item label="用户名" help-text="" prop="userName" :rules="userNameRules">
          <mu-text-field v-model="formData.userName" prop="userName" placeholder="请输入用户名"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" prop="password" :rules="passwordRules">
            <mu-text-field type="password" v-model="formData.password" prop="password" placeholder="请输入密码"></mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" @click="submit">提交</mu-button>
          <mu-button @click="clear">重置</mu-button>
        </mu-form-item>
      </mu-form>
      <p class="login-tips">用户名：admin &nbsp;&nbsp;&nbsp; 密码：12345</p>
  </div>
</template>

<script>
export default {
  name: "blog_login",
  components: {

  },
  data() {
    return {
      redirectUrl: '',
      formData: {},
      userNameRules: [
        { validate: (val) => !!val, message: '用户名不能为空'}
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '密码不能为空'}
      ]
    }
  },
  filters: {

  },
  methods: {
     submit () {
      this.$refs.form.validate().then((result) => {
        if(result){
          this.$axios.post('/admin/login', this.formData).then((_data)=> {
            if(_data.status == 200){
              this.$toast.success(_data.message);
              this.$store.commit('setToken', _data.data.token);
                if(this.redirectUrl){//登录前的路由
                    this.$router.replace({
                        path: this.redirectUrl
                    });
                }else{
                    this.$router.replace({
                        name: 'admin_index'
                    });
                }
            }else{
                this.$toast.error(_data.message);
            }
          });
        }
      });
    },
    clear () {
      this.$refs.form.clear();
      this.formData = {};
    }
  },
  created() {
  },
  mounted() {
    //登录前的路由地址
    if(this.$route.query.redirect){
        this.redirectUrl = this.$route.query.redirect;
    }
  }
};
</script>

<style>
  .login-tips{
    font-size: 16px;
    color: #666;
  }
</style>
