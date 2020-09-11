<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-3">会話を作成する</h1>
      <div>
        <div class="field mb-m">
          <label class="label">テーマ</label>
          <div class="control">
            <input class="input" type="text" v-model="theme">
          </div>
        </div>
        <comment v-for="item in comments" :kye="item.id" :item.sync="item"/>
        <div class="field is-grouped btn-group">
          <div class="control">
            <button @click="speak" class="button is-rounded is-outlined is-primary">
              <span class="icon is-small"><i class="fas fa-play"></i></span>
              <span>すべて再生</span>
            </button>
          </div>
          <div class="control">
            <button @click="addComment" class="button is-rounded is-outlined is-primary">
              <span class="icon is-small"><i class="fas fa-plus"></i></span>
              <span>追加</span>
            </button>
          </div>
          <div class="control">
            <button :disabled="isLoading" @click="createTalk" class="button is-rounded is-primary">
              <span class="icon is-small">
                <i v-if="!isLoading" class="fas fa-check"></i>
                <i v-else="isLoading" class="fas fa-spinner fa-pulse"></i>
              </span>
              <span>登録</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
    import {Vue, Component} from 'nuxt-property-decorator'
    import Speaker from '~/assets/js/Speaker.ts'
    import {IComment} from '@/assets/js/interface.ts'

    @Component({
        components: {
            Comment: () => import('~/components/Comment.vue')
        },
    })
    export default class extends Vue {

        theme: string = ''
        comments: IComment[] = []
        isLoading:boolean = false

        speaker = new Speaker()

        @Emit('createdTalk')
        async createTalk() {
            console.log('TTTT')
            this.isLoading = true
            await this.$axios.$post('api/talk', {
                theme: this.theme,
                comments: this.comments
            })
            this.isLoading = false
            this.comments = []
        }

        speak() {
            this.speaker.speakAll(this.comments)
        }

        addComment() {
            const comment: IComment = {
                content: '',
                voice_type: 0,
                rate: 1
            }
            this.comments.push(comment)
        }

        mounted() {
            this.addComment()
        }
    }
</script>

<style scoped lang="scss">
  .btn-group {
    button {
      width: 150px;
    }

    > *:nth-child(1) {
      margin-left: auto;
    }
  }

  .no-comment {
    text-align: center;
    padding: 100px 0;

    p {
      margin-bottom: 20px;
    }
  }
</style>
