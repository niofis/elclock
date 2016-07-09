var photos = (function () {
  var stage;
  var front
  var images;
  var current;
  var time;
  var swap;
  
  var NORMAL = 0;
  var FADEOUT = 1;
  var FADEIN = 2;
  var WAITING = 3;
  var state = NORMAL;

  var sprite;

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function init () {

    stage = new PIXI.Container();
    sprite = new PIXI.Sprite.fromImage('img/blank.png');
    stage.addChild(sprite);

    //images = [{"url":"http://www.hdwallpapers.org/walls/google-abstract-HD.jpg","width":1920,"height":1080},{"url":"http://icanbecreative.com/res/AbstractBg/green_abstract-wide.jpg","width":1920,"height":1200},{"url":"http://www.hdwallpapers.in/walls/colorful_swings_abstract-HD.jpg","width":1920,"height":1080},{"url":"http://3.bp.blogspot.com/-XT-Y3vw9Udk/UVlI9jpVo5I/AAAAAAAAE5k/AEbPnXOrvS4/s1600/Abstract+Wallpaper+(43).jpg","width":1600,"height":1200},{"url":"http://www.psdgraphics.com/file/abstract-motion.jpg","width":5000,"height":3750},{"url":"http://img.wallpaperlist.com/uploads/wallpaper/files/per/perfect-purple-abstract-triangle-wallpaper-54c299fe8e70a.jpg","width":1920,"height":1200},{"url":"http://images5.fanpop.com/image/photos/31100000/Abstract-abstract-art-3D-_-31141956-1600-1200.gif","width":1600,"height":1200},{"url":"http://fc02.deviantart.net/fs71/f/2014/076/b/a/abstract_wallpaper_1080p_by_supersaejang-d7ajj1p.png","width":1920,"height":1080},{"url":"http://www.webdesignhot.com/wp-content/uploads/2014/03/Abstract-Geometric-Shapes-Colorful-Background-Vector-Illustration.jpg","width":736,"height":734},{"url":"http://www.wallpapers10.net/wp-content/uploads/images/wallpapers10.net-abstract-31.jpg","width":1920,"height":1200}];

    current = 0;
    time = new Date().getTime();
    swap = false;

    
    $.ajax({
      url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search',
      data: {
        q: 'hubble wallpapers OR abstract OR abstract art OR fractal OR nature wallpapers',
        count: 150,
        offset: 0,
        mkt:'en-us',
        safeSearch: 'Strict'
      },
      headers: {'Ocp-Apim-Subscription-Key': '1e68fcb592ed43dcbee0a7a2a442c46c' }
    }).done(function (results) {
      
      images = results.value.map(function (r) {
        return {
          url: r.contentUrl,
          width: r.width,
          height: r.height
        };
      });

      changeImage();
    });
    
   //changeImage();
  }

  function changeImage () {
    current = getRandomInt(0, images.length);
    
    var img = images[current];

    var loader = new PIXI.loaders.Loader();
    loader.add('image', img.url);
    loader.once('complete', function (e) {
      
      sprite.texture = e.resources.image.texture;

      ratio = Math.min(640/img.width,
                       480/img.height);
                       sprite.scale.x = ratio;
                       sprite.scale.y = ratio;
                       sprite.x = (640 - img.width*ratio) / 2;
                       sprite.y = (480 - img.height*ratio) / 2;

      state = FADEIN;
      time = new Date().getTime();

    });
    loader.load();
  }

  function render (renderer) {
    update();
    renderer.render(stage);
  }

  function update () {
    var now = new Date().getTime();
    if (now - time > 1000 * 10) {
      time = now;
      state = FADEOUT;
    }
      
    var dif = (now - time) / 1000;

    if (state == FADEOUT) {
      if (dif >= 0 && dif < 1) {
        sprite.alpha = 1 - dif;
      } else if (dif >=1) {
        changeImage();
        state = WAITING;
      }
    } else if(state == FADEIN) {
      sprite.alpha = dif;
      if (dif >=1) {
        state = NORMAL;
      }
    } else if(state == NORMAL) {
      sprite.alpha = 1;
    }
  }

  init();

  return {
    render: render,
    stage: stage
  };
})();
