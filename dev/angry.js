// Include the p5.js and Matter.js libraries in your HTML file
// <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js"></script>

let Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Constraint = Matter.Constraint;

let engine, world;
let ground, sling, ball;
let boxes = [];
let isDragging = false;

function setup() {
  createCanvas(800, 600);
  engine = Engine.create();
  world = engine.world;

  // Ground
  ground = Bodies.rectangle(width / 2, height - 10, width, 20, { isStatic: true });
  World.add(world, ground);

  // Ball
  ball = Bodies.circle(150, 400, 20, { restitution: 0.8 });
  World.add(world, ball);

  // Sling
  sling = Constraint.create({
    pointA: { x: 150, y: 400 },
    bodyB: ball,
    stiffness: 0.05,
    length: 50
  });
  World.add(world, sling);

  // Boxes
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3 - y; x++) {
      let box = Bodies.rectangle(500 + x * 40 - y * 20, 500 - y * 40, 40, 40);
      boxes.push(box);
      World.add(world, box);
    }
  }

  Engine.run(engine);
}

function draw() {
  background(200);

  // Draw ground
  noStroke();
  fill(100);
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width, 20);

  // Draw ball
  fill(127);
  ellipse(ball.position.x, ball.position.y, 40);

  // Draw sling
  stroke(0);
  if (sling.bodyB) {
    line(sling.pointA.x, sling.pointA.y, ball.position.x, ball.position.y);
  }

  // Draw boxes
  for (let box of boxes) {
    push();
    translate(box.position.x, box.position.y);
    rotate(box.angle);
    rectMode(CENTER);
    fill(255, 0, 0);
    rect(0, 0, 40, 40);
    pop();
  }
}

function mouseDragged() {
  if (dist(mouseX, mouseY, ball.position.x, ball.position.y) < 20) {
    Body.setPosition(ball, { x: mouseX, y: mouseY });
    isDragging = true;
  }
}

function mouseReleased() {
  if (isDragging) {
    sling.bodyB = null;
    isDragging = false;
  }
}
