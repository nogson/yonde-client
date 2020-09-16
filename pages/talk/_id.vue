<template>
  <section class="talk-box">
    <div v-if="loadingFlag" class="preloader">
      <span class="icon">
      <i class="fas fa-3x fa-spinner fa-pulse has-text-grey-light"></i>
      </span>
    </div>
    <talk v-if="talkData" :item="talkData"/>
  </section>
</template>

<script lang="ts">
    import {Vue, Component} from 'nuxt-property-decorator'
    import Talk from "~/components/Talk.vue";
    import {appStore} from '~/store'
    import {ITalk} from "~/models/Talk";


    @Component({
        components: {
            Talk: () => import('~/components/Talk.vue')
        },
    })
    export default class extends Vue {

        head() {
            return this.headData
        }

        talkData: ITalk | null = null

        async created() {
            const talkId = this.$route.params.id
            this.talkData = await appStore.getTalk(talkId)
        }

        get loadingFlag(): boolean {
            return appStore.loading
        }

        get headData() {
            return {
                title: this.talkData ? this.talkData.theme : 'YONDE',
                meta: [
                    { hid: 'og:title', name: 'og:title', content: this.talkData ? this.talkData.theme : 'YONDE' },
                    { hid: 'description', name: 'description', content: this.talkData ? this.talkData.comments[0].content : '' },
                    { hid: 'og:image', name: 'og:image', content: this.talkData ? this.talkData.ogp_img : '' }
                ]
            }
        }

    }
</script>

<style scoped lang="scss">
  .talk-box {
    position: relative;
    padding: $size-l;
  }

  .preloader {
    text-align: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>