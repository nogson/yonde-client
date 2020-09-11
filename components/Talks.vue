<template>
  <div>
    <div v-if="loadingFlag" class="preloader">
      <span class="icon">
      <i class="fas fa-3x fa-spinner fa-pulse has-text-grey-light"></i>
      </span>
    </div>
    <div v-else class="talk-item" v-for="item in talks" :key="item.id">
      <talk :item="item"/>
    </div>
  </div>
</template>

<script lang="ts">
    import {Vue, Component} from 'nuxt-property-decorator'
    import {appStore} from '~/store'
    import {ITalk} from '~/models/Talk'

    @Component({
        components: {
            Talk: () => import('~/components/Talk.vue')
        },
    })
    export default class extends Vue {

        created() {
            this.getTalks()
        }

        getTalks() {
            appStore.getTalks()
        }

        createdTalk() {
            this.getTalks()
        }

        get talks() {
            return appStore.talks
        }

        get loadingFlag() {
            return appStore.loading
        }
    }
</script>

<style scoped lang="scss">
  .talk-item {
    &:not(:last-child) {
      margin-bottom: $size-l;
    }
  }
  .preloader {
    text-align: center;
    padding: $size-xl 0;
  }
</style>