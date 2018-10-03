let canvasWidth = 600;
let canvasHeight = 400;

let player = new Player();
let cpu = new Computer();
let ball = new Ball();


function setup() {
    createCanvas(canvasWidth, canvasHeight);
    frameRate(60);
}


function draw() {
    background(51);

    //udpate logic
    player.update();
    cpu.update();
    ball.update();

    //draw paddles and ball
    player.render();
    cpu.render();
    ball.render();
}


function Paddle(x, y) {
    this.x = x;
    this.y = y;
    this.width = 15;
    this.height = 80;

    this.render = function() {
        fill(255);
        rect(this.x, this.y, this.width, this.height);
    }

    this.updatePosition = function(x, y) {
        this.x = x;
        this.y = y;
    }

    this.isInBounds = function(x, y) {
        //check x bounds 
        if(x >= this.x && x <= this.x + this.width) {
            //check y bounds 
            if(y >= this.y && y <= this.y + this.height) {
                return true;
            }
        }

        //not inside
        return false;
    }
}

function Player() {
    this.paddle = new Paddle(0, 0);
    this.speed = 3;
    this.x = 20;
    this.y = (canvasHeight / 2) - (this.paddle.height / 2);
    this.score = 0;

    this.update = function() {

       if(keyIsDown(UP_ARROW)) {
            this.y -= this.speed;
       }

       if(keyIsDown(DOWN_ARROW)) {
           this.y += this.speed;
       }

       //check for screen bounds
       if(this.y < 0) {
           this.y = 0;
       }else if(this.y + this.paddle.height > canvasHeight) {
           this.y = canvasHeight - this.paddle.height;
       }

        //udpate paddle position
        this.paddle.updatePosition(this.x, this.y);
    }

    this.render = function() {
        fill(255);
        textSize(40);
        text(this.score.toString(), (canvasWidth / 2) - 50, 40);
        this.paddle.render();
    }
}

function Computer() {
    this.paddle = new Paddle(0, 0);
    this.x = canvasWidth - this.paddle.width - 20;
    this.y = (canvasHeight / 2) - (this.paddle.height / 2);
    this.speed = 3;
    this.score = 0;

    this.update = function() {

        //update position
        if(ball.y > this.y + (this.paddle.height / 2)) {
            this.y += this.speed;
        }else if(ball.y < this.y + (this.paddle.height / 2)) {
            this.y -= this.speed;
        }



        //check for screen bounds
        if(this.y < 0) {
            this.y = 0;
        }else if(this.y + this.paddle.height > canvasHeight) {
            this.y = canvasHeight - this.paddle.height;
        }

        //udpate paddle position
        this.paddle.updatePosition(this.x, this.y);
    }

    this.render = function() {
        fill(255);
        textSize(40);
        text(this.score.toString(), (canvasWidth / 2) + 30, 40);
        this.paddle.render();
    }

}

function Ball() {

    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
    this.xVel = 2;
    this.yVel = 2;
    this.radius = 7;

    this.update = function() {
        this.x += this.xVel;
        this.y += this.yVel;

        //check if hit ceiling
        if(this.y - this.radius < 0) {
            this.y = this.radius;
            this.yVel *= -1;
        }else if(this.y + this.radius > canvasHeight) {
            this.y = canvasHeight - this.radius;
            this.yVel *= -1;
        }

        //check if goal 
        if(this.x - this.radius < 0) {
            cpu.score++;
            this.reset();
        }else if(this.x + this.radius > canvasWidth) {
            player.score++;
            this.reset();
        }

        //check for paddle hits
        if(player.paddle.isInBounds(this.x - this.radius, this.y)) {
            this.xVel *= -1;
        }else if(cpu.paddle.isInBounds(this.x + this.radius, this.y)) {
            this.xVel *= -1;
        }

    }

    this.reset = function() {
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
    }

    this.render = function() {
        ellipseMode(RADIUS);
        fill(255);
        ellipse(this.x, this.y, this.radius, this.radius);
    }
}


