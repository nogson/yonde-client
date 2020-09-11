<template>
  <div class="crate-talk-box">
    <h2 class="talk-title title is-5">おしゃべりを投稿</h2>
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
      <comment v-for="item in comments" :kye="item.id" :item.sync="item"/>
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
    </div>
    <div class="talk-btns">
      <button :disabled="isLoading" @click="createTalk" class="button is-rounded is-primary">
              <span class="icon is-small">
                <i v-if="!isLoading" class="fas fa-check"></i>
                <i v-else="isLoading" class="fas fa-spinner fa-pulse"></i>
              </span>
        <span>登録</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
    import {Vue, Component,Emit} from 'nuxt-property-decorator'
    import Speaker from '~/assets/js/Speaker.ts'
    import {IComment} from '@/models/Comment.ts'
    import { appStore } from '~/store'


    @Component({
        components: {
            Comment: () => import('~/components/Comment.vue')
        },
    })
    export default class CreateTalk extends Vue {

        theme: string = ''
        tags: string = ''
        comments: IComment[] = []
        isLoading: boolean = false
        speaker = new Speaker()

        @Emit('created-talk')
        async createTalk() {
            this.isLoading = true
            await this.$axios.$post('api/talk', {
                theme: this.theme,
                tags:this.tags.split(','),
                comments: this.comments
            })
            this.isLoading = false
            this.comments = []
            this.theme = ''
            this.tags= ''
            this.addComment() // リセット用

            appStore.getTalks()
            appStore.getTags()
        }

        speak() {
            this.speaker.speakAll(this.comments)
        }

        addComment() {
            const comment = {
                content: '',
                voice_type: 0,
                rate: 1,
                avatar:1
            }
            this.comments.push(comment)
        }

        mounted() {
            this.addComment()
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

  .comment-btns {
    display: flex;
    margin-top: $size-s;

    button {
      flex: 1;
      &:first-child {
        margin-right: $size-xs;
      }
    }
  }
</style>