<template>
  <div></div>
</template>

<script>
//import Logo from '~/components/Logo.vue'

export default {
  head: {
    title: '首页-洪少利的博客'
  },
  data() {
    return {
      
    }
  },
  components: {
    //Logo
  },
  methods: {
    
  },
  created() {
    this.$router.replace({
      path: '/blog'
    });
  },
  mounted() {
    
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
