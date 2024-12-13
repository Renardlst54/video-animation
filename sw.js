self.addEventListener('install', event => {
  self.skipWaiting();
});

let audioContext = null;
let audioBuffer = null;
let source = null;

self.addEventListener('message', async event => {
  if (event.data.type === 'START_AUDIO') {
    if (!audioContext) {
      audioContext = new AudioContext();
    }
    
    if (!audioBuffer) {
      const response = await fetch('video.mp4.mp4');
      const arrayBuffer = await response.arrayBuffer();
      audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    }
    
    source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.loop = true;
    source.start();
  }
});
