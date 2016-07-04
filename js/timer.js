var timer = (function () {
  var stage = new PIXI.Container();
  var hands = new PIXI.Graphics();
  var controls = new PIXI.Graphics();
  var center = {x: 320, y: 240};
  var radius = 230;
  var textStyle = {font : 'bold 24px Arial', fill:0xAAAAAA, align : 'center'};
  var text = new PIXI.Text(0, {font : 'bold 48px Arial', fill:0x0, align : 'center'});
  var elapsed = 0;
  var running = false;
  var curTime = 0;

  var stop_texture = PIXI.Texture.fromImage('img/stop.png');
  var play_texture = PIXI.Texture.fromImage('img/play.png');
  var pause_texture = PIXI.Texture.fromImage('img/pause.png');

  var leftbtn = new PIXI.Sprite(play_texture);
  var rightbtn = new PIXI.Sprite(stop_texture);

  function init () {
    drawClock();
    text.x = center.x;
    text.y = center.y + 50;
    text.anchor.x = 0.5;
    text.anchor.y = 0.5;
    stage.addChild(text);
    stage.addChild(hands);

    leftbtn.position.x = 20;
    leftbtn.position.y = 380;
    leftbtn.interactive = true;
    leftbtn.mouseup = leftbtnMU;
    stage.addChild(leftbtn);

    rightbtn.position.x = 540;
    rightbtn.position.y = 380;
    rightbtn.interactive = true;
    rightbtn.mouseup = rightbtnMU;
    stage.addChild(rightbtn);
  }

  function leftbtnMU () {
    if (running == false) {
      start()
    } else {
      pause();
    }
  }

  function rightbtnMU () {
    stop();
  }

  function render (renderer) {
    
    if (running === true) {
      var tmp = new Date().getTime();
      elapsed += tmp - curTime;
      curTime = tmp;

      leftbtn.texture = pause_texture;
    } else {
      leftbtn.texture = play_texture;
    }

    drawHands();

    text.text = Math.floor(elapsed / (1000*60));

    renderer.render(stage);
  }

  function pause () {
    running = false;
  }

  function start () {
    curTime = new Date().getTime();
    running = true;
  }

  function stop () {
    running = false;
    elapsed = 0;
  }

  function drawHands () {
    var time = new Date(elapsed);
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var millis = time.getMilliseconds();

    hands.clear();

    //seconds
    var sstep = (Math.PI * 2) / 60;
    seconds += (millis/1000);
    seconds -= 15;
    hands.lineStyle(8, 0x0, 1);
    hands.moveTo(center.x, center.y);
    hands.lineTo(Math.cos(sstep * seconds) * (radius - 45) + center.x,
                 Math.sin(sstep * seconds) * (radius - 45) + center.y);

  }



  function drawClock () {
    var clock = new PIXI.Graphics();

    clock.interactive = true;
    clock.mousedown = function (e) {
      console.log(e.data.global);
    }

    stage.addChild(clock);

    //circle and circunference
    clock.lineStyle(5, 0xAAAAAA, 1);

    clock.beginFill(0xFFFFFF);
    clock.drawCircle(center.x, center.y, radius);
    clock.endFill();

    //hands circle
    clock.drawCircle(center.x, center.y, 2);

    //Hours lines
    clock.lineStyle(5, 0xAAAAAA, 1);


    var step = (Math.PI * 2) / 12;
    var current = step * 9;
    for(var i = 1; i <= 12; ++i) {
      var sx = Math.cos(current) * radius + center.x;
      var sy = Math.sin(current) * radius + center.y;
      var dx = Math.cos(current) * (radius - 20) + center.x;
      var dy = Math.sin(current) * (radius - 20) + center.y;
      clock.moveTo(sx, sy);
      clock.lineTo(dx, dy);
      current += step;

      var number = new PIXI.Text((i % 12) * 5, textStyle);
      number.x = Math.cos(current) * (radius - 30) + center.x;
      number.y = Math.sin(current) * (radius - 30) + center.y;
      number.anchor.x = 0.5;
      number.anchor.y = 0.5;
      stage.addChild(number);
    }

    //Minutes lines

    step = (Math.PI * 2) / 60;
    current = 0;
    for(var i = 0; i < 60; ++i) {
      var sx = Math.cos(current) * radius + center.x;
      var sy = Math.sin(current) * radius + center.y;
      var dx = Math.cos(current) * (radius - 10) + center.x;
      var dy = Math.sin(current) * (radius - 10) + center.y;
      clock.moveTo(sx, sy);
      clock.lineTo(dx, dy);
      current += step;
    }
  }


  init();

  return {
    render: render,
    start: start,
    stop: stop,
    pause: pause,
    stage: stage
  };
})();
