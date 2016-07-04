var renderer = PIXI.autoDetectRenderer(640,480, { backgroundColor: 0x000000, antialias: true });

var CLOCK = 0;
var TIMER = 1;

var clock_texture = PIXI.Texture.fromImage('img/clock.png');
var timer_texture = PIXI.Texture.fromImage('img/timer.png');
var state = CLOCK;

var timer_ctrl = new PIXI.Sprite(timer_texture);
var clock_ctrl = new PIXI.Sprite(clock_texture);

document.body.appendChild(renderer.view);
requestAnimationFrame(animate);

function init() {

  timer_ctrl.interactive = true;
  timer_ctrl.position.x = 540;
  timer_ctrl.position.y = 20;

  clock_ctrl.interactive = true;
  clock_ctrl.position.x = 540;
  clock_ctrl.position.y = 20;


  clock_ctrl.mouseup = timer_ctrl.mouseup = function () {
    if (state == CLOCK) {
      state = TIMER;
    } else {
      state = CLOCK;
    }
  }

  clock.stage.addChild(timer_ctrl);
  timer.stage.addChild(clock_ctrl);
  
  window.onresize = resize;
  resize();
}

function animate () {
  requestAnimationFrame(animate);

  if (state == CLOCK) {
    clock.render(renderer);
  } else {
    timer.render(renderer);
  }
}

function resize() {
  var ratio = 640/480;
  if (window.innerWidth / window.innerHeight >= ratio) {
    var w = window.innerHeight * ratio;
    var h = window.innerHeight;
  } else {
    var w = window.innerWidth;
    var h = window.innerWidth / ratio;
  }
  renderer.view.style.width = w + 'px';
  renderer.view.style.height = h + 'px';
}


init();

