<template>
  <div class="container">
    <Appbar :title="title"/>
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
      <mu-form-item style="white-space: nowrap;">
        <mu-button @click="submit" color="primary">提交</mu-button>
        <mu-button @click="clear">重置</mu-button>
        <mu-button v-if="formData._id" @click="del" color="error">删除</mu-button>
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
  name: 'BlogEdit',
  components: {
    quillEditor,
    Appbar: () => import('@/components/common/Appbar')
  },
  head: {
    title: '洪少利的博客-添加/编辑'
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
      title: '添加',
      subUrl: '/admin/add',
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
  beforeDestroy () {
    localStorage.setItem('edit_id', null)
  },
  mounted () {
    const { _id } = this.$route.params
    const storeId = localStorage.getItem('edit_id')
    if (_id || storeId) {
      // 编辑状态
      this.formData._id = _id || storeId
      this.subUrl = '/admin/edit'
      localStorage.setItem('edit_id', this.formData._id)
      this.$axios.post('/list/detail', { _id: this.formData._id }).then(({ data }) => {
        Object.assign(this.formData, { ...data.data })
        this.title = `编辑 - ${data.data.title}`
      })
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate().then((result) => {
        if (result) {
          this.$axios.post(this.subUrl, this.formData).then(({ data }) => {
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
    },
    del () {
      this.$confirm('确定要删除？', '警告', {
        type: 'warning'
      }).then(({ result }) => {
        if (result) {
          this.$axios.post('/admin/delete', this.formData).then(({ data }) => {
            if (data.status === 200) {
              this.$toast.success(data.message)
              this.$router.replace({
                path: '/admin'
              })
            } else {
              this.$toast.error(data.message)
            }
          })
        } else {}
      })
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
</style>
