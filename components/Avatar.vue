<template>
  <div class="avatar-box">
    <p>サムネイルを選択してください。</p>
    <div class="thumbnails">
      <div class="avatar" v-for="avatar in avatars" @click="select(avatar)" :class="{'act':actAvatar(avatar.id)}">
        <avatar-img :avatar-id="avatar.id" />
      </div>
    </div>
    <button @click="$emit('close')" class="delete" aria-label="close"></button>
  </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Emit} from 'nuxt-property-decorator'
    import {IAvatar} from '@/models/Comment.ts'
    import AvatarImg from "~/components/AvatarImg.vue";
    import {AVATARS} from '@/assets/js/const'

    @Component({
        components: {AvatarImg}
    })
    export default class Avatar extends Vue {


        avatars: IAvatar[] = AVATARS

        @Prop()
        avatarId: number


        select(avatar: IAvatar) {
            this.$emit('update:avatarId', avatar.id)
        }

        get actAvatar() {
            return (avatar:number):boolean => {
                return avatar === this.avatarId
            }
        }

    }
</script>

<style scoped lang="scss">
  .avatar-box {
    position: relative;
    background: #FFF;
    padding: $size-l $size-l $size-m;
    border-radius: $size-s;

    .thumbnails {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

    }

    .avatar {
      width: 100px;
      height: 100px;
      border: 1px solid $color-border-gray;
      padding: $size-xs;
      text-align: center;
      line-height: 100px;
      margin-bottom: $size-s;
      cursor: pointer;
      box-sizing: border-box;

      &.act {
        border: 3px solid $primary;
      }
    }

    .delete {
      position: absolute;
      right:$size-m;
      top:$size-m;
    }
  }
</style>