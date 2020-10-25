<template>
  <section class="talk-box">
    <div v-if="loadingFlag" class="preloader">
      <span class="icon">
      <i class="fas fa-3x fa-spinner fa-pulse has-text-grey-light"></i>
      </span>
    </div>
    <div v-if="isShow">
      <talk :item="talkData"/>
      <div class="message-content">
        <h2 class="title is-5">
          <span class="icon is-small">
           <i class="fas fa-comment-alt"></i>
          </span>メッセージ
        </h2>
        <message />
        <div class="message-content-input-box">
            <input class="input" type="text" v-model="messageItem">
          <button @click="addMessage" :disabled="messageItem === '' || this.isLoading" class="button is-rounded is-outlined is-primary">
            <span>
              <i v-if="!isLoading" class="fas fa-comment-alt"></i>
              <i v-else="isLoading" class="fas fa-spinner fa-pulse"></i>
              追加</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
    import {Vue, Component} from 'nuxt-property-decorator'
    import Talk from "~/components/Talk.vue";
    import {appStore} from '~/store'
    import {ITalk} from "~/models/Talk";
    import Message from "~/components/Message.vue";

    @Component({
        components: {
            Message,
            Talk
        },
    })
    export default class extends Vue {

        talkData: ITalk
        isShow: boolean = false
        messageItem:string = ''
        isLoading:boolean = false

        async asyncData({route}: { route: any }) {
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
                        hid: 'og:description',
                        property: 'og:description',
                        content: this.talkData.comments[0].content
                    },
                    {
                        hid: 'og:url',
                        property: 'og:url',
                        content: 'https://osyaberry-client.herokuapp.com/'
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
        }

        async addMessage() {
           this.isLoading = true
           await appStore.addMessage({
                talk_id:this.$route.params.id,
                message:this.messageItem,
                avatar_id:this.avatarId
            })

            this.messageItem = ''
            this.isLoading = false
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

        get avatarId() {
            return  Math.floor(Math.random() * 4 + 1)
        }

    }
</script>

<style scoped lang="scss">
  .message-content {
    padding: $size-m;

    .icon{
      margin-right: $size-xs;
      color: $primary;
    }

    .message-content-input-box{
      display: flex;
      align-items: center;
      .button{
        margin-left: $size-xs;
      }

    }
  }

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
