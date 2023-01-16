const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");
const colormap = require("colormap");
const tweakPane = require("tweakpane");
const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const params = {
  cols: 20,
  rows: 30,
  colorScheme: "",
  frequency: 0.002,
  amplitude: 90,
  speed: 2,
};

const sketch = ({ context, width, height, frame }) => {
  const cols = 1 * params.cols;
  const rows = 1 * params.rows;
  console.log(cols, rows);
  const numCells = cols * rows;

  //grid
  const gw = width * 0.8;
  const gh = height * 0.8;
  //cell
  const cw = gw / cols;
  const ch = gh / rows;
  //margin
  const mx = (width - gw) * 0.5;
  const my = (height - gh) * 0.5;

  const points = [];

  let x, y, n, lineWidth, color;
  let freq = 1 * params.frequency;
  let amp = 1 * params.amplitude;

  const colors = colormap({
    colormap: params.colorScheme,
    nshades: amp,
  });

  for (let i = 0; i < numCells; i++) {
    x = (i % cols) * cw;
    y = Math.floor(i / cols) * ch;

    n = random.noise2D(x, y, freq, amp);
    // x += n;
    // y += n;

    //random line width
    lineWidth = math.mapRange(n, -amp, amp, 1, 20);

    //random colors
    color = colors[Math.floor(math.mapRange(n, -amp, amp, 0, amp))];
    points.push(new Point({ x, y, lineWidth, color }));
  }
  return ({ context, width, height, frame }) => {
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    context.save();
    context.translate(mx, my);
    context.translate(0.5 * cw, 0.5 * ch);
    context.strokeStyle = "green";
    context.lineWidth = 4;

    //update position for animation
    points.forEach((point) => {
      // point.draw(context);
      n = random.noise2D(point.ix + frame * params.speed, point.iy, freq, amp);
      point.x = point.ix + n;
      point.y = point.iy + n;
    });

    let lastx, lasty;
    //draw lines

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols - 1; c++) {
        const curr = points[r * cols + c + 0];
        const next = points[r * cols + c + 1];

        const mx = curr.x + (next.x - curr.x) * 0.5;
        const my = curr.y + (next.y - curr.y) * 0.5;

        // if (c === 0) context.moveTo(curr.x, curr.y);
        // else if (c === points.length - 2)
        //   context.quadraticCurveTo(curr.x, curr.y, next.x, next.y);
        // else context.quadraticCurveTo(curr.x, curr.y, mx, my);
        if (!c) {
          lastx = curr.x;
          lasty = curr.y;
        }
        context.beginPath();

        context.lineWidth = curr.lineWidth;
        context.strokeStyle = curr.color;
        context.moveTo(lastx, lasty);
        context.quadraticCurveTo(curr.x, curr.y, mx, my);
        context.stroke();

        lastx = mx;
        lasty = my;
      }
    }

    //draw point
    points.forEach((point) => {
      // point.draw(context);
    });
    context.restore();
  };
};

//control Panel

const createPane = () => {
  const pane = new tweakPane.Pane();

  let folder;
  folder = pane.addFolder({ title: "Grid" });
  folder.addInput(params, "cols", { min: 2, max: 50, step: 1 });
  folder.addInput(params, "rows", { min: 2, max: 50, step: 1 });

  color = pane.addFolder({ title: "Color Setting" });
  color.addInput(params, "colorScheme", {
    options: {
      default: "plasma",
      electric: "electirc",
      viridis: "viridis",
    },
  });

  speed = pane.addFolder({ title: "Animation" });
  speed.addInput(params, "speed", { min: 1, max: 30, step: 0.5 });
  speed.addInput(params, "amplitude", { min: 30, max: 200, step: 1 });
  speed.addInput(params, "frequency", { min: 0.001, max: 1, step: 0.001 });
};

createPane();

canvasSketch(sketch, settings);

class Point {
  constructor({ x, y, lineWidth, color }) {
    this.x = x;
    this.y = y;
    this.lineWidth = lineWidth;
    this.color = color;
    this.ix = x;
    this.iy = y;
    // this.control= control;
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.fillStyle = "red";
    context.beginPath();
    context.arc(0, 0, 10, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }

  hitTest(x, y) {
    const dx = this.x - x;
    const dy = this.y - y;
    const dd = Math.sqrt(dx * dx + dy * dy);

    return dd < 20;
  }
}
