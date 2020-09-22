<template>
  <section class="talk">
    <div class="talk-content-warp">
      <div>
        <h1 class="talk-title title is-5 m_plus_r_700">{{theme}}</h1>
        <h2 class="talk-disc m_plus_r_300">〜 自動おしゃべりサービス 〜</h2>
      </div>
      <div v-if="hasComment" class="talk-content">
        <div class="thumbnail">
          <avatar-img :avatar-id="ogpComment[0].avatar"/>
        </div>
        <div class="talk-comment m_plus_r_300">{{ogpComment[0].content}}</div>
      </div>
    </div>
    <button class="button is-rounded is-danger">
              <span class="icon is-large">
                <i class="fas fa-play"></i>
              </span>
      <span>再生</span>
    </button>
  </section>
</template>

<script lang="ts">
    import {Vue, Prop, Component} from 'nuxt-property-decorator'
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

        get hasComment() {
            return this.comments.filter(d => d.content !== '').length > 0

        }

        get ogpComment() {
            return this.comments.filter(d => d.content !== '')
        }
    }
</script>

<style scoped lang="scss">
  .talk {
    position: relative;
    padding: $size-xl;
    border: 10px solid $primary;
    border-radius: 10px;
    width: 1200px;
    height: 630px;
    background: #FFF;
    background: #FFF url("~@/assets/images/ogp_bg.png") center center;
    box-sizing: border-box;
    .logo {
      width: 120px;
      position: absolute;
      left: $size-l;
      top: $size-l;
    }

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

    .talk-disc {
      text-align: center;
      font-size: $size-s;
      margin: 0 0 $size-xl;
      color: $primary;
    }

    .talk-content-warp {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: calc(100% - 50px);
    }

    .talk-content {
      display: flex;
      align-items: center;
      margin-bottom: $size-m;
      padding: 0 $size-xl;
      .thumbnail {
        margin-right: $size-l;
        width: 120px;
      }
    }

    .talk-comment {
      flex: 1;
      position: relative;
      background: $primary-lighten;
      padding: $size-s;
      border-radius: 20px;
      font-size: $font-size-xl;
      line-height: 1.7;

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

</style>