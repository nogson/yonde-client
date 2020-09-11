export interface IComment {
    content: string,
    voice_type: number,
    rate: number
}

export interface ITalk {
    id: number,
    comments: IComment[],
    like_count: number,
    play_count: number,
    tags: string,
    theme: string
}

export interface ISpeaker {
    speak(comment: IComment): void

    speakAll(comments: IComment[]): void
}