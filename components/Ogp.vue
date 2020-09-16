<template>
  <article class="talk">
    <h2 class="talk-title title is-5">{{theme}}</h2>
    <div v-if="ogpComment" v-for="(comment,index) in ogpComment" :key="index" class="talk-content">
      <div class="thumbnail">
        <avatar-img :avatar-id="comment.avatar"/>
      </div>
      <div v-if="ogpComment" class="talk-comment">{{comment.content}}</div>
    </div>
    <button class="button is-rounded is-primary">
              <span class="icon is-large">
                <i class="fas fa-play"></i>
              </span>
      <span>再生</span>
    </button>
  </article>
</template>

<script lang="ts">
    import {Vue, Prop,Component} from 'nuxt-property-decorator'
    import {IComment} from "~/models/Comment";
    import AvatarImg from '~/components/AvatarImg.vue'

    @Component({
        components: {AvatarImg}
    })
    export default class Ogp extends Vue {

        @Prop()
        theme: string

        @Prop()
        comments: IComment[]

        get ogpComment() {
            return this.comments.filter(d => d.content !== '')
        }
    }
</script>

<style scoped lang="scss">
  .ogp {
    position: absolute;
    top: -2000px;
    left: 0px;

    .talk {
      padding: $size-xl;
      border: 3px solid $primary;
      border-radius: 10px;
      width: 1200px;
      height: 630px;
      background: #FFF;

      .button {
        width: 200px;
        font-size: 20px;
        font-weight: bold;
        margin: 0 auto;
        display: block;
      }

      .talk-title {
        text-align: center;
        margin-bottom: $size-s;
        color: $primary;
        font-size: 32px;
      }

      .talk-content {
        display: flex;
        align-items: center;
        margin-bottom: $size-m;

        .thumbnail {
          margin-right: $size-l;
          width: 100px;
        }
      }

      .talk-comment {
        flex: 1;
        position: relative;
        background: $primary-lighten;
        padding: $size-s;
        border-radius: 20px;
        font-size: $font-size-l;

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
    }
  }
</style>