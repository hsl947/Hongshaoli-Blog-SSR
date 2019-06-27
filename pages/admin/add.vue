<template>
  <div class="container">
      <mu-appbar style="width: 100%;" color="primary">
        <mu-button icon slot="left" onclick="window.history.back()">
          <i class="iconfont icon-fanhui"></i>
        </mu-button>
        <span>添加</span>
      </mu-appbar>
      <mu-form ref="form" :model="formData" class="mu-demo-form pt70">
        <mu-form-item label="标题" help-text="" prop="title" :rules="titleRules">
          <mu-text-field v-model="formData.title" prop="title" placeholder="请输入标题"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="描述" prop="description" :rules="descriptionRules">
            <mu-text-field v-model="formData.description" prop="description" placeholder="请输入文章描述"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="内容" prop="content">
          <quill-editor v-model="formData.content"
              ref="myQuillEditor"
              :options="editorOption"
              @change="onEditorChange($event)">
          </quill-editor>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" @click="submit">提交</mu-button>
          <mu-button @click="clear">重置</mu-button>
        </mu-form-item>
      </mu-form>
  </div>
</template>

<script>
if (process.client) {
  require('@@/static/js/highlight/highlight.pack');
  var { quillEditor, Quill } =  require('vue-quill-editor');
  var {container, ImageExtend, QuillWatch} =  require('quill-image-extend-module')
  Quill.register('modules/ImageExtend', ImageExtend)
}

export default {
  name: "blog_add",
  components: {
    quillEditor
  },
  head: {
    title: '洪少利的博客-add'
  },
  data() {
    return {
      editorOption: {
        placeholder: '请输入内容',
        modules: {
          syntax: true,
          ImageExtend: {
            loading: true,
            name: 'img',
            action: '/file/upload',
            response: (res) => {
              return res.url;
            }
          },
          toolbar: {
            container: container,
            handlers: {
              'image': function () {
                QuillWatch.emit(this.quill.id)
              }
            }
          }
        }
      },
      formData: {},
      titleRules: [
        { validate: (val) => !!val, message: '标题不能为空'}
      ],
      descriptionRules: [
        { validate: (val) => !!val, message: '描述不能为空'}
      ],
      contentRules: [
        { validate: (val) => !!val, message: '内容不能为空'}
      ]
    }
  },
  filters: {

  },
  methods: {
     submit () {
      this.$refs.form.validate().then((result) => {
        if(result){
          this.formData.time = new Date();
          this.$axios.post('/admin/add', this.formData).then((_data)=> {
            if(_data.status == 200){
              this.$toast.success(_data.message);
              this.$router.replace({
                path: '/admin'
              });
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
    },
    onEditorChange({ quill, html, text }) {
      // console.log(text)
      // console.log('editor change!', html)
      this.formData.content = html;
    }
  },
  created() {

  },
  mounted() {

  }
};
</script>

<style>
  .ql-container{
    height: 300px;
  }
  .ql-container.ql-snow{
    border: 1px solid #ccc;
  }
  .ql-snow .ql-editor pre.ql-syntax{
      font-family: 'Sailec Light', sans-serif;
  }
</style>
