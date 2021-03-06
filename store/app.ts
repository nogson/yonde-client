import {VuexModule, Module, Mutation, Action, MutationAction} from 'vuex-module-decorators'
import {ITalk} from '~/models/Talk'
import {ITag} from '~/models/Tag'
import {IMessage} from "~/models/Message"
import {$axios} from '~/utils/api';
import {appStore} from "~/utils/store-accessor";

@Module({stateFactory: true, namespaced: true, name: 'app'})
export default class Feed extends VuexModule {
    talks: ITalk[] = []
    tags: ITag[] = []
    messages:IMessage[] = []
    loading: boolean = false
    selectedTag: ITag | null = null

    @Mutation
    setTalks(talks: ITalk[]) {
        this.selectedTag = null
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

    @Mutation
    setSelectedTag(id: number) {
        this.selectedTag = this.tags.find(d => d.id === id) || null
    }

    @Mutation
    setMessages(messages: IMessage[]) {
        this.messages = messages
    }

    @Action
    async getTalk(id: number | string) {
        this.setLoading(true)
        const res = await $axios.$get(`api/talk/${id}`)
        this.setLoading(false)
        return res.data
    }

    @Action
    async getTalks() {
        this.setLoading(true)
        const res = await $axios.$get('api/talks')
        this.setTalks(res.data)
        this.setLoading(false)
    }

    @Action
    async getTalksForTag(id: number) {
        this.setLoading(true)
        const res = await $axios.$get(`api/talks/${id}`)
        this.setTalks(res.data)
        this.setLoading(false)
        this.setSelectedTag(id)
    }

    @Action
    async getTags() {
        const res = await $axios.$get('api/tags')
        this.setTags(res.tags)
    }

    @Action
    async addPlayCount(id: number) {
        const talk: ITalk = await $axios.$post('api/add_play_count', {id})
        const talks: ITalk[] = JSON.parse(JSON.stringify(this.talks))

        const items = talks.map(d => {
            if (d.id === id) {
                d.play_count = talk.play_count
            }

            return d
        })

        this.setTalks(items)
    }

    @Action
    async like(id: number) {
        const talk: ITalk = await $axios.$post('api/like', {id})
        const talks: ITalk[] = JSON.parse(JSON.stringify(this.talks))

        const items = talks.map(d => {
            if (d.id === id) {
                d.like_count = talk.like_count
            }

            return d
        })

        this.setTalks(items)
    }

    @Action
    async getMessages(id:string) {
        const res = await $axios.$get(`api/messages/${id}`)

        this.setMessages(res.data)
    }

    @Action
    async addMessage(params:IMessage) {
        const message = await $axios.$post('api/message', params)
        const data = {
            talk_id:message.data.talk_id,
            message:message.data.message,
            avatar_id:message.data.avatar_id
        }
        let messages:IMessage[] = JSON.parse(JSON.stringify(this.messages))
        messages.unshift(data)
        console.log(message)
        this.setMessages(messages)
    }

}
