<template>
  <div class="search">
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input is-primary is-rounded" type="search">
        <span class="icon is-small is-left">
            <i class="fas fa-search"></i>
          </span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
    import {Vue, Component} from 'nuxt-property-decorator'

    @Component
    export default class Search extends Vue {

    }

</script>

<style scoped lang="scss">
  .search {
    margin-bottom: $size-l;
    .input {
      border-radius: 40px;
    }
  }
</style>