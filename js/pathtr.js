function PathTr (resolution) {
  var stage = new PIXI.Container();
  var graphics = new PIXI.Graphics();
  var sections = [];
  var working = false;
  var text = new PIXI.Text(0, {font : 'bold 24px Arial', fill:0xAAAAAA, align : 'left'});
  var time = 0;
  var workers_count = 2;
  var render_res = {width: 480, height: 272};

  function init () {
    var ratio = render_res.width/render_res.height;
    if (resolution.width / resolution.height >= ratio) {
      var w = resolution.height * ratio;
      var h = resolution.height;
    } else {
      var w = resolution.width;
      var h = resolution.width / ratio;
    }
    graphics.scale.x = w / render_res.width;
    graphics.scale.y = h / render_res.height;
    stage.addChild(graphics);

    stage.addChild(text);

    
    createSections();
  }

  function start () {
    time = new Date().getTime();
    working = true;
    var workers_done = 0;

    function done() {
      workers_done++;
      if(workers_done >= workers_count) {
        var now = new Date().getTime();
        var secs = (now - time)/1000;
        text.text = secs + 's';
      }
    }
    
    for(var i = 0; i < workers_count; ++i) {
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
            done();
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
    var width = render_res.width;
    var height = render_res.height;
    var sw = 80;
    var sh = 80;

    for(var y = 0; y < height; y+=sh) {
      for(var x = 0; x < width; x+=sw) {
        sections.push({x:x,y:y,width:sw,height:sh});
      }
    }
  }

  init();


  return {
    render: render,
    stage: stage
  };
};
