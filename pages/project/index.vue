<template>
  <div class="project-container pt70">
    <Appbar title="我的项目/作品"/>
    <div class="project-list">
      <mu-sub-header>我的项目</mu-sub-header>
      <mu-card
        v-for="item in projecttData"
        :key="item.title"
        @click="openUrl(item.url)"
        class="item"
        title="点击查看">
        <mu-card-media :title="item.title">
          <img :src="item.img" class="project-img">
        </mu-card-media>
        <mu-card-text>{{ item.content }} </mu-card-text>
      </mu-card>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: '首页-我的项目/作品'
  },
  components: {
    Appbar: () => import('@/components/common/Appbar')
  },
  data () {
    return {}
  },
  computed: {
    projecttData () {
      return this.$store.state.projects
    }
  },
  fetch ({ store, params }) {
    return Promise.all([
      store.dispatch('fetchProjects')
    ])
  },
  mounted () {},
  methods: {
    openUrl (url) {
      window.open(url, '_blank')
    }
  }
}
</script>

<style lang="less">
  .project-container {
    .project-list{
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .item{
        width: 40%;
        flex-shrink: 0;
        margin: 0 5% 20px;
        font-size: 20px;
        transition: all .3s;
        &:hover{
          box-shadow: 0 2px 6px -1px rgba(0,0,0,.2), 0 1px 6px 0 rgba(0,0,0,.14), 0 1px 9px 0 rgba(0,0,0,.12);
        }
        .project-img{
          height: 288px;
          object-fit: cover;
        }
      }
      @media screen and (max-width: 750px) {
        .item{
          width: 90%;
        }
      }
    }
    .mu-card-media{
      min-height: 170px;
    }
    .mu-sub-header {
      padding-left: 5%;
    }
    .mu-card-text{
      line-height: 18px;
    }
    .mu-card-media-title{
      padding: 6px 12px;
      text-align: center;
      .mu-card-title{
        font-size: 20px;
      }
    }
  }
</style>
