<template>
  <div>
    <div v-if="loadingFlag" class="preloader">
      <span class="icon">
      <i class="fas fa-3x fa-spinner fa-pulse has-text-grey-light"></i>
      </span>
    </div>
    <div v-else-if="hasTalks">
      <h2 v-if="selectedTag" class="selected-tag title is-5"># {{selectedTag.name}}({{selectedTag.count}})</h2>
      <div class="talks">
        <talk class="talk-item" v-for="item in talks" :key="item.id" :item="item"/>
      </div>
    </div>
    <div v-else class="no-item">
      <p>表示できるおしゃべりがありません</p>
    </div>
  </div>
</template>

<script lang="ts">
    import {Vue, Component} from 'nuxt-property-decorator'
    import {appStore} from '~/store'
    import {ITalk} from '~/models/Talk'
    import {ITag} from "~/models/Tag";

    @Component({
        components: {
            Talk: () => import('~/components/Talk.vue')
        },
    })
    export default class extends Vue {

        created() {
            this.getTalks()
        }

        getTalks() {
            appStore.getTalks()
        }

        createdTalk() {
            this.getTalks()
        }

        get talks(): ITalk[] {
            return appStore.talks
        }

        get loadingFlag(): boolean {
            return appStore.loading
        }

        get hasTalks(): boolean {
            return appStore.talks.length > 0
        }

        get selectedTag(): ITag | null {
            return appStore.selectedTag
        }
    }
</script>

<style scoped lang="scss">
  .talk-item {
    &:not(:last-child) {
      margin-bottom: $size-l;
    }
  }

  .preloader {
    text-align: center;
    height: 65vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .no-item {
    height: 65vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }

  .selected-tag {
    margin-bottom: $size-l;
    font-weight: bold;
  }

  .talks {
    display: grid;
    gap: $size-l;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;

    > * {
      margin-bottom: 0 !important;
    }

    @media screen and (max-width: $sm) {
      display: block;

      > * {
        margin-bottom: $size-l !important;
      }
    }
  }


</style>
