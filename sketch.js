points = [];
resolution = 100; // n points for each curve

function mouseClicked() {
  points.push({x: mouseX, y: mouseY});
}

function interpolate(t, p0, p1) {
  return {x: (1-t)*p0.x + t*p1.x, y: (1-t)*p0.y + t*p1.y};
}

function setup() {
  createCanvas(400, 400);
  strokeWeight(4);
  points = [
    // {x:60, y:100},
    // {x:120, y: 300},
    // {x:300, y:100},
  ]
}

function draw() {
  if (points.length < 1) return;
  clear();


  // set curve color
  stroke(237, 34, 93);
  strokeWeight(4);

  
  thecurve = bezier(points);
  
  for (i = 0; i < thecurve.length - 1; i++) {
    line(thecurve[i].x, thecurve[i].y, thecurve[i+1].x, thecurve[i+1].y)
  }
  
  stroke(0, 0, 0);
  strokeWeight(6);
  // draw points
  for (i = 0; i < points.length; i++) {
    point(points[i].x, points[i].y);
  }
}

function bezier(points) {
  thecurve = []
  start = points[0]
  for (let t = 0; t <= 1; t += 1/resolution) {
    controls = points;
    
    while (controls.length > 1) {
      aux = [];
      
      for (i = 0; i < controls.length - 1; i++) {
        aux[i] = interpolate(t, controls[i], controls[i+1]);
      }
      controls = aux;
    }
    
    thecurve.push(controls[0]);
    // print(point)
    // line(start.x, start.y, controls[0].x, controls[0].y);
    // start = controls[0];
  }
  return thecurve;
}