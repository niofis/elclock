var renderer = PIXI.autoDetectRenderer(640,480, { backgroundColor: 0x000000, antialias: true });

var CLOCK = 0;
var TIMER = 1;
var PHOTOS = 2;
var STATES = 3;

var arrow_texture = PIXI.Texture.fromImage('img/arrow.png');
var state;

var arrow_ctrl = new PIXI.Sprite(arrow_texture);

document.body.appendChild(renderer.view);
requestAnimationFrame(animate);

function init() {

  state = CLOCK;
  renderer.clearBeforeRender = false;

  arrow_ctrl.interactive = true;
  arrow_ctrl.position.x = 540;
  arrow_ctrl.position.y = 20;

  arrow_ctrl.mouseup = function () {
    state = (state + 1) % STATES;
  }

  window.onresize = resize;
  resize();
}

function animate () {
  requestAnimationFrame(animate);

  
  switch(state) {
    case CLOCK:
      clock.render(renderer);
      break;
    case TIMER:
      timer.render(renderer);
      break;
    case PHOTOS:
      photos.render(renderer);
      break;
  }
  renderer.render(arrow_ctrl);
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

