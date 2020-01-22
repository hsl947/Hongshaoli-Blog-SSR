<template>
  <div>
    <mu-paper :z-depth="1">
      <mu-data-table :columns="columns" :data="testData" stripe>
        <template slot-scope="scope">
          <td class="is-center">{{ scope.$index+1 }}</td>
          <td class="is-center">{{ scope.row.title.substr(0, 14) }}</td>
          <td class="is-center">{{ scope.row.description.substr(0, 14) }}</td>
          <td class="is-center">{{ scope.row.time | formatTime }}</td>
          <td class="is-center"><mu-button @click="edit(scope.row._id)" color="success">编辑</mu-button></td>
        </template>
      </mu-data-table>
    </mu-paper>
    <div class="justify-center">
      <mu-pagination :total="total" :page-size="formData.limit" :current.sync="formData.page" @change="toPage" raised></mu-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminList',
  components: {},
  props: {
    role: {
      type: String,
      default: 'guest'
    }
  },
  data () {
    return {
      formData: {
        page: 1,
        limit: 8
      },
      columns: [
        { title: '序号', name: 'id', width: 80, align: 'center' },
        { title: '标题', name: 'title', align: 'center' },
        { title: '描述', name: 'description', align: 'center' },
        { title: '添加时间', name: 'time', width: 200, align: 'center' },
        { title: '操作', name: 'action', align: 'center' }
      ],
      testData: [],
      current: 1,
      total: 0
    }
  },
  created () {},
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.post('/admin/list', this.formData).then((_data) => {
        const data = _data.data
        if (!this.total) { this.total = data.total }
        this.testData = data.data
      })
    },
    toPage (page) {
      this.formData.page = page
      this.testData = []
      this.getData()
    },
    edit (id) {
      if (!this.role || this.role === 'guest') {
        this.$toast.error('访客模式不允许操作！')
        return
      }
      this.$router.push({
        name: 'admin-edit',
        params: { _id: id }
      })
    }
  }
}
</script>

<style>
#toTop {
  user-select: none;
  outline: none;
  -webkit-appearance: none;
  background-color: #2196f3;
  position: fixed;
  right: 16px;
  bottom: -80px;
  z-index: 101;
  min-width: 56px;
  transition: all 0.3s;
}
</style>
