<template>
  <section class="section">

    <div class="container">
      <div>
        <comment/>
        <div class="field is-grouped btn-group">
          <div class="control">
            <button class="button is-rounded is-outlined is-primary">
              <span class="icon is-small"><i class="fas fa-play"></i></span>
              <span>すべて再生</span>
            </button>
          </div>
          <div class="control">
            <button class="button is-rounded is-primary">
              <span class="icon is-small"><i class="fas fa-plus"></i></span>
              <span @click="submit">追加</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
    import {Vue, Component} from 'nuxt-property-decorator'

    @Component({
        components: {
            Comment: () => import('~/components/Comment.vue')
        },
    })
    export default class extends Vue {
      submit() {
        this.$axios.$post('api/talk')
      }
    }
</script>

<style scoped lang="scss">
  .btn-group {
    button {
      width: 150px;
    }

    > *:nth-child(1) {
      margin-left: auto;
    }
  }
</style>
