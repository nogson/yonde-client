<template>
  <div class="comment">
    <div class="talk-content">
      <div @click="modalToggle" class="thumbnail">
        <avatar-img :avatar-id="item.avatar" />
        <i class="fas fa-user"></i>
      </div>
      <div class="talk-comment"><input class="input" type="text" v-model="item.content"></div>
    </div>
    <div class="input-columns">
      <div class="field">
        <label class="label font-xs">声の種類</label>
        <div class="control">
          <div class="select">
            <select v-model="item.voice_type">
              <option v-for="option in voiceOptions" :key="option.value" :value="option.value">{{option.label}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label font-xs">速度</label>
        <div class="control">
          <div class="select">
            <select v-model="item.rate">
              <option v-for="option in rateOptions" :key="option.value" :value="option.value">{{option.label}}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="comment-nav">
      <span class="icon is-small">
        <i class="fas fa-times"></i>
      </span>
      <span @click="speak" class="icon is-small">
        <i class="fas fa-play"></i>
      </span>
    </div>
    <div class="modal" :class="{'is-active' : isModalOpen}">
      <div class="modal-background" @click="modalToggle"></div>
      <div class="modal-content">
        <avatar :avatar-id.sync="item.avatar" @close="modalToggle" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from 'nuxt-property-decorator'
    import Speaker from '@/assets/js/Speaker.ts'
    import {IComment} from '@/models/Comment.ts'
    import Avatar from "@/components/Avatar.vue";
    import AvatarImg from "~/components/AvatarImg.vue";

    @Component({
        components: {AvatarImg, Avatar}
    })
    export default class Comment extends Vue {

        voiceOptions = [
            {value: 0, label: '低い声'},
            {value: 1, label: '普通の声'},
            {value: 2, label: '高い声'}
        ]

        rateOptions = [
            {value: 0.5, label: '遅い'},
            {value: 1, label: '普通'},
            {value: 2, label: '早い'}
        ]

        speaker = new Speaker()

        isModalOpen: boolean = false

        @Prop()
        item: IComment;


        speak() {
            this.speaker.speak(this.item)
        }


        modalToggle() {
            this.isModalOpen = !this.isModalOpen
        }

    }

</script>

<style scoped lang="scss">
  .comment {
    padding: $size-s;
    background: $primary-lighten;
    border-radius: $size-s;
    position: relative;
    margin-top: $size-m;
  }

  .comment-nav {
    display: flex;

    > * {
      margin-left: $size-xs;
    }

    > *:first-child {
      margin-left: auto;
    }
  }

  .talk-content {
    display: flex;
    align-items: center;
    margin-bottom: $size-m;

    .thumbnail {
      position: relative;
      margin-right: $size-s;
      width: 40px;
      height: auto;
      cursor: pointer;
      i {
        position: absolute;
        bottom:-8px;
        right:-8px;
        background: #FFF;
        border: 1px solid $primary;
        padding: $size-xs;
        border-radius: 100px;
        font-size: 10px;
        color: $primary;
      }
    }

    .talk-comment {
      flex: 1;

      input {
        border: none;
        border-radius: $size-s;
      }
    }
  }

  .input-columns {
    display: flex;

    > *:not(:last-child) {
      margin-right: $size-xs;
    }
  }
</style>