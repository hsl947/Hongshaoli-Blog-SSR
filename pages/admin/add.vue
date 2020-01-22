<template>
  <div class="container">
    <Appbar title="添加"/>
    <mu-form ref="form" :model="formData" class="mu-demo-form pt70">
      <mu-form-item :rules="titleRules" label="标题" help-text="" prop="title">
        <mu-text-field v-model="formData.title" prop="title" placeholder="请输入标题"></mu-text-field>
      </mu-form-item>
      <mu-form-item :rules="descriptionRules" label="描述" prop="description">
        <mu-text-field v-model="formData.description" prop="description" placeholder="请输入文章描述"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="内容" prop="content">
        <quill-editor
          ref="myQuillEditor"
          v-model="formData.content"
          :options="editorOption"
          @change="onEditorChange($event)">
        </quill-editor>
      </mu-form-item>
      <mu-form-item>
        <mu-button @click="submit" color="primary">提交</mu-button>
        <mu-button @click="clear">重置</mu-button>
      </mu-form-item>
    </mu-form>
  </div>
</template>

<script>
/* eslint-disable no-var */
if (process.client) {
  require('@@/assets/js/highlight/highlight.pack')
  var { quillEditor, Quill } = require('vue-quill-editor')
  var { container, ImageExtend, QuillWatch } = require('quill-image-extend-module')
  Quill.register('modules/ImageExtend', ImageExtend)
}

export default {
  name: 'BlogAdd',
  components: {
    quillEditor,
    Appbar: () => import('@/components/common/Appbar')
  },
  head: {
    title: '洪少利的博客-add'
  },
  filters: {

  },
  data () {
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
              return res.url
            }
          },
          toolbar: {
            container,
            handlers: {
              'image' () {
                QuillWatch.emit(this.quill.id)
              }
            }
          }
        }
      },
      formData: {},
      titleRules: [
        { validate: val => !!val, message: '标题不能为空' }
      ],
      descriptionRules: [
        { validate: val => !!val, message: '描述不能为空' }
      ],
      contentRules: [
        { validate: val => !!val, message: '内容不能为空' }
      ]
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    submit () {
      this.$refs.form.validate().then((result) => {
        if (result) {
          this.formData.time = new Date()
          this.$axios.post('/admin/add', this.formData).then(({ data }) => {
            if (data.status === 200) {
              this.$toast.success(data.message)
              this.$router.replace({
                path: '/admin'
              })
            } else {
              this.$toast.error(data.message)
            }
          })
        }
      })
    },
    clear () {
      this.$refs.form.clear()
      this.formData = {}
    },
    onEditorChange ({ quill, html, text }) {
      // console.log(text)
      // console.log('editor change!', html)
      this.formData.content = html
    }
  }
}
</script>

<style>
  .ql-container{
    height: 480px;
  }
  .ql-container.ql-snow{
    border: 1px solid #ccc;
  }
  .ql-snow .ql-editor pre.ql-syntax{
      font-family: 'Sailec Light', sans-serif;
  }
</style>
