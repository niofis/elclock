var pathtr = (function () {
  var stage = new PIXI.Container();
  var graphics = new PIXI.Graphics();
  var sections = [];
    var working = false;

  function init () {
    graphics.scale.x = 2;
    graphics.scale.y = 2;
    stage.addChild(graphics);
    createSections();
  }

  function start () {
    working = true;
    
    for(var i = 0; i < 4; ++i) {
      (function () {
        var worker = new Worker('js/jsrb.js');
        
        worker.onmessage = function (res) {
          var data = res.data.img;
          var section = res.data.section;
          data.forEach(function (row, y) {
            row.forEach(function (pixel, x) {
              graphics.beginFill(pixel);
              graphics.drawRect(x + section.x,y + section.y,1,1);
              graphics.endFill();
            });
          });

          if (sections.length > 0) {
            var idx = Math.floor(Math.random() * sections.length);
            var section = sections.splice(idx,1)[0];
            worker.postMessage(section);
          } else {
            worker = null;
          }
        }

        worker.postMessage(sections.shift());
      })();
    }
  }

  function render (renderer) {

    if(!working) {
      start();
    }
    
    renderer.render(stage);
  }

  function createSections () {
    var width = 4;
    var height = 4;
    for(var y = 0; y < 240; y+=height) {
      for(var x = 0; x < 320; x+=width) {
        sections.push({x,y,width,height});
      }
    }
  }

  init();


  return {
    render: render,
    stage: stage
  };
})();
