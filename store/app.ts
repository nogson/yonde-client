import {VuexModule, Module, Mutation, Action, MutationAction} from 'vuex-module-decorators'
import {ITalk} from '~/models/Talk'
import {ITag} from '~/models/Tag'
import {$axios} from '~/utils/api';

@Module({stateFactory: true, namespaced: true, name: 'app'})
export default class Feed extends VuexModule {
    talks: ITalk[] = []
    tags: ITag[] = []
    loading: boolean = false

    @Mutation
    setTalks(talks: ITalk[]) {
        this.talks = talks
    }

    @Mutation
    setTags(tags: ITag[]) {
        this.tags = tags
    }

    @Mutation
    setLoading(b: boolean) {
        this.loading = b
    }

    @Action
    async getTalks() {
        this.setLoading(true)
        const res = await $axios.$get('api/talks')
        this.setTalks(res.talks)
        this.setLoading(false)
    }

    @Action
    async getTalksForTag(id: number) {
        this.setLoading(true)
        const res = await $axios.$get(`api/talks/${id}`)
        this.setTalks(res.talks)
        this.setLoading(false)
    }

    @Action
    async getTags() {
        const res = await $axios.$get('api/tags')
        this.setTags(res.tags)
    }
}