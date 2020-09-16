import {IComment} from '~/models/Comment'

export interface ITalk {
    id: number,
    comments: IComment[],
    like_count: number,
    play_count: number,
    tags: string,
    theme: string,
    ogp_img:string
}

