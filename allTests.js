const { createCanvas } = require('canvas');
let canvas = createCanvas(500, 500);
const fs = require('fs')

test()

async function test() {
  await render(50, 0, 0, 'rgba(244, 0, 0, 0.05)', 'rgba(9, 200, 0, 0.05)', 1)
  await render(50, 0, 0, 'rgba(244, 0, 0, 0.1)', 'rgba(9, 200, 0, 0.1)', 2)
  await render(10, 0, 0, 'rgba(244, 0, 0, 0.2)', 'rgba(9, 200, 0, 0.2)', 3)
  await render(50, 0, 0.05, 'rgb(244, 0, 0)', 'rgb(9, 200, 0)', 4)
  // await render(50, 0.05, 0, 'rgb(244, 0, 0)', 'rgb(9, 200, 0)', 5)
  await render(250, 2, 0.05, 'rgb(244, 0, 0)', 'rgb(9, 200, 0)', 6)
}

async function render(I, move, alpha, color1, color2, num) {

  let ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  folder(num)

  for (let i = 0; i < I; i++) {

    // shifts coordinates and rotates
    rotate(250 + i * move, 150, 1, ctx);

    let color = ctx.createLinearGradient(0, 0, 200, 200);

    if (alpha) {
      ctx.globalAlpha = 0.05;
    }

    color.addColorStop(0, color1);
    color.addColorStop(1, color2);
    ctx.fillStyle = color;


    ctx.fillRect(0, 0, 200, 200);

    // saves the canvas state as square{i}.png
    await saveFile(num + '/square' + i);
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

function folder(name) {
  try {
    fs.mkdirSync(__dirname + '/' + name)
  }
  catch {
  }
}