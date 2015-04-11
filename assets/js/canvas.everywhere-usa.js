var CanvasEverywhereUsa = function () {
  'use strict';

  var canvas,
      context;

  var CANVAS_HEIGHT = 500,
      CANVAS_WIDTH = 9000,
      BOTTOM_CURB = 10,
      TOP_CURB = 80,
      BUILDING_SPACING = 50,
      SCROLL_DISTANCE = 2,
      BOUNCE_HEIGHT = 1;

  this.init = function () {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    game.loadWorld();
    setInterval(function () {game.loop();}, 100);
  };

  var game = {

    frame : 0,
    count : 0,
    
    world : {

      street : {
        
        length : 300,
        depth : 300,
        startX : 0,
        startY : 0,
      
        drawCurb : function (pos) {

          if(pos === TOP_CURB) {
            context.lineWidth = 1;
          }
          else {
            context.lineWidth = 2;
          }

          context.beginPath();
          context.moveTo(0, CANVAS_HEIGHT - pos);
          context.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT - pos);
          context.strokeStyle = '#222222';
          context.stroke();
          context.closePath();
        },

        drawDashedLine : function () {

          var i = 0;

          while(i < CANVAS_WIDTH) {

            if(i % 40 === 0) {
              context.beginPath();
              context.moveTo(i, CANVAS_HEIGHT - 55);
              context.lineTo(i + 20, CANVAS_HEIGHT - 55);
              context.strokeStyle = '#222222';
              context.stroke();
              context.closePath();
            }

            i += 20;
          }
        }
      },
      
      building : {
        
        heights : [50, 75, 100, 125, 150, 175, 200],
        widths : [50, 75, 100, 125, 150, 175, 200],
        heightIndex : 0,
        widthIndex : 0,
        top : 0,
        depth : 0,
        
        draw : function (start) {
          this.hIndex = this.setIndex();
          this.wIndex = this.setIndex();
          this.top = CANVAS_HEIGHT - TOP_CURB - this.heights[this.hIndex];
          this.depth = Math.floor(this.heights[this.hIndex] / 3);

          context.lineWidth = 2;
          context.beginPath();

          /* Left Side */
          context.moveTo(start, CANVAS_HEIGHT - TOP_CURB);
          context.lineTo(start, this.top);

          /* Top Side */
          context.moveTo(start, this.top);
          context.lineTo(start + this.widths[this.wIndex], this.top);

          /* Top-left Side */
          context.moveTo(start, this.top);
          context.lineTo(start + this.depth * Math.sin(Math.PI / 4), 
                         CANVAS_HEIGHT - TOP_CURB - this.depth - this.heights[this.hIndex]); 

          /* Top-back Side */
          context.moveTo(start + (this.depth * Math.sin(Math.PI / 4)), 
                         CANVAS_HEIGHT - TOP_CURB - this.depth - this.heights[this.hIndex]); 
          context.lineTo(start + (this.depth * Math.sin(Math.PI / 4)) + this.widths[this.wIndex],
                         CANVAS_HEIGHT - TOP_CURB - this.depth - this.heights[this.hIndex]);

          /* Top-right Side */
          context.moveTo(start + (this.depth * Math.sin(Math.PI / 4)) + this.widths[this.wIndex],
                         CANVAS_HEIGHT - TOP_CURB - this.depth - this.heights[this.hIndex]);
          context.lineTo(start + this.widths[this.wIndex],
                         CANVAS_HEIGHT - TOP_CURB - this.heights[this.hIndex]);
          
          /* Back-right Side */
          context.moveTo(start + (this.depth * Math.sin(Math.PI / 4)) + this.widths[this.wIndex],
                         CANVAS_HEIGHT - TOP_CURB - this.depth - this.heights[this.hIndex]);
          context.lineTo(start + (this.depth * Math.sin(Math.PI / 4)) + this.widths[this.wIndex],
                         CANVAS_HEIGHT - TOP_CURB - this.depth);
          
          /* Bottom-right Side */
          context.lineTo(start + this.widths[this.wIndex], CANVAS_HEIGHT - TOP_CURB);

          /* Bottom */
          context.lineTo(start, CANVAS_HEIGHT - TOP_CURB);

          /* Right Side */
          context.moveTo(start + this.widths[this.wIndex], this.top);
          context.lineTo(start + this.widths[this.wIndex], CANVAS_HEIGHT - TOP_CURB);

          context.strokeStyle = '#222222';
          context.stroke();
          context.closePath();

          return this.widths[this.wIndex];
        },

        setIndex : function () {
          return Math.floor(Math.random() * 7);
        }

      },
      
      car : {
        startX : 400,
        startY : CANVAS_HEIGHT - (BOTTOM_CURB * 2),
        bumperHeight : 15,
        trunkWidth : 40,
        width : 30,
        wheelRadius : 5,
        
        draw : function (mode, bump, x) {

          this.startY -= bump;
          this.startX += x;

          context.beginPath();    
          context.moveTo(this.startX, this.startY);

          /* Rear bumper */
          context.lineTo(this.startX, this.startY - this.bumperHeight);

          /* Trunk */
          context.lineTo(this.startX + this.trunkWidth, this.startY - this.bumperHeight);

          /* Rear windshield */
          context.lineTo(this.startX + this.trunkWidth, this.startY - this.bumperHeight * 2);

          /* Roof */
          context.lineTo(this.startX + this.trunkWidth + this.width, 
                         this.startY - this.bumperHeight * 2);

          /* Front */
          context.lineTo(this.startX + this.trunkWidth + this.width, this.startY);

          /* Under Side */
          context.lineTo(this.startX, this.startY);
          
          if(mode === 'erase') {
            context.strokeStyle = '#ffffff';
          }
          else {
            context.strokeStyle = '#222222';
          }

          context.stroke();
          context.closePath();
          context.beginPath();

          /* Left Wheel */
          context.arc(this.startX + this.trunkWidth / 2, this.startY, this.wheelRadius, 0, 
                      2 * Math.PI, false);
          context.arc(this.startX + (this.trunkWidth / 1.5) + this.width, this.startY, 
                      this.wheelRadius, 0, 2 * Math.PI, false);
          
          if(mode === 'erase') {
            context.fillStyle = '#ffffff';
            context.strokeStyle = '#ffffff';
          }
          else {
            context.strokeStyle = '#222222';
            context.fillStyle = '#222222';
          }

          context.fill();
          context.stroke();
          context.closePath();
        }

      },
      
      /* game.world methods */
      drawStreet : function () {
        this.street.drawCurb(BOTTOM_CURB);
        this.street.drawCurb(TOP_CURB);
        this.street.drawDashedLine();
      },

      drawBuildings : function () {
        var startX = 20;   

        while(startX < CANVAS_WIDTH) {
          startX += this.building.draw(startX) + BUILDING_SPACING;
        }
      },

      drawCar : function (bounce) {

        if(bounce) {
          this.car.draw('erase', 0, 0);
          this.car.draw('draw', BOUNCE_HEIGHT, SCROLL_DISTANCE);
        }
        else {
          this.car.draw('erase', 0, 0);
          this.car.draw('draw', -BOUNCE_HEIGHT, SCROLL_DISTANCE);
        }
      }
    },
    
    loadWorld : function () {
      this.world.drawStreet();
      this.world.drawBuildings();
    },

    loop : function () {
      this.world.drawCar(this.frame % 2 === 0);
      document.getElementById('canvas').style.marginLeft = '-' + this.count + 'px';
      this.count += SCROLL_DISTANCE;
      
      if(this.count === 8000) {
        this.count = 0;  
        game.world.car.startX = 400;
      }

      this.frame++;
    }
  };
};

module.exports = new CanvasEverywhereUsa();
