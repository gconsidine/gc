var CanvasLogo = function () {
  'use strict';

   var container,
       canvas,
       context,
       id,
       width = 0,
       height = 0;
    
  this.init = function (containerId) {
    id = containerId;
    container = document.getElementById(id);
    height = window.getComputedStyle(container).height;
    width = height.substring(0, height.length - 2);
    height = width;

    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    context = canvas.getContext('2d');
    container.appendChild(canvas);

    this.draw();
  };

  this.draw = function () {
    var length = width * 0.3,
        x = width / 2,
        y = height / 2,
        lineWidth = width * 0.05;

    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.moveTo(x, y);

    context.lineTo(x += length, y);
    context.lineTo(x, y += length);
    context.lineTo(x += -(length * 2), y);
    context.lineTo(x, y += -(length * 2));
    context.lineTo(x += length * 2.5, y);
    context.lineTo(x, y += length * 2.5);
    context.lineTo(x += -(length * 3), y);
    context.lineTo(x, y += -(length * 3));
    context.lineTo(x += length * 3, y);

    context.lineWidth = lineWidth;
    context.lineCap = 'square';
    context.shadowColor = '#6a9859';
    context.shadowBlur = lineWidth / 2;
    context.strokeStyle = '#6b4776';
    context.stroke();
  };

};

module.exports = new CanvasLogo();
