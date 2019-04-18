<template>
  <span>
    <slot v-if="initSuccess"></slot>
  </span>
</template>
 
<script>
/**
 * 懒加载组件
 * 用法：
        <pl-lazy time="200">
        这里放的是延迟加载的组件/dom内容
        </pl-lazy>
 */
    
  export default {
    name: "pl-lazy",
    props: {
      time: {
        required: false,
        default: 0
      }
    },
    data() {
      return {
        initSuccess: false
      }
    },
    created() {
      this.initSlot();
    },
 
    methods: {
      initSlot() {
        let vm = this;
        setTimeout(function () {
          vm.initSuccess = true;
        }, (Number(vm.time || 0)));
      }
    }
  }
</script>
 
<style scoped>
 
</style>