/**
 * @module exports the Water class
 */
module.exports = exports = Water;

/**
 * @constructor Water
 * Creates a new water object
 * @param {Postition} position object specifying an x and y
 */
function Water(position) {
  this.x = position.x;
  this.y = position.y;
  this.width  = 64;
  this.height = 64;
  this.spritesheet  = new Image();
  this.position = 0;
  this.previous = position.previous;
  this.index = position.index;
  this.level = position.level/10;
  this.count = 0;
}

/**
 * @function updates the water object
 */
Water.prototype.update = function() {
  if(this.position < 10) {
    if(this.count >= (10 - this.level)) {
      this.position++;
      this.count = 0;
    } else {
      this.count++;
    }
  }
  if(this.index == 6) {
    this.spritesheet.src = encodeURI('assets/puzzle_pipes/pipe_start_strip11.png');
  } else if(this.index == 7) {
    this.spritesheet.src = encodeURI('assets/puzzle_pipes/pipe_end.png');
  } else {
    switch(this.index) {
      case 0: //bottom left
        if(this.previous == 'left') {
          this.spritesheet.src = encodeURI('assets/puzzle_pipes/bottom_left/water_corner_bottom_left_left_strip11.png');
          if(this.position == 10) {
            this.previous = 'top';
          }
        } else if(this.previous == 'bottom') {
          this.spritesheet.src = encodeURI('assets/puzzle_pipes/bottom_left/water_corner_bottom_left_bottom_strip11.png');
          if(this.position == 10) {
            this.previous = 'right';
          }
        } else {
          this.previous = 'wrong';
        }
        break;
      case 1: //top left
        if(this.previous == 'left') {
          this.spritesheet.src = encodeURI('assets/puzzle_pipes/top_left/water_corner_top_left_left_strip11.png');
          if(this.position == 10) {
            this.previous = 'bottom';
          }
        } else if(this.previous == 'top') {
          this.spritesheet.src = encodeURI('assets/puzzle_pipes/top_left/water_corner_top_left_top_strip11.png');
          if(this.position == 10) {
            this.previous = 'right';
          }
        } else {
          this.previous = 'wrong';
        }
        break;
      case 2: //top right
        if(this.previous == 'right') {
          this.spritesheet.src = encodeURI('assets/puzzle_pipes/top_right/water_corner_top_right_right_strip11.png');
          if(this.position == 10) {
            this.previous = 'bottom';
          }
        } else if(this.previous == 'top') {
          this.spritesheet.src = encodeURI('assets/puzzle_pipes/top_right/water_corner_top_right_top_strip11.png');
          if(this.position == 10) {
            this.previous = 'left';
          }
        } else {
          this.previous = 'wrong';
        }
        break;
      case 3: //bottom right
        if(this.previous == 'right') {
          this.spritesheet.src = encodeURI('assets/puzzle_pipes/bottom_right/water_corner_bottom_right_right_strip11.png');
          if(this.position == 10) {
            this.previous = 'top';
          }
        } else if(this.previous == 'bottom') {
          this.spritesheet.src = encodeURI('assets/puzzle_pipes/bottom_right/water_corner_bottom_right_bottom_strip11.png');
          if(this.position == 10) {
            this.previous = 'left';
          }
        } else {
          this.previous = 'wrong';
        }
        break;
      case 4: //horizontal
        if(this.previous == 'right') {
          this.spritesheet.src = encodeURI('assets/puzzle_pipes/horizontal/water_horizontal_right_strip11.png');
        } else if(this.previous == 'left') {
          this.spritesheet.src = encodeURI('assets/puzzle_pipes/horizontal/water_horizontal_left_strip11.png');
        } else {
          this.previous = 'wrong';
        }
        break;
      case 5: //vertical
        if(this.previous == 'top') {
          this.spritesheet.src = encodeURI('assets/puzzle_pipes/vertical/water_vertical_top_strip11.png');
        } else if(this.previous == 'bottom') {
          this.spritesheet.src = encodeURI('assets/puzzle_pipes/vertical/water_vertical_bottom_strip11.png');
        } else {
          this.previous = 'wrong';
        }
        break;
    }
  }
}

/**
 * @function renders the water into the provided context
 * {CanvasRenderingContext2D} ctx the context to render into
 */
Water.prototype.render = function(ctx) {
  ctx.drawImage(
    //image
    this.spritesheet,
    //source rectangle
    128 * this.position, 0, 128, 128,
    //destination rectangle
    this.x, this.y, this.width, this.height
  );
}
