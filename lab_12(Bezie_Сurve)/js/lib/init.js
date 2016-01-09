var CANVAS_WIDTH = document.getElementsByTagName('canvas')[0].width;
var CANVAS_HEIGHT = document.getElementsByTagName('canvas')[0].height;

var canvas;
var ctx;

canvas = document.getElementsByTagName('canvas')[0];
ctx = canvas.getContext('2d');

CANVAS_WIDTH = canvas.width;
CANVAS_HEIGHT = canvas.height;

ctx.width = CANVAS_WIDTH;
ctx.height = CANVAS_HEIGHT;








