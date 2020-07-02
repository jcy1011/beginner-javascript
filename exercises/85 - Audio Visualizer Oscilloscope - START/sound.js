import { hslToRgb } from './utils';

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
  drawFrequency(frequencyData);
}

function drawTimeData(timeData) {
  // inject time data into timeData array
  analyzer.getByteTimeDomainData(timeData);
  // console.log(timeData);
  // now that we have data, make it visual
  // 1. Clear the canvas. This makes fast repainting look like animation
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  // 2. Setup some canvas drawing
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#8A2BE2';
  ctx.beginPath();
  const sliceWidth = WIDTH / bufferLength;
  // console.log(sliceWidth);
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

  ctx.stroke();

  // call itself ASAP. Tell browser to do run it next time it repaints to screen
  requestAnimationFrame(() => drawTimeData(timeData));
}

function drawFrequency(frequencyData) {
  // get the frequency data into frequencyData array
  analyzer.getByteFrequencyData(frequencyData);
  // console.log(frequencyData);
  // figure out bar visual length. Multiply by 2.5 to push out nonaudible high freqs
  const barWidth = (WIDTH / bufferLength) * 2.5;
  let x = 0;
  frequencyData.forEach(amount => {
    // frequency data comes in from 0 to 255
    const percent = amount / 255;
    const barHeight = HEIGHT * percent;
    // convert bar colors to HSL
    const [h, s, l] = [360 / (percent * 360) - 1.9, 0.5, 0.5];
    const [r, g, b] = hslToRgb(h, s, l);
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    // re: 2nd argument below - no way to tell it to anchor from bottom
    ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  });

  requestAnimationFrame(() => drawFrequency(frequencyData));
}

getAudio();
