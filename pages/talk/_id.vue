<template>
  <section class="talk-box">
    <div v-if="loadingFlag" class="preloader">
      <span class="icon">
      <i class="fas fa-3x fa-spinner fa-pulse has-text-grey-light"></i>
      </span>
    </div>
    <talk v-if="isShow" :item="talkData"/>
  </section>
</template>

<script lang="ts">
    import {Vue, Component} from 'nuxt-property-decorator'
    import Talk from "~/components/Talk.vue";
    import {appStore} from '~/store'
    import {ITalk} from "~/models/Talk";


    @Component({
        components: {
            Talk
        },
    })
    export default class extends Vue {

        talkData: ITalk
        isShow: boolean = false

        async asyncData({route}) {
            const talkId = route.params.id
            const data = await appStore.getTalk(talkId)
            return {talkData: data}
        }

        head() {
            return {
                title: this.talkData.theme,
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: this.talkData.comments[0].content
                    },
                    {
                        hid: 'og:type',
                        property: 'og:type',
                        content: 'website'
                    },
                    {
                        hid: 'twitter:card',
                        name: 'twitter:card',
                        content: 'summary_large_image'
                    },
                    {
                        hid: 'og:title',
                        property: 'og:title',
                        content: this.talkData.theme
                    },
                    {
                        hid: 'og:url',
                        property: 'og:url',
                        content: 'http://yahoo.co.jp'
                    },
                    {
                        hid: 'og:image',
                        property: 'og:image',
                        content: this.talkData.ogp_img
                    },


                ]
            }
        }


        mounted() {
            this.isShow = true
            // const talkId = this.$route.params.id
            // this.talkData = await appStore.getTalk(talkId)
        }

        get loadingFlag()
            :
            boolean {
            return appStore.loading
        }

        get headData() {
            return {
                title: this.talkData ? this.talkData.theme : 'YONDE',
                meta: [
                    {hid: 'og:title', name: 'og:title', content: this.talkData ? this.talkData.theme : 'YONDE'},
                    {
                        hid: 'description',
                        name: 'description',
                        content: this.talkData ? this.talkData.comments[0].content : ''
                    },
                    {hid: 'og:image', name: 'og:image', content: this.talkData ? this.talkData.ogp_img : ''},
                    {hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image'},

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