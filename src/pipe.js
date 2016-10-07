/**
 * @module exports the Pipe class
 */
module.exports = exports = Pipe;

/* Classes */
const Water = require('./water.js');

/**
 * @constructor Pipe
 * Creates a new player object
 * @param {Postition} position object specifying an x and y
 */
function Pipe(position) {
  this.x = position.x;
  this.y = position.y;
  this.width  = 64;
  this.height = 64;
  this.spritesheet  = new Image();
  this.index = Math.floor(Math.random() * 6);
  this.state = 'Empty';
  this.water;
  this.level = position.level;
  this.previous = 'left';
  switch(this.index) {
    case 0:
      this.spritesheet.src = encodeURI('assets/puzzle_pipes/bottom_left/pipe_corner_bottom_left.png');
      break;
    case 1:
      this.spritesheet.src = encodeURI('assets/puzzle_pipes/top_left/pipe_corner_top_left.png');
      break;
    case 2:
      this.spritesheet.src = encodeURI('assets/puzzle_pipes/top_right/pipe_corner_top_right.png');
      break;
    case 3:
      this.spritesheet.src = encodeURI('assets/puzzle_pipes/bottom_right/pipe_corner_bottom_right.png');
      break;
    case 4:
      this.spritesheet.src = encodeURI('assets/puzzle_pipes/horizontal/pipe_horizontal.png');
      break;
    case 5:
      this.spritesheet.src = encodeURI('assets/puzzle_pipes/vertical/pipe_vertical.png');
      break;
  }
}

/**
 * @function updates the pipe object
 */
Pipe.prototype.update = function() {
  if(this.index == 6) {
    this.spritesheet.src = encodeURI('assets/puzzle_pipes/pipe_start_strip11.png');
  } else if(this.index == 7) {
    this.spritesheet.src = encodeURI('assets/puzzle_pipes/pipe_end.png');
  }
  if (this.state == 'Fill') {
    if(this.water == null) {
      this.water = new Water({
        x: this.x,
        y: this.y,
        previous: this.previous,
        index: this.index,
        level: this.level
      })
    }
    this.water.update();
    this.previous = this.water.previous;
  }
}

/**
 * @function renders the pipe into the provided context
 * {CanvasRenderingContext2D} ctx the context to render into
 */
Pipe.prototype.render = function(ctx) {
  ctx.drawImage(
    //image
    this.spritesheet,
    //source rectangle
    0, 0, 128, 128,
    //destination rectangle
    this.x, this.y, this.width, this.height
  );
  if(this.state == 'Fill') {
    this.water.render(ctx);
  }
}
