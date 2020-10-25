<template>
  <div v-if="!isLoading">
    <div v-for="item in messages" class="message-content">
      <div class="thumbnail">
        <avatar-img :avatar-id="item.avatar_id"/>
      </div>
      <div class="message-comment m_plus_r_300">{{item.message}}</div>
    </div>
  </div>
  <div v-else class="preloader">
    <span class="icon">
      <i class="fas fa-3x fa-spinner fa-pulse has-text-grey-light"></i>
    </span>
  </div>
</template>

<script lang="ts">

    import {Vue, Component} from 'nuxt-property-decorator'
    import {IMessage} from "~/models/Message";
    import {appStore} from '~/store'

    @Component({})
    export default class extends Vue {

        isLoading: boolean = true

        async mounted() {
            this.isLoading = true
            await appStore.getMessages(this.$route.params.id)
            this.isLoading = false
        }

        get messages(): IMessage[] {
            return appStore.messages
        }
    }


</script>

<style scoped lang="scss">

  .message-content {
    display: flex;
    align-items: center;
    margin-bottom: $size-m;

    .thumbnail {
      margin-right: $size-s;
      width: 50px;
      @media screen and (max-width: $sm) {
        width: 50px;
      }
    }
  }

  .message-comment {
    flex: 1;
    position: relative;
    background: $color-light-yellow;
    padding: $size-s;
    border-radius: 20px;
    font-size: $font-size-s;
    word-break: break-all;

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
      border-color: transparent transparent $color-light-yellow transparent;
    }
  }

  .preloader{
    padding: $size-l;
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto !important;
  }
</style>
