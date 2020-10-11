<template>
  <section class="two-columns">
    <div class="talks">
      <tags/>
      <!--      <search />-->
      <talks/>
    </div>
    <transition name="fade">
      <div v-if="!isShowBtn" class="create-talk">
        <create-talk @close="closeCreateTalk"/>
      </div>
    </transition>

    <button @click="addTalk" class="create-btn" :class="{'fade-out':!isShowBtn,'fade-in':isShowBtn}">
        <span class="icon is-small">
            <i class="fas fa-plus"/>
        </span>
    </button>
  </section>
</template>

<script lang="ts">
    import {Vue, Component} from 'nuxt-property-decorator'
    import CreateTalk from "~/components/CreateTalk.vue";
    import Talks from "~/components/Talks.vue";
    import Search from "~/components/Search.vue";
    import Tags from "~/components/Tags.vue";

    @Component({
        components: {
            Search,
            Talks,
            CreateTalk,
            Tags
        },
    })
    export default class extends Vue {

        isShowBtn: boolean = true

        head() {
            return {
                title: 'AAAAAA'
            }
        }

        addTalk() {
            this.isShowBtn = false
        }

        closeCreateTalk() {
            console.log('ok')
            this.isShowBtn = true
        }
    }

</script>

<style scoped lang="scss">
  .two-columns {
    display: flex;

    .talks {
      flex: 1;
      padding: $size-l;
      @media screen and (max-width: $sm) {
        padding: $size-m;
      }
    }

    .create-talk {
      width: 350px;
      background: $color-gray-3;

      @media screen and (max-width: $sm) {
        position: fixed;
        right: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    }

    .create-btn {
      display: none;
      position: fixed;
      right: $size-m;
      bottom: ($size-m + 50px) * -1;
      width: 50px;
      height: 50px;
      border-radius: 50px;
      background: $primary;
      border: none;
      color: #FFF;
      box-shadow: 2px 2px 2px rgba(#000, 0.4);
      @media screen and (max-width: $sm) {
        display: block;
      }

      &.fade-out {
        animation: fadeOut 0.25s;
        animation-timing-function: ease-in;
        animation-fill-mode: forwards;
      }

      &.fade-in {
        animation: fadeIn 0.25s;
        animation-timing-function: ease-in;
        animation-fill-mode: forwards;
      }
    }
  }

  @keyframes fadeOut {
    0% {
      bottom: $size-m;
    }
    100% {
      bottom: ($size-m + 50px) * -1;
    }
  }

  @keyframes fadeIn {
    0% {
      bottom: ($size-m + 50px) * -1;
    }
    100% {
      bottom: $size-m;
    }
  }


  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }
</style>
