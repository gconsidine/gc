var canvasForestMoon = function () {
  'use strict';

  var uni = (function () {
    var CANVAS_WIDTH = document.documentElement.clientWidth,
        CANVAS_HEIGHT = document.documentElement.clientHeight;
   
    function initialize(className) {
      var canvas = document.createElement('canvas'),
          context = canvas.getContext('2d');

      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
      canvas.className = className;
      document.getElementsByTagName('body')[0].appendChild(canvas);

      return {
        canvas : canvas,
        context : context
      };
    }

    var animate = function () {
      astral.updateAstralPlane(); 
      astral.earth.actor.updateBird();
    };

    /* -- ASTRAL -- */
    var astral = (function () {

      var ORBIT_SCALE = 0.88,
          SUN_SCALE = 0.1,
          MOON_SCALE = 0.05,
          PHASE_DAY_LIMIT = 14,
          PHASE_DISTANCE_MAX = 2 * CANVAS_HEIGHT * MOON_SCALE,
          RADIUS = CANVAS_HEIGHT * ORBIT_SCALE;

      var layer1 = initialize('astral'),
          sunRadius = CANVAS_HEIGHT * SUN_SCALE,
          moonRadius = CANVAS_HEIGHT * MOON_SCALE,
          phaseDayCount = 0,
          reversePhase = false,
          day = 0,
          degree = 0;

      layer1.context.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT);

      function drawSun(erase) {

        var deg = degree;
        
        if(erase) {
          deg = degree - 0.5;
        }

        var x = RADIUS * Math.cos(deg * Math.PI / 180),
            y = RADIUS * Math.sin(deg * Math.PI / 180);

        layer1.context.beginPath();
        layer1.context.arc(x, y, sunRadius, 0, 2 * Math.PI, false);

        if(erase) {
          layer1.context.strokeStyle = 'white';
          layer1.context.lineWidth = 7;
        } else {
          layer1.context.strokeStyle = 'black';
          layer1.context.lineWidth = 5;
        }

        layer1.context.stroke();
      }

      function drawMoon(erase) {

        var deg = degree - 180;
        
        if(erase) {
          deg = degree - 180.5;
        }

        var x = RADIUS * Math.cos(deg * Math.PI / 180),
            y = RADIUS * Math.sin(deg * Math.PI / 180);

        layer1.context.beginPath();
        layer1.context.arc(x, y, moonRadius, 0, 2 * Math.PI, false);

        if(erase) {
          layer1.context.strokeStyle = 'white';
          layer1.context.fillStyle = 'white';
          layer1.context.fill();
          layer1.context.lineWidth = 4;
        } else {
          layer1.context.strokeStyle = 'black';
          layer1.context.fillStyle = 'black';
          layer1.context.fill();
          layer1.context.lineWidth = 2;
        }
        
        layer1.context.closePath();

        if(!erase) {
          createPhasePath();
        }

        layer1.context.stroke();
      }

      function createPhasePath() {

        var deg = degree - 180,
            x = RADIUS * Math.cos(deg * Math.PI / 180),
            y = RADIUS * Math.sin(deg * Math.PI / 180),
            phaseOffset = (phaseDayCount / PHASE_DAY_LIMIT) * PHASE_DISTANCE_MAX;

        layer1.context.beginPath();
        layer1.context.arc(x + phaseOffset, y, moonRadius, 0, 2 * Math.PI, false);
        layer1.context.strokeStyle = 'white';
        layer1.context.fillStyle = 'white';
        layer1.context.fill();
        layer1.context.lineWidth = 2;
        layer1.context.closePath();
      }

      function updateAstralPlane() {

        drawSun(true);
        drawSun(false);
        drawMoon(true);
        drawMoon(false);

        degree += 0.5;
        
        if(degree >= 360) {
          degree = 0;

          if(reversePhase) {
            phaseDayCount--; 
          } else {
            phaseDayCount++; 
          }

          if(phaseDayCount >= PHASE_DAY_LIMIT) {
            reversePhase = true;
          } else if(phaseDayCount <= 0){
            reversePhase = false;
          }
          day++;
        }
      }

      /* -- EARTH -- */
      var earth = (function () {

        var VERTICAL_MAX = CANVAS_HEIGHT * 0.5,
            VERTICAL_MIN = CANVAS_HEIGHT * 0.62,
            HORIZONTAL_MIN = CANVAS_WIDTH * 0.01,
            HORIZONTAL_MAX = CANVAS_WIDTH * 0.05;

        var layer2 = initialize('earth'),
            pois = [];


        function drawHorizon() {
          
          var x = 0,
              y = 0;

          layer2.context.beginPath();
          layer2.context.fillStyle = 'white';

          y = Math.floor(Math.random() * (VERTICAL_MAX - VERTICAL_MIN) + VERTICAL_MIN);
          pois.push({x : x, y : y});
          layer2.context.moveTo(pois[pois.length - 1].x, pois[pois.length - 1].y);

          while(x < CANVAS_WIDTH) {

            x += Math.floor(Math.random() * (HORIZONTAL_MAX - HORIZONTAL_MIN) + HORIZONTAL_MIN);
            y = Math.floor(Math.random() * (VERTICAL_MAX - VERTICAL_MIN) + VERTICAL_MIN);
           
            layer2.context.lineTo(x, y);
            
            pois.push({x : x, y : y});
          }

          layer2.context.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);
          layer2.context.lineTo(0, CANVAS_HEIGHT);
          layer2.context.lineTo(pois[0].x, pois[0].y);
          
          layer2.context.lineWidth = 3;
          layer2.context.closePath();
          layer2.context.fill();
          layer2.context.stroke();
        }
        

        function drawTrees() {

          var verticalPos = 0,
              horizontalPos = 0,
              offsetXScale = 0.005,
              offsetX = 0,        // Random offset for horizontal position
              distance = 0,       // From peak to bottom
              randomSign = -1,    // To randomize the horizontal positioning of a tree
              scale = 0,          // Trees are smaller closer to the peak, and large near bottom
              sideLength = CANVAS_HEIGHT * 0.15, // Length of triangle side
              topSection = 0,                     // Sections of the tree
              middleSection = 0,
              bottomSection = 0,
              trunk = 0,
              lineWidth = 15,
              maxPeak = returnMaxPeak();

          for(var i = 0; i < pois.length; i++) {

            
            if(Math.random() > 0.5) {
              randomSign = 1;
            }

            if(i > 0) {
              offsetX = offsetXScale * randomSign * Math.floor(Math.random() * 
                        (pois[i].x - pois[i - 1].x) + pois[i - 1].x);
            }


            verticalPos = Math.floor(Math.random() * (CANVAS_HEIGHT - pois[i].y) + pois[i].y);
            horizontalPos = pois[i].x + offsetX;

            distance = CANVAS_HEIGHT - maxPeak;
            scale = ((verticalPos - maxPeak) / distance);

            topSection = sideLength * 1/3 * scale;
            middleSection = sideLength * 2/3 * scale;
            bottomSection = sideLength * scale;
            trunk = sideLength * 1/3 * scale;

            layer2.context.beginPath();

            /* Top Section */
            layer2.context.moveTo(horizontalPos, verticalPos);
            layer2.context.lineTo(horizontalPos + topSection * Math.cos(60 * Math.PI / 180), 
                                  verticalPos + topSection * Math.sin(60 * Math.PI / 180));
            layer2.context.lineTo(horizontalPos - topSection / 2, 
                                  verticalPos + topSection * Math.sin(60 * Math.PI / 180));
            layer2.context.lineTo(horizontalPos, verticalPos);

            /* Middle Section */
            layer2.context.moveTo(horizontalPos, verticalPos += middleSection * 
                                                                (Math.cos(60 * Math.PI / 180)/2));
            layer2.context.lineTo(horizontalPos + middleSection * Math.cos(60 * Math.PI / 180), 
                                  verticalPos + middleSection * Math.sin(60 * Math.PI / 180));
            layer2.context.lineTo(horizontalPos - middleSection / 2, 
                                  verticalPos + middleSection * Math.sin(60 * Math.PI / 180));
            layer2.context.lineTo(horizontalPos, verticalPos);

            /* Bottom Section  */
            layer2.context.moveTo(horizontalPos, verticalPos += bottomSection * 
                                                                (Math.cos(60 * Math.PI / 180)/2));
            layer2.context.lineTo(horizontalPos + bottomSection * Math.cos(60 * Math.PI / 180), 
                                  verticalPos + bottomSection * Math.sin(60 * Math.PI / 180));
            layer2.context.lineTo(horizontalPos - bottomSection / 2, 
                                  verticalPos + bottomSection * Math.sin(60 * Math.PI / 180));
            layer2.context.lineTo(horizontalPos, verticalPos);
            
            /* Trunk section*/
            layer2.context.moveTo(horizontalPos, verticalPos += bottomSection * 
                                                                Math.sin(60 * Math.PI / 180));
            layer2.context.lineTo(horizontalPos, verticalPos + trunk);
            layer2.context.lineWidth = lineWidth * scale;

            layer2.context.fillStyle = 'black';
            layer2.context.fill();
            layer2.context.stroke();
          }
        }
        
        function returnMaxPeak() {
          var max = pois[0].y;

          for(var i = 1; i < pois.length; i++) {
            if(pois[i].y < max) {
              max = pois[i].y;
            }
          }
          
          return max;
        }

        drawHorizon();
        drawTrees();

        /* -- ACTOR -- */
        var actor = (function () {

          var TRI_LENGTH = CANVAS_HEIGHT * 0.025;

          var layer3 = initialize('actor'),
              inFlight = false,
              x = 0,
              y = 0;
          
          function drawBird(erase) {
            var tempX = 0,
                expanded;

            layer3.context.beginPath();

            if(!erase) {

              x += 1;
              layer3.context.lineWidth = 1;
              layer3.context.strokeStyle = 'gray';
              layer3.context.moveTo(x, y);
              layer3.context.lineTo(x + TRI_LENGTH * Math.cos(30 * Math.PI / 180), 
                                    y + TRI_LENGTH * Math.sin(30 * Math.PI / 180));
              layer3.context.lineTo(x, y + TRI_LENGTH);
              layer3.context.lineTo(x, y);
              layer3.context.stroke();

              expanded = false;

            } else {
             tempX = x;
             layer3.context.clearRect(x - TRI_LENGTH * Math.cos(30 * Math.PI / 180), 
                                      y - 1, TRI_LENGTH * Math.cos(30 * Math.PI / 180), 
                                      TRI_LENGTH + 2);
            } 
          }

          function beginFlight() {
            if(!inFlight) {
              if((Math.random() * 10000) > 9997) {
                x = 0;
                y = Math.floor(Math.random() * ((CANVAS_HEIGHT / 2)));
                inFlight = true;
              }
            } else if(x > CANVAS_WIDTH) {
              inFlight = false; 
            }
          }

          function updateBird() {
            beginFlight();
            
            if(inFlight) {
              drawBird(false);
              drawBird(true);
            }
          }
          
          return {
             updateBird : updateBird
          };

        })();
        /* -- END ACTOR -- */

        return {
          actor : actor
        };

      })();
      /* -- END EARTH -- */
      
      return {
        updateAstralPlane : updateAstralPlane,
        earth : earth
      };

    })();
    /* -- END ASTRAL -- */
    
    return {
      animate : animate,
      astral : astral
    };
  })();

  function init () {
    setInterval(uni.animate, 17);  
  }

  return {
    init: init
  };
};

module.exports = canvasForestMoon;
