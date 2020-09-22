<template>
  <section id="sidenav">
    <h1 class="logo"><img src="@/assets/images/logo_1.png" /></h1>
    <nav>
      <ul class="tags">
        <li @click="showTalksForTag(tag)" v-for="tag in tags" class="tag tile">#{{tag.name}}<span>{{tag.count}}</span>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator'
    import {appStore} from '~/store'
    import {ITag} from '~/models/Tag.ts'

    export default class SideNav extends Vue {

        showTalksForTag(tag: ITag) {
            appStore.getTalksForTag(tag.id)
        }

        get tags() {
            return appStore.tags;
        }
    }
</script>

<style scoped lang="scss">
  #sidenav {
    .logo {
      margin-bottom: $size-l;
      font-size: $font-size-l;
      text-align: center;
      img {
        width: 120px;
      }
    }

    width: 100%;
    height: 100%;
    background: $primary;
    color: #FFF;
    padding: $size-m;
    box-sizing: border-box;

    .tags {
      /*display: flex;*/
      /*flex-wrap: wrap;*/
    }

    .tag {
      cursor: pointer;
      color: $primary;
      background: $primary-lighten;
      border-radius: 20px;
      font-size: $font-size-xs;

      span {
        margin-left: $size-xxs;
      }
    }
  }
</style>