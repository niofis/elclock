var pathtr = (function () {
  var stage = new PIXI.Container();
  var graphics = new PIXI.Graphics();

  function init () {
    stage.addChild(graphics);
  }

  function render (renderer) {
    renderer.render(stage);
  }

  //init();

  new JSRB().render(function (data) {
    data.forEach(function (row, y) {
      row.forEach(function (pixel, x) {
        graphics.beginFill(pixel);
        graphics.drawRect(x,y,1,1);
        graphics.endFill();
      });
    });
    init();
  });

  return {
    render: render,
    stage: stage
  };
})();
