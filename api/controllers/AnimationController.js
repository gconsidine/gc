var AnimationController = function () {
  'use strict'; 

  this.everywhereUsa = function (req, res) {
    return res.view('everywhere-usa.jade', { title: 'Everywhere, USA' });
  };

  this.forestMoon = function (req, res) {
    return res.view('forest-moon.jade', { title: 'Forest Moon' });
  };

  this.squaresAndTriangles = function (req, res) {
    return res.view('squares-and-triangles.jade', { title: 'Squares and Triangles' });
  };
};

module.exports = new AnimationController();
