<template>
  <div class="ql-container ql-snow" style="border: none;height: auto;">
    <div class="ql-editor" v-html="testData.content"></div>
  </div>
</template>
 
<script>
export default {
  name: 'appbar',
  props: {
    testData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {}
  },
  components: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
 
<style>
</style>