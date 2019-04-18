<template>
  <div>
      
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "admin_index",
  components: {
    
  },
  data() {
    return {
      // role: this.$store.state.admin_token,
      formData: {
        page: 1,
        limit: 8
      },
      columns: [
          { title: '序号', name: 'id', width: 80, align: 'center' },
          { title: '标题', name: 'title', align: 'center'},
          { title: '描述', name: 'description', align: 'center'},
          { title: '添加时间', name: 'time', width: 200, align: 'center'},
          { title: '操作', name: 'action', align: 'center'}
      ],
      testData: [],
      current: 1,
      total: 0
    }
  },
  filters: {
   
  },
  methods: {
    
  },
  created() {
  },
  mounted() {
    this.$router.replace({
        path: `/admin/1`
      });
  }
};
</script>

<style>
  
</style>
