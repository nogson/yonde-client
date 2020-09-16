
export default class Recorder {
    recorder: any
    osc: any
    audioData: []
    audioExtension:any

    constructor() {
        this.audioData = []

        const audioCtx = new AudioContext();
        const dest = audioCtx.createMediaStreamDestination();
        this.osc = audioCtx.createOscillator();

        this.osc.connect(dest);
        this.recorder = new MediaRecorder(dest.stream);


        this.recorder.addEventListener("dataavailable", (event: BlobEvent) => {
            this.audioData.push(event.data)
            this.audioExtension = this.getExtension(event.data.type);
        });
        this.recorder.addEventListener("stop", () => {
            const audioBlob = new Blob(this.audioData, {'type': 'audio/ogg; codecs=opus'});
            const url = URL.createObjectURL(audioBlob);

            console.log(audioBlob)

            let a = document.createElement('a');
            a.href = url;
            a.download = Math.floor(Date.now() / 1000) + this.audioExtension;
            document.body.appendChild(a);
            a.click();

            //return audioBlob
            //this.save(audioBlob)
        });

    }

    start() {
         console.log('start')
        this.recorder.start()
    }

    stop() {
        console.log('stop')
        this.recorder.stop()
    }

    getExtension(audioType:any) {

        let extension = 'wav';
        const matches = audioType.match(/audio\/([^;]+)/);

        if(matches) {

            extension = matches[1];

        }

        return '.'+ extension;

    }

}