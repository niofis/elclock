var clock = (function () {
  var stage = new PIXI.Container();
  var hands = new PIXI.Graphics();
  var center = {x: 320, y: 240};
  var radius = 230;
  var textStyle = {font : 'bold 24px Arial', fill:0xAAAAAA, align : 'center'};

  function init () {
    drawClock();
    stage.addChild(hands);
  }

  function render (renderer) {
    update();
    renderer.render(stage);
  }

  function update () {
    drawHands();
  }

  function drawHands () {
    var time = new Date();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var millis = time.getMilliseconds();

    hands.clear();

    //hours
    var hstep = (Math.PI * 2) / 12;
    hours -= 3;
    hands.lineStyle(8, 0x0, 1);
    hands.moveTo(center.x, center.y);
    hands.lineTo(Math.cos(hstep * hours) * (radius - 85) + center.x,
                 Math.sin(hstep * hours) * (radius - 85) + center.y);

    //minutes
    var mstep = (Math.PI * 2) / 60;
    minutes -= 15;
    hands.lineStyle(4, 0x0, 1);
    hands.moveTo(center.x, center.y);
    hands.lineTo(Math.cos(mstep * minutes) * (radius - 40) + center.x,
                 Math.sin(mstep * minutes) * (radius - 40) + center.y);

    //seconds
    var sstep = (Math.PI * 2) / 60;
    seconds += (millis/1000);
    seconds -= 15;
    hands.lineStyle(2, 0x0, 1);
    hands.moveTo(center.x, center.y);
    hands.lineTo(Math.cos(sstep * seconds) * (radius - 45) + center.x,
                 Math.sin(sstep * seconds) * (radius - 45) + center.y);

  }

  function drawClock () {
    var clock = new PIXI.Graphics();

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

      var number = new PIXI.Text(i, textStyle);
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
    update: update
  };
})();
