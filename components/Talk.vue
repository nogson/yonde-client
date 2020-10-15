<template>
  <article class="talk">
    <h2 class="talk-title title is-5 m_plus_r_700">{{item.theme}}</h2>
    <div class="talk-content">
      <div class="thumbnail">
        <avatar-img :avatar-id="item.comments[speakCount].avatar" :is-speaking="isSpeaking" />
      </div>
      <div class="talk-comment m_plus_r_300">{{item.comments[speakCount].content}}</div>
    </div>
    <div class="talk-nav-box m_plus_r_500">
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
        <span @click="showTalksForTag(tag)" class="tag" v-for="tag in item.tags">#{{tag.name}}</span>
      </div>
      <div class="talk-buttons">
        <button @click="like" class="button is-primary is-outlined">
        <span class="icon is-small">
          <i class="fas fa-heart"></i>
        </span>
        </button>
        <a :href="shareData.facebook" target="_blank" rel="nofollow" class="button is-primary is-outlined">
        <span class="icon is-small">
          <i class="fab fa-facebook-f"></i>
        </span>
        </a>
        <a :href="shareData.twitter" target="_blank" class="button is-primary is-outlined">
        <span class="icon is-small">
          <i class="fab fa-twitter"></i>
        </span>
        </a>
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
    <transition name="fade">
      <div v-if="isShowLikeAnimation" class="like-animation">
        <i class="fas fa-heart"></i>
      </div>
    </transition>
  </article>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator'
    import Speaker from '~/assets/js/Speaker.ts'
    import {ITalk} from '~/models/Talk.ts'
    import {ITag} from '~/models/Tag.ts'
    import AvatarImg from "~/components/AvatarImg.vue";
    import {appStore} from '~/store'

    @Component({
        components: {AvatarImg}
    })
    export default class Talk extends Vue {
        isSpeaking: boolean = false
        speaker: any
        speakCount: number = 0
        isShowLikeAnimation: boolean = false

        @Prop({default: null})
        item: ITalk;

        created() {
            this.speaker = new Speaker()
            this.speaker.utterThis.addEventListener('end', () => {
                this.speakCount++
                if (this.speakCount === this.item.comments.length) {
                    this.isSpeaking = false
                    this.speakCount = 0
                }
            })

        }

        togglePlay() {
            this.speakCount = 0
            if (this.isSpeaking) {
                this.cancel()
            } else {
                this.speak()
            }

            this.isSpeaking = !this.isSpeaking
        }

        // Component methods can be declared as instance methods
        speak(): void {
            this.speaker.speakAll(this.item.comments)
            appStore.addPlayCount(this.item.id)
        }

        cancel(): void {
            this.speaker.cancel()
            this.speakCount = 0
        }

        async like() {
            this.isShowLikeAnimation = true
            await appStore.like(this.item.id)
            this.isShowLikeAnimation = false
        }

        showTalksForTag(tag: ITag) {
            appStore.getTalksForTag(tag.id)
        }

        get shareData() {
            const shareUrl = `${location.href}talk/${this.item.id}`
            return {
                twitter: `https://twitter.com/share?original_referer=${shareUrl}`,
                facebook: `http://www.facebook.com/share.php?u=${shareUrl}`
            }
        }

    }

</script>

<style scoped lang="scss">
  .talk {
    position: relative;
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
        @media screen and (max-width:$sm) {
          width: 50px;
        }
      }
    }

    .talk-comment {
      flex: 1;
      position: relative;
      background: $primary-lighten;
      padding: $size-s;
      border-radius: 20px;
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
      @media screen and (max-width:$sm) {
        display: block;
      }
    }

    .talk-status-list {
      margin-right: auto;

      @media screen and (max-width:$sm) {
        margin-bottom: $size-xs;
      }

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
      cursor: pointer;
    }

    .talk-buttons {
      display: flex;

      .button {
        border-radius: 100px;
      }

      > * {
        margin-left: $size-xs;
        @media screen and (max-width:$sm) {
          margin: 0 $size-xs 0 0;
        }
      }
    }

    .like-animation {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(#FFF, 0.5);
      left: 0;
      top: 0;
      border-radius: 7px;

      i {
        color: #FFF;
        font-size: 50px;
        color: $primary;
      }
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
      opacity: 0;
    }
  }
</style>
