const WIDTH = 1500;
const HEIGHT = 1500;
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;
// 3 functions (getting audio, draw frequencies, draw time) and all need
// access to AudioContext so we scope it to entire module in variable below
let analyzer;
let bufferLength;

function handleError(err) {
  console.log('You must give access to your mic in order to proceed');
}

async function getAudio() {
  const stream = await navigator.mediaDevices
    .getUserMedia({ audio: true })
    .catch(handleError);
  // where all the audio processing happens. We can create analyzer in it
  const audioCtx = new AudioContext();
  analyzer = audioCtx.createAnalyser();
  // need source to pipe stream into audioCtx
  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyzer);
  // How much data do we collect
  analyzer.fftSize = 2 ** 10;
  // how many pieces of data are there
  bufferLength = analyzer.frequencyBinCount;
  // pull the data from the audio using a type of an array usually used with
  // big datasets. Out array will fill frequency and time numbers.
  const timeData = new Uint8Array(bufferLength);
  const frequencyData = new Uint8Array(bufferLength);
  drawTimeData(timeData);
}

function drawTimeData(timeData) {
  // inject time data into timeData array
  analyzer.getByteTimeDomainData(timeData);
  // console.log(timeData);
  // now that we have data, make it visual
  // 1. Clear the canvas
  // 2. Setup some canvas drawing
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#ffc600';
  ctx.beginPath();
  const sliceWidth = WIDTH / bufferLength;
  console.log(sliceWidth);
  let x = 0;
  timeData.forEach((data, i) => {
    const v = data / 128;
    const y = (v * HEIGHT) / 2;
    // draw lines
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    x += sliceWidth;
  });

  // call itself ASAP. Tell browser to do run it next time it repaints to screen
  requestAnimationFrame(() => drawTimeData(timeData));
}

getAudio();
