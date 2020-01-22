<template>
  <div class="ql-container ql-snow" style="border: none;height: auto;">
    <div v-html="testData.content" class="ql-editor"></div>
  </div>
</template>

<script>
export default {
  name: 'Appbar',
  components: {},
  props: {
    testData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style>
</style>
