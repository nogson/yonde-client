<template>
  <article class="talk">
    <h2 class="talk-title title is-5">{{item.theme}}</h2>
    <div class="talk-content">
      <div class="thumbnail">
        <avatar-img :avatar-id="item.comments[0].avatar" />
      </div>
      <div class="talk-comment">{{item.comments[0].content}}</div>
    </div>
    <div class="talk-nav-box">
      <div class="talk-status-list">
      <span class="talk-status">
        <span class="icon is-small">
            <i class="fas fa-play"></i>
        </span> {{item.play_count}}
      </span>
        <span class="talk-status">
        <span class="icon is-small">
            <i class="fas fa-heart"></i>
        </span> {{item.like_count}}
      </span>
        <span class="talk-status">
        <span class="icon is-small">
            <i class="fas fa-comment-alt"></i>
        </span> {{item.comment_count}}
      </span>
      <span class="tag" v-for="tag in item.tags">#{{tag.name}}</span>
      </div>
      <div class="talk-buttons">
        <button class="button is-primary is-outlined">
        <span class="icon is-small">
          <i class="fas fa-share"></i>
        </span>
        </button>
        <button class="button is-primary is-outlined">
        <span class="icon is-small">
          <i class="fas fa-download"></i>
        </span>
        </button>
        <button @click="togglePlay" class="button is-primary">
        <span v-if="!isSpeaking" class="icon is-small">
          <i class="fas fa-play"></i>
        </span>
          <span v-else class="icon is-small">
          <i class="fas fa-stop"></i>
        </span>
        </button>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator'
    import Speaker from '~/assets/js/Speaker.ts'
    import {ITalk} from '~/assets/js/interface.ts'
    import AvatarImg from "~/components/AvatarImg.vue";
    @Component({
        components: {AvatarImg}
    })
    export default class Talk extends Vue {
        isSpeaking: boolean = false
        speaker = new Speaker()
        speakCount:number = 0

        @Prop({default: null})
        item: ITalk;

        created() {
            this.speaker.utterThis.addEventListener('end',()=> {
                this.speakCount ++
                if(this.speakCount === this.item.comments.length) {
                    this.isSpeaking = false
                    this.speakCount = 0
                }
            })

        }

        togglePlay() {
            this.speakCount = 0
            if(this.isSpeaking) {
                this.cancel()
            }else {
                this.speak()
            }

            this.isSpeaking = !this.isSpeaking
        }

        // Component methods can be declared as instance methods
        speak(): void {
            this.speaker.speakAll(this.item.comments)
            const res = this.$axios.$post('api/add_play_count', {id: this.item.id})
        }

        cancel(): void {
            this.speaker.cancel()
            this.speakCount = 0
        }

    }

</script>

<style scoped lang="scss">
  .talk {
    padding: $size-m;
    border: 3px solid $primary;
    border-radius: 10px;

    .talk-title {
      text-align: center;
      margin-bottom: $size-s;
    }

    .talk-content {
      display: flex;
      align-items: center;
      margin-bottom: $size-m;

      .thumbnail {
        margin-right: $size-s;
        width: 70px;
      }
    }

    .talk-comment {
      position: relative;
      background: $primary-lighten;
      padding: $size-s;
      border-radius: 100px;
      font-size: $font-size-s;

      &::before {
        position: absolute;
        left: -8px;
        top: 50%;
        content: "";
        display: block;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 0 15px 15px;
        border-color: transparent transparent $primary-lighten transparent;
      }
    }

    .talk-nav-box {
      display: flex;
      align-items: center;
    }

    .talk-status-list {
      margin-right: auto;

      .talk-status {
        margin-right: $size-s;
        font-size: $font-size-xs;

        i {
          color: $primary;
        }
      }
    }

    .tag {
      margin-right: $size-s;
      font-size: $font-size-xs;
      color: $primary;
    }

    .talk-buttons {
      display: flex;

      > * {
        margin-left: $size-xs;
      }
    }
  }
</style>