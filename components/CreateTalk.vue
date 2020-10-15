<template>
  <div class="crate-talk-box">
    <div class="crate-talk-box-ttl">
      <h2 class="talk-title title is-5">おしゃべりを投稿</h2>
      <span @click="$emit('close')" class="icon is-small">
        <i class="fas fa-times"></i>
      </span>
    </div>

    <div v-if="crateTalkBoxBtnWrapElm" ref="overflowBox" class="crate-talk-box-overflow" :style="overflowBoxStyle">
      <div class="field mb-s">
        <label class="label font-s">テーマ</label>
        <div class="control">
          <input class="input" type="text" v-model="theme">
        </div>
      </div>
      <div class="field mb-s">
        <label class="label font-s">タグ</label>
        <div class="control">
          <input class="input" type="text" v-model="tags">
        </div>
        <comment v-for="(item,index) in comments" :kye="index" :item.sync="item" :index="index"
                 @remove="removeComment"/>
      </div>
    </div>
    <div ref="crateTalkBoxBtnWrap">
      <div class="comment-btns">
        <button @click="speak" class="button is-rounded is-outlined">
          <span class="icon is-small"><i class="fas fa-play"></i></span>
          <span>すべて再生</span>
        </button>
        <button @click="addComment" class="button is-rounded is-outlined is-primary">
          <span class="icon is-small"><i class="fas fa-plus"></i></span>
          <span>追加</span>
        </button>
      </div>
      <div class="talk-btns">
        <button :disabled="isLoading || disabledBtn" @click="createTalk" class="button is-rounded is-primary">
              <span class="icon is-small">
                <i v-if="!isLoading" class="fas fa-check"></i>
                <i v-else="isLoading" class="fas fa-spinner fa-pulse"></i>
              </span>
          <span>登録</span>
        </button>
      </div>
    </div>
    <div class="ogp" ref="ogp">
      <ogp :theme="theme" :comments="comments"/>
    </div>
  </div>
</template>

<script lang="ts">
    import {Vue, Component, Emit} from 'nuxt-property-decorator'
    import Speaker from '~/assets/js/Speaker.ts'
    import {IComment} from '@/models/Comment.ts'
    import {appStore} from '~/store'
    import h2c from 'html2canvas'
    import Comment from "~/components/Comment.vue"
    import Ogp from '~/components/Ogp.vue'
    import {ITalk} from "~/models/Talk"

    @Component({
        components: {
            Comment,
            Ogp
        },
    })
    export default class CreateTalk extends Vue {

        theme: string = ''
        tags: string = ''
        comments: IComment[] = []
        isLoading: boolean = false
        speaker: any
        ogpItem: ITalk | null = null
        crateTalkBoxBtnWrapElm: any = null
        overflowBox: any = null

        item: ITalk;

        mounted() {
            this.speaker = new Speaker()
            this.addComment()
            this.crateTalkBoxBtnWrapElm = this.$refs.crateTalkBoxBtnWrap
            this.$nextTick(() => {
                this.overflowBox = this.$refs.overflowBox
            })
        }


        @Emit('close')
        async createTalk() {
            this.isLoading = true

            const ogpImg = await this.createOgp()
            const res = await this.$axios.$post('api/talk', {
                theme: this.theme,
                tags: this.tags !== '' ? this.tags.split(',') : [],
                ogp_img: ogpImg,
                comments: this.comments.filter(d => d.content !== '')
            })

            await appStore.getTalks()
            await appStore.getTags()

            this.isLoading = false
            this.comments = []
            this.theme = ''
            this.tags = ''
            this.addComment() // リセット用

            window.scrollTo(0,0)
        }

        createOgp() {

            return new Promise((resolve) => {
                const ogp = this.$refs.ogp as HTMLImageElement
                h2c(ogp, {
                    scrollX: 0,
                    scrollY: -window.scrollY
                }).then((canvas: HTMLCanvasElement) => {
                    canvas.toBlob((blob) => {
                        const reader = new FileReader()
                        const blobData: any = blob
                        reader.readAsDataURL(blobData)
                        reader.onload = () => {
                            const result: any = reader.result
                            resolve(result)
                        }
                    })
                })
            })


        }

        speak() {
            this.speaker.speakAll(this.comments)
        }

        addComment() {
            const comment = {
                content: '',
                voice_type: 0,
                rate: 1,
                avatar: 1
            }
            this.comments.push(comment)

            if (this.overflowBox) {
                this.$nextTick(() => {
                    this.overflowBox.scrollTop = this.overflowBox.scrollHeight
                })
            }
        }

        removeComment(index: number) {
            if (this.comments.length > 0) {
                this.comments.splice(index)
            }
        }

        get disabledBtn() {
            const hasComment = this.comments.find(d => d.content !== '')
            return !this.theme || !hasComment
        }

        get overflowBoxStyle() {
            let h = 400
            if (this.crateTalkBoxBtnWrapElm) {
                h = window.innerHeight - this.crateTalkBoxBtnWrapElm.clientHeight - 22 - 88
            }

            return {
                maxHeight: `${h}px`
            }
        }
    }
</script>

<style scoped lang="scss">
  .crate-talk-box {
    position: relative;
    padding: $size-m;

    .talk-btns {
      margin-top: $size-s;

      button {
        width: 100%;
      }
    }
  }

  .crate-talk-box-ttl {
    display: flex;
    align-items: center;
    margin-bottom: $size-m;

    .talk-title {
      margin-bottom: 0;
    }

    > span {
      margin-left: auto;
    }
  }

  .crate-talk-box-overflow {
    overflow: scroll;
    scroll-behavior: smooth;
  }

  .comment-btns {
    display: flex;

    button {
      flex: 1;
      margin-top: $size-s;

      &:first-child {
        margin-right: $size-xs;
      }
    }
  }

  .ogp {
    position: absolute;
    top: -2000px;
    left: 0px;
  }
</style>
