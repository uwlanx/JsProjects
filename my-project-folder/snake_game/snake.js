const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');

// create the unit
const box = 32;

// load images

const ground = new Image();
ground.src = "img/snakeBackg.jpg";

const foodImg = new Image();
foodImg.src = "img/Red_apple.png";

// load audio files
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/snakeFood.mp3"
eat.src = "audio/snakeatt.mp3"
up.src = "audio/snakeWalk.mp3"
left.src = "audio/snakeWalk.mp3"
right.src = "audio/snakeWalk.mp3"
down.src = "audio/snakeWalk.mp3"
// create the snake

let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
}
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// create the score var

let score = 0

// control the snake 

let d;
document.addEventListener("keydown", direction);

function direction(event){
    let key = event.keyCode
    if(key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    } else if(key == 38 && d != "DOWN"){
        up.play();
        d = "UP";
    } else if(key == 39 && d != "LEFT"){
        right.play();
        d = "RIGHT";
    } else if(key == 40 && d != "up"){
        down.play();
        d = "DOWN";
    }
}
// check collision function
function collision(head, array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true
        }
    } 
    return false;
}

// the function that draw everything to the canvas

function draw(){
    ctx.drawImage(ground, 0, 0);
    let i;
    for(i = 0; i < snake.length; i++){
    ctx.fillStyle = (i == 0)? "yellow" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.drawImage(foodImg, food.x, food.y);
    
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    
    // which direction
    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    // increament the snake size when it eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    } else {
        //remove the tail
        snake.pop();
    }
    // add new head

    let newHead = {
        x : snakeX,
        y : snakeY
    }
    // game over 
    if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box
        || snakeY > 17 * box || collision(newHead, snake)){
            clearInterval(game);
            dead.play();
        }
     

    snake.unshift(newHead)

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2*box, 1.6*box);
}
// call draw function every 100 mille second

let game = setInterval(draw, 100);