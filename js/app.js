var renderer = PIXI.autoDetectRenderer(640,480, { backgroundColor: 0x000000, antialias: true });

document.body.appendChild(renderer.view);
requestAnimationFrame(animate);

timer.start();

function animate () {
  requestAnimationFrame(animate);

  timer.render(renderer);
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

window.onresize = resize;

