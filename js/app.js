var resolution = {width:480, height:272};
(function (resolution, clock, timer, photos, pathtr) {
  var renderer = PIXI.autoDetectRenderer(resolution.width,resolution.height, { backgroundColor: 0x000000, antialias: true });
  var background;

  var CLOCK = 0;
  var TIMER = 1;
  var PHOTOS = 2;
  var PATHTR = 3;
  var STATES = 4;
  var state;

  var arrow_texture = PIXI.Texture.fromImage('img/arrow.png');


  document.body.appendChild(renderer.view);
  requestAnimationFrame(animate);

  function createArrowBtn () {
    var arrow_ctrl = new PIXI.Sprite(arrow_texture);

    arrow_ctrl.interactive = true;
    arrow_ctrl.position.x = resolution.width - 100;
    arrow_ctrl.position.y = 20;

    arrow_ctrl.touchend = arrow_ctrl.mouseup = function () {
      state = (state + 1) % STATES;
    }

    return arrow_ctrl;
  }

  function init() {

    state = CLOCK;

    clock.stage.addChild(createArrowBtn());
    timer.stage.addChild(createArrowBtn());
    photos.stage.addChild(createArrowBtn());
    pathtr.stage.addChild(createArrowBtn());

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
      case PATHTR:
        pathtr.render(renderer);
        break;

    }
  }

  function resize() {
    var ratio = resolution.width/resolution.height;
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
})(resolution, Clock(resolution), Timer(resolution), Photos(resolution), PathTr(resolution));
