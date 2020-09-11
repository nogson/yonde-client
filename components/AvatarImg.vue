<template>
  <img class="thumbnail" :src="avatar.img">
</template>

<script lang="ts">
    import {Vue, Component, Prop, Emit} from 'nuxt-property-decorator'
    import {AVATARS} from '@/assets/js/const'

    @Component
    export default class AvatarImg extends Vue {


        @Prop({default:1})
        avatarId: number

        get avatar() {
            console.log(this.avatarId,AVATARS.find(d => d.id === this.avatarId))
          return AVATARS.find(d => d.id === this.avatarId)
        }

    }
</script>

<style scoped lang="scss">
  .thumbnail {
    height: 100%;
    width: auto;
  }
</style>