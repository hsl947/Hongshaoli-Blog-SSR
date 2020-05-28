<template>
  <div v-if="!isMobile" class="globe fixed-side">
    <div class="bird">
      <div class="body">
        <div class="eye left"></div>
        <div class="eye right"></div>
        <div class="beak"><div></div></div>
        <div class="feet"></div>
        <div class="wire"></div>
      </div>
      <div class="hills"></div>
      <div class="cloud"></div>
      <div class="cloud small"></div>
    </div>
  </div>
</template>

<script>
/**
 * 眨眼的小鸟
 */
import { isMobile } from '~/assets/js/common'
export default {
  name: 'DozingBird',
  components: {},
  props: {},
  data () {
    return {
      isMobile: isMobile()
    }
  },
  created () {},
  methods: {}
}
</script>

<style>
  @import '@@/assets/css/dozing-bird.css';
</style>
