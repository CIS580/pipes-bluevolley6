"use strict";

/* Classes */
const Game = require('./game');
const Pipe = require('./pipe.js');

/* Global variables */
var canvas = document.getElementById('screen');
var game = new Game(canvas, update, render);
var gameLevel = 1;
var score = 0;
var previous = 'left';
var board = [];
var gameTime = 0;
var win = new Audio();
win.src = 'Picked Coin Echo 2.wav';
var metal = new Audio();
metal.src = 'key2 pickup.wav';
var gameOver = new Audio();
gameOver.src = 'lose_sound_2-1_0.wav';
var music = new Audio();
music.src = 'happy.mp3';
music.play();
for (var i = 0; i < 10; i++) {
  board[i] = [];
}
for(var i = 0; i < 10; i++) {
  for(var j = 0; j < 12; j++) {
    board[i][j] = false;
  }
}
var background = new Image();
background.src = 'assets/background.jpg';
var placed = [];
placed.push(new Pipe({
  x: 0,
  y: Math.floor(Math.random() * 10) * 64,
  level: gameLevel
}))
placed.push(new Pipe({
  x: 704,
  y: Math.floor(Math.random() * 10) * 64,
  level: gameLevel
}))
placed[0].index = 6;
placed[1].index = 7;
board[placed[0].y/64][placed[0].x/64] = true;
board[placed[1].y/64][placed[1].x/64] = true;
placed.forEach(function(pipe){pipe.update();});
var pipes = [];
pipes.push(new Pipe({
  x:800,
  y:385,
  level: gameLevel
}))
for(var i=3; i >= 0; i--) {
  pipes.push(new Pipe({
    x: 800,
    y: 66 + 64*i,
    level: gameLevel
  }));
};
var currentx = 64;
var currenty = placed[0].y;

canvas.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    //rotate pipe tile if empty
    var x = (event.offsetY - event.offsetY % 64) / 64;
    var y = (event.offsetX - event.offsetX % 64) / 64;
    if(board[x][y] == true) {
      for(var i = 0; i < placed.length; i++) {
        if(x == (placed[i].y / 64) && y == (placed[i].x / 64)) {
          if(placed[i].state == 'Empty') {
            metal.play();
            if(placed[i].index == 3) {
              placed[i].index = 0;
            } else if(placed[i].index == 4) {
              placed[i].index = 5;
            } else if(placed[i].index == 5) {
              placed[i].index = 4;
            } else {
              placed[i].index = placed[i].index + 1;
            }
            switch(placed[i].index) {
              case 0:
                placed[i].spritesheet.src = encodeURI('assets/puzzle_pipes/bottom_left/pipe_corner_bottom_left.png');
                break;
              case 1:
                placed[i].spritesheet.src = encodeURI('assets/puzzle_pipes/top_left/pipe_corner_top_left.png');
                break;
              case 2:
                placed[i].spritesheet.src = encodeURI('assets/puzzle_pipes/top_right/pipe_corner_top_right.png');
                break;
              case 3:
                placed[i].spritesheet.src = encodeURI('assets/puzzle_pipes/bottom_right/pipe_corner_bottom_right.png');
                break;
              case 4:
                placed[i].spritesheet.src = encodeURI('assets/puzzle_pipes/horizontal/pipe_horizontal.png');
                break;
              case 5:
                placed[i].spritesheet.src = encodeURI('assets/puzzle_pipes/vertical/pipe_vertical.png');
                break;
              case 6:
                placed[i].spritesheet.src = encodeURI('assets/puzzle_pipes/pipe_start_strip11.png');
                break;
              case 7:
                placed[i].spritesheet.src = encodeURI('assets/puzzle_pipes/pipe_end.png');
                break;
              }
          }
          break;
        }
      }
    }
    return false;
}, false);

canvas.onclick = function(event) {
  event.preventDefault();
  // TODO: Place pipe tile
  if(event.offsetX > 0 && event.offsetX < 770 && event.offsetY > 0 && event.offsetY < 640) {
    if(event.button == 1 || event.which == 1) {
      var x = (event.offsetY - event.offsetY % 64) / 64;
      var y = (event.offsetX - event.offsetX % 64) / 64;
      if(board[x][y] == false) {
        pipes[0].x = event.offsetX - event.offsetX % 64;
        pipes[0].y = event.offsetY - event.offsetY % 64;
        placed.push(pipes[0]);
        metal.play();
        pipes.splice(0,1);
        pipes[0].y = 385;
        for(var i = 1; i < 4; i++) {
          pipes[i].y = pipes[i].y + 64;
        }
        pipes.push(new Pipe({
          x: 800,
          y: 66,
          level: gameLevel
        }));
        board[x][y] = true;
      }
    }
  }
}

/**
 * @function masterLoop
 * Advances the game in sync with the refresh rate of the screen
 * @param {DOMHighResTimeStamp} timestamp the current time
 */
var masterLoop = function(timestamp) {
  game.loop(timestamp);
  window.requestAnimationFrame(masterLoop);
}
masterLoop(performance.now());


/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {DOMHighResTimeStamp} elapsedTime indicates
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {
  // TODO: Advance the fluid
  gameTime += elapsedTime;
  if(gameTime > 10){
    gameTime = 0;
    if(placed[0].state == 'Empty'){
      placed[0].state = 'Fill';
      pipes.forEach(function(pipe){pipe.update();});
      placed.forEach(function(pipe){pipe.update();});
    }
    if(placed[0].water.position == 10) {
      console.log((currenty/64) + ' ' + (currentx/64));
      if(board[currenty/64][currentx/64] == true) {
        console.log('true');
        if (currentx == placed[1].x && currenty == placed[1].y) {
          //finished level
          win.play();
          gameLevel++;
          score += 100;
          placed.splice(0, placed.length);
          for(var i = 0; i < 10; i++) {
            for(var j = 0; j < 12; j++) {
              board[i][j] = false;
            }
          }
          placed.push(new Pipe({
            x: 0,
            y: Math.floor(Math.random() * 10) * 64,
            level: gameLevel
          }))
          placed.push(new Pipe({
            x: 704,
            y: Math.floor(Math.random() * 10) * 64,
            level: gameLevel
          }))
          placed[0].index = 6;
          placed[1].index = 7;
          board[placed[0].y/64][placed[0].x/64] = true;
          board[placed[0].y/64][placed[0].x/64] = true;
        } else {
          for(var i = 2; i < placed.length; i++) {
            if(currentx == placed[i].x && currenty == placed[i].y) {
              if(placed[i].state == 'Empty'){
                placed[i].state = 'Fill';
                placed[i].previous = previous;
                pipes.forEach(function(pipe){pipe.update();});
                placed.forEach(function(pipe){pipe.update();});
              } else {
                previous = placed[i].previous;
                if(placed[i].water.position == 10) {
                  if(previous == 'left') {
                    if((currentx + 64) > 704) {
                      game.over = true;
                    } else {
                      currentx += 64;
                    }
                  } else if(previous == 'right') {
                    if((currentx - 64) < 0) {
                      game.over = true;
                    } else {
                      currentx -= 64;
                    }
                  } else if(previous == 'top') {
                    if((currenty + 64) > 576) {
                      game.over = true;
                    } else {
                      currenty += 64;
                    }
                  } else if(previous == 'bottom') {
                    if((currenty - 64) < 0) {
                      game.over = true;
                    } else {
                      currenty -= 64;
                    }
                  }
                } else if(previous == 'wrong') {
                  //wrong pipe connection
                  game.over = true;
                }
                pipes.forEach(function(pipe){pipe.update();});
                placed.forEach(function(pipe){pipe.update();});
              }
            }
          }
        }
      } else { //reached end of connected pipes
        game.over = true;
      }
    } else {
      pipes.forEach(function(pipe){pipe.update();});
      placed.forEach(function(pipe){pipe.update();});
    }
  }
}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {DOMHighResTimeStamp} elapsedTime indicates
  * the number of milliseconds passed since the last frame.
  * @param {CanvasRenderingContext2D} ctx the context to render to
  */
function render(elapsedTime, ctx) {
  ctx.fillStyle = "#777777";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // TODO: Render the board
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  pipes.forEach(function(pipe){pipe.render(ctx);});
  placed.forEach(function(pipe){pipe.render(ctx);});
  ctx.fillStyle = "black";
  ctx.font = "bold 16px Arial";
  ctx.fillText("Level: " + gameLevel, 800, 500);
  ctx.fillStyle = "black";
  ctx.font = "bold 16px Arial";
  ctx.fillText("Score: " + score, 800, 520);
  if(game.over) {
      ctx.fillStyle = "red";
      ctx.font = "bold 32px Arial";
      ctx.fillText("Game Over", 768/2 - 90, 640/2);
      music.pause();
      gameOver.play();
  }
}
