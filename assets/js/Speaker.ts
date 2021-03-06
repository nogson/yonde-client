import {IComment, ISpeaker} from '@/assets/js/interface.ts'
// import Recorder from '@/assets/js/Recorder.ts'

export default class Speaker implements ISpeaker {

    isCancelAll: boolean = false
    recorder: any
    utterThis: any = new SpeechSynthesisUtterance()

    speak(comment: IComment) {
        this.utterThis.text = comment.content
        this.utterThis.rate = comment.rate // 読み上げ速度 0.1-10 初期値:1 (倍速なら2, 半分の倍速なら0.5, )
        this.utterThis.pitch = comment.voice_type;　// 声の高さ 0-2 初期値:1(0で女性の声)
        this.utterThis.lang = 'ja-JP' //(日本語:ja-JP, アメリカ英語:en-US, イギリス英語:en-GB, 中国語:zh-CN, 韓国語:ko-KR)
        speechSynthesis.speak(this.utterThis)


        return this.utterThis
    }

    speakAll(comments: IComment[]) {
        // 無操作でAudioContextを作成するとエラーになるのでここで初期化
        //this.recorder = new Recorder()
        //this.recorder.start()

        let speakCount = 0

        const speak = () => {

            if (this.isCancelAll) {
                this.isCancelAll = false
                return
            }

            const instance = this.speak(comments[speakCount])


            instance.onerror = () => {
                console.log('error')
            }

            instance.onend = () => {
                speakCount++
                if (speakCount < comments.length) {
                    speak()
                }
            }
        }

        if (speakCount === 0) {
            speak()
        }

    }

    cancel() {
        this.isCancelAll = true
        speechSynthesis.cancel()
        //this.recorder.stop()
    }

}