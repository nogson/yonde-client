
export default class Recorder {
    recorder: any
    osc: any
    audioData: []

    constructor() {
        this.audioData = []

        const audioCtx = new AudioContext();
        const dest = audioCtx.createMediaStreamDestination();
        this.osc = audioCtx.createOscillator();

        this.osc.connect(dest);
        this.recorder = new MediaRecorder(dest.stream);


        this.recorder.addEventListener("dataavailable", (event: BlobEvent) => {
            this.audioData.push(event.data)
            //this.audioExtension = this.getExtension(e.data.type);
        });
        this.recorder.addEventListener("stop", () => {
            const audioBlob = new Blob(this.audioData, {'type': 'audio/ogg; codecs=opus'});
            console.log(audioBlob)
            return audioBlob
            //this.save(audioBlob)
        });

    }

    start() {
         console.log('start')
        this.recorder.start()
    }

    stop() {
        console.log('stop')
        const blob = this.recorder.stop()
        console.log(blob)
        return blob
    }

}