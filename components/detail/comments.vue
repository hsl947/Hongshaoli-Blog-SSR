<template>
  <div>
    <ul class="comment-list" v-if="testData.data.length">
      <div class=" mu-sub-header ">评论列表</div>
      <hr class=" mu-divider">
      <li v-for="(item, index) in testData.data" :key="index">
        <img v-if="index%2==0" class="avatar" src="/uploads/anonymous1.jpg" alt="">
        <img v-else class="avatar" src="/uploads/anonymous2.jpg" alt="">
        <div class="comment-infos">
          <p class="user-name">
            {{item.userName}} <span class="from-city" v-if="item.city">--{{item.city}}</span>
          </p>
          <p class="user-content" v-text="item.content"></p>
        </div>
      </li>
    </ul>
    <ul class="comment-list" v-else>
      <div class=" mu-sub-header ">评论列表</div>
      <hr class=" mu-divider">
      <li>暂无评论...快来说说吧！</li>
    </ul>
    <div style="display:block;height: 8px;background: #f5f5f5;"></div>
    <div class="comment-form">
      <mu-form ref="form" :model="formData" class="mu-demo-form">
        <mu-form-item label="" prop="userName" :rules="userNameRules">
          <mu-text-field @keyup.enter="submit" icon="person" v-model="formData.userName" full-width max-length="16" type="text" prop="userName" placeholder="请输入您的大名"></mu-text-field>
         </mu-form-item>
        <mu-form-item label="" prop="content" :rules="contentRules">
          <mu-text-field @keyup.enter="submit" multi-line :rows="4" icon="comment" full-width max-length="100" v-model="formData.content" prop="content" placeholder="说点什么吧"></mu-text-field>
        </mu-form-item>
        <mu-form-item class="form-item">
          <mu-button color="primary" @click="submit">发表</mu-button>
          <mu-button @click="clear">重置</mu-button>
        </mu-form-item>
      </mu-form>
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'comments',
  props: {
    testData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      formData: {},
      userNameRules: [
        { validate: (val) => !!val, message: '名字不能为空'}
      ],
      contentRules: [
        { validate: (val) => !!val, message: '内容不能为空'}
      ]
    }
  },
  components: {},
  created() {},
  mounted() {
    this.getIP();
  },
  methods: {
    getIP() {
      const script = document.createElement("script");
      script.src = "https://pv.sohu.com/cityjson?ie=utf-8";
      document.body.appendChild(script);
      script.onload = ()=> {
        this.formData.ip = returnCitySN.cip;
        this.formData.city = returnCitySN.cname;
      }
    },
    submit () {
      this.$refs.form.validate().then((result) => {
        if(result){
          this.formData._id = this.testData.id;
          this.$axios.post('/list/addComment', this.formData).then(async(data)=> {
            let _data = data.data;
            if(_data.status == 200){
              this.$toast.success(_data.message);
              this.formData = {};
              await this.$store.dispatch('fetchComments', {_id: this.testData.id});
              this.testData = this.$store.state.list.comments;
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
  }
}
</script>
 
<style  lang="scss">
  .comment-list{
    background: #fff;
    margin-top: 30px;
    li{
      display: flex;
      justify-content: flex-start;
      padding: 16px;
      border-bottom: solid 1px #eee;
      .avatar{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 16px;
      }
    }
    .comment-infos{
      .user-name{
        padding: 4px 0;
        font-size: 16px;
        color: #333;
      }
      .user-content{
        font-size: 14px;
        color: #666;
        line-height: 20px;
      }
    }
  }
  .comment-form{
    background: #fff;
    padding: 30px 30px 30px 0;
  }
  .comment-form .form-item, 
  .comment-form .mu-form-item .mu-input, 
  .comment-form .mu-form-item__error .mu-form-item-help{
    padding-left: 56px;
  }
  .from-city{
    font-size: 12px;
    color: #999;
  }
</style>