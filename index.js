const { createCanvas } = require('canvas');
let canvas = createCanvas(500, 500);
let ctx = canvas.getContext('2d');
const fs = require('fs')

ctx.patternQuality = 'bilinear';
ctx.quality = 'bilinear';

render()


async function render() {

  const I = 50;

  for (let i = 0; i < I; i++) {

    // shifts coordinates and rotates
    rotate(250, 150, 1, ctx);

    let color = ctx.createLinearGradient(0, 0, 200, 200);

    ctx.globalAlpha = 0.05;

    color.addColorStop(0, 'rgb(244, 0, 0)');
    color.addColorStop(1, 'rgb(9, 200, 0)');
    ctx.fillStyle = color;


    ctx.fillRect(0, 0, 200, 200);

    // saves the canvas state as square{i}.png
    await saveFile('square' + i);
  }

}


function rotate(x, y, a, ctx) {
  ctx.resetTransform();
  var cos = Math.cos(a);
  var sin = Math.sin(a);
  ctx.transform(cos, sin, -sin, cos, x, y);
}

function saveFile(fname) {
  return new Promise((resolve, reject) => {
    const out = fs.createWriteStream(__dirname + `/${fname}.png`)
    const stream = canvas.createPNGStream()
    stream.pipe(out)
    out.on('finish', () => {
      console.log('The PNG file was created.')
      resolve(true);
    })
  })  
}

// fs.unlinkSync(__dirname + '/test.png')
