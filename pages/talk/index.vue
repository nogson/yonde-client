<template>
  <section class="section">
    <div class="container">
      <talk v-for="item in talks" :key="item.id" :item="item"/>
    </div>
  </section>
</template>

<script lang="ts">
    import {Vue, Component} from 'nuxt-property-decorator'

    @Component({
        components: {
            Talk:() => import('~/components/Talk.vue'),
            Comment: () => import('~/components/Comment.vue')
        },
    })
    export default class extends Vue {

        talks = null

        async created() {
            const res = await this.$axios.$get('api/talk')
            this.talks = res.talks
        }

    }
</script>

<style scoped lang="scss">

</style>