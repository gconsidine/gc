var canvasSquaresAndTriangles = function () {
  'use strict';

  /* animation global object */
  var ani = (function () {

    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        leftSquare,
        rightSquare;

    var CANVAS_HEIGHT = 500,
        CANVAS_WIDTH = 750;

    var square = function (padX, padY) {
      
      var LENGTH = 200,
          PAD_X = padX,
          PAD_Y = padY,
          degree = 0,
          reverse = false;

      var translate = function () {
        context.save();
        context.translate(PAD_X, PAD_Y);
        context.translate(LENGTH / 2, LENGTH / 2);
        context.rotate(degree * Math.PI / 180);
      };

      var draw = function () {

        if(degree === 360) {
          reverse = true;    
        } else if(degree === 0) {
          reverse = false; 
        }
        
        translate();

        context.beginPath();
        context.moveTo(-LENGTH/2, -LENGTH/2);
        context.lineTo(LENGTH - LENGTH/2, -LENGTH/2);
        context.lineTo(LENGTH - LENGTH/2, LENGTH - LENGTH/2);
        context.lineTo(-LENGTH/2, LENGTH - LENGTH/2);
        context.lineTo(-LENGTH/2, -LENGTH/2);
        
        context.closePath();

        if(reverse) {
          degree--;
          context.strokeStyle = '#ffffff';
        } else {
          degree++;
          context.strokeStyle = '#222222';
        }

        context.stroke();
        context.restore();
      };

      return {
        draw : draw
      };

    };

    var triangle = (function () {
      var LENGTH = 200,
          PAD_X = CANVAS_WIDTH/2 - LENGTH/2,
          PAD_Y = CANVAS_HEIGHT/2 - LENGTH/2,
          degree = 0,
          reverse = false;
      
      var translate = function () {
        context.save();
        context.translate(PAD_X, PAD_Y);
        context.translate(LENGTH / 2, LENGTH / 2);
        context.rotate(degree * Math.PI / 180);
      };
      
      var draw = function () {

        if(degree === 360) {
          reverse = true;    
        } else if(degree === 0) {
          reverse = false; 
        }       
        
        translate();

        context.beginPath();
        context.moveTo(0, -LENGTH / 2);
        context.lineTo(LENGTH/2, LENGTH);
        context.lineTo(-LENGTH/2, LENGTH);
        context.lineTo(0, -LENGTH/2);
        
        context.closePath();

        if(reverse) {
          degree--;
          context.strokeStyle = '#ffffff';
        } else {
          degree++;
          context.strokeStyle = '#222222';
        }

        context.stroke();
        context.restore();
      };

      return {
        draw : draw
      };
     
    })();

    leftSquare = new square(CANVAS_WIDTH/3 - 150, 150);
    rightSquare = new square((CANVAS_WIDTH * 2)/3 - 50, 150);

    var draw = function () {
      leftSquare.draw(); 
      triangle.draw();
      rightSquare.draw();
    };

    /* public members */
    return {
      draw : draw
    };
  })();

  function init() {
    setInterval(ani.draw, 250);
  }

  return {
    init: init
  };
};

module.exports = canvasSquaresAndTriangles;
