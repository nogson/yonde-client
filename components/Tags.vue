<template>
  <nav>
    <ul class="talk-tags">
      <li @click="showTalksForTag(tag)" v-for="tag in tags" class="talk-tag">#{{tag.name}}<span>{{tag.count}}</span>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator'
    import {appStore} from '~/store'
    import {ITag} from '~/models/Tag.ts'

    export default class Tags extends Vue {

        showTalksForTag(tag: ITag) {
            appStore.getTalksForTag(tag.id)
        }

        get tags() {
            return appStore.tags;
        }
    }
</script>

<style scoped lang="scss">
  .talk-tags{
    list-style: none;
    margin: 0 0 $size-m;
  }
  .talk-tag {
    display: inline-block;
    cursor: pointer;
    color: $primary;
    background: $primary-lighten;
    border-radius: 20px;
    font-size: $font-size-xs;
    padding: $size-xxs $size-s;
    margin-right: $size-s;
    span {
      margin-left: $size-xxs;
    }
  }
</style>