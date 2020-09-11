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
        <button @click="speak" class="button is-primary is-outlined">
        <span class="icon is-small">
          <i class="fas fa-share"></i>
        </span>
        </button>
        <button @click="speak" class="button is-primary is-outlined">
        <span class="icon is-small">
          <i class="fas fa-download"></i>
        </span>
        </button>
        <button @click="speak" class="button is-primary">
        <span class="icon is-small">
          <i class="fas fa-play"></i>
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

        @Prop({default: null})
        item: ITalk;

        // Component methods can be declared as instance methods
        speak(): void {
            this.speaker.speakAll(this.item.comments)
            this.isSpeaking = true
            const res = this.$axios.$post('api/add_play_count', {id: this.item.id})
        }

        cancel(): void {
            this.isSpeaking = false
            this.speaker.cancel()
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