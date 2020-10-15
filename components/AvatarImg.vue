<template>
  <img class="thumbnail" :src="avatarImg">
</template>

<script lang="ts">
    import {Vue, Component, Prop, Emit} from 'nuxt-property-decorator'
    import {AVATARS} from '@/assets/js/const'

    @Component
    export default class AvatarImg extends Vue {


        @Prop({default: 1})
        avatarId: number

        @Prop({default: false})
        isSpeaking: boolean

        get avatar() {
            return AVATARS.find(d => d.id === this.avatarId)
        }

        get avatarImg() {
            const avatar = this.avatar ? this.avatar : AVATARS[0]
            return this.isSpeaking ? avatar.animationGif : avatar.img
        }

    }
</script>

<style scoped lang="scss">
  .thumbnail {
    height: 100%;
    width: auto;
  }
</style>
