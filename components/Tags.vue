<template>
  <nav>
    <ul class="talk-tags">
      <li @click="showAllTalks" class="talk-tag" :class="{act :!selectedTagId}">すべて</li>
      <li @click="showTalksForTag(tag)" v-for="tag in tags" class="talk-tag" :class="{act:tag.id === selectedTagId}">
        #{{tag.name}}<span>{{tag.count}}</span>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator'
    import {appStore} from '~/store'
    import {ITag} from '~/models/Tag.ts'

    @Component
    export default class Tags extends Vue {

        selectedTagId: number | null = null

        showAllTalks() {
            this.selectedTagId = null
            appStore.getTalks()
        }

        showTalksForTag(tag: ITag) {
            this.selectedTagId = tag.id
            appStore.getTalksForTag(tag.id)
        }

        get tags() {
            return appStore.tags;
        }
    }
</script>

<style scoped lang="scss">
  .talk-tags {
    list-style: none;
    margin: 0 0 $size-m;
  }

  .talk-tag {
    display: inline-block;
    cursor: pointer;
    color: $primary;
    background: $color-gray-1;
    border-radius: 20px;
    font-size: $font-size-xs;
    padding: $size-xxs $size-s;
    margin-right: $size-xxs;

    &.act {
      background: $primary-lighten;
    }

    span {
      margin-left: $size-xxs;
    }
  }
</style>
