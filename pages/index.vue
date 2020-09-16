<template>
  <section class="two-columns">
    <div class="talks">
      <!--      <search />-->
      <talks/>
    </div>
    <div class="create-talk">
      <create-talk/>
    </div>
  </section>
</template>

<script lang="ts">
    import {Vue, Component} from 'nuxt-property-decorator'
    import CreateTalk from "~/components/CreateTalk.vue";
    import Talks from "~/components/Talks.vue";
    import Search from "~/components/Search.vue";

    @Component({
        components: {
            Search,
            Talks,
            CreateTalk,
        },
    })
    export default class extends Vue {
    }

</script>

<style scoped lang="scss">
  .two-columns {
    display: flex;

    .talks {
      flex: 1;
      padding: $size-l;
    }

    .create-talk {
      width: 350px;
      background: $color-gray-3;
    }
  }
</style>
