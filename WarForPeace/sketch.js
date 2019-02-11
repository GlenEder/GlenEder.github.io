let canvasWidth = 600;
let canvasHeight = 500;
let tileSize = 50;
let text_offset = tileSize / 4;
let whosTurn = 1;
var player1Color;
var player2Color;
var highlight;
var homeTile;   //tile that is showing possible moves
var numTurns = 0;
let totalMoves = 0;




//create tiles array
let tiles = new Array(canvasWidth / tileSize);
for(var i = 0; i < tiles.length; i++) {
    tiles[i] = new Array(canvasHeight / tileSize);
}

function Tile(x, y, color) {
    this.x_pos = x;
    this.y_pos = y;
    this.size = tileSize;
    this.color = color;
    this.ogColor = color;
    this.numUnits = 0;
    this.owner = 0;
    this.isHighlighted = false;
    

    this.render = function() {
        if(this.isHighlighted) {
            this.color = highlight;
        }else {
            this.color = this.ogColor;
        }
        fill(this.color);
        rect(this.x_pos * tileSize, this.y_pos * tileSize, tileSize, tileSize);

        //draw num of units on tile 
        if(this.numUnits > 0) {
            fill(255);
            textSize(12);
            text(this.numUnits, x * tileSize + 1, y * tileSize + text_offset);
        }
        
    };

    this.setColor = function(color) {
        this.color = color;
    };

    this.resetColor = function() {
        this.color = this.ogColor;
    };

    this.getNumUnits = function() {
        return this.numUnits;
    };

    this.setHighlighted = function(highlighted) {
        this.isHighlighted = highlighted;
    };

    
}



function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(51);
    player1Color = color("blue");
    player2Color = color("red");
    highlight = color(225, 205, 0);
    

    //create tiles
    for(var i = 0; i < tiles.length; i++) {
        for(var j = 0; j < tiles[i].length; j++) {
            tiles[i][j] = new Tile(i, j, color(51));
        }
    }

    
    //pick random tiles for both players
    let randp1x = floor(random(canvasWidth / tileSize));
    let randp1y = floor(random(canvasHeight / tileSize));
    
    let randp2x = 0;
    let randp2y = 0;
    do {
        randp2x = floor(random(canvasWidth / tileSize));
        randp2y = floor(random(canvasHeight / tileSize));
    }while(randp1x == randp2x || randp1y == randp2y);

    tiles[randp1x][randp1y].owner = 1;
    tiles[randp1x][randp1y].ogColor = player1Color;
    tiles[randp1x][randp1y].numUnits = 5;
    tiles[randp2x][randp2y].owner = 2;
    tiles[randp2x][randp2y].ogColor = player2Color;
    tiles[randp2x][randp2y].numUnits = 5;

    
/*
   tiles[1][1].owner = 1;
   tiles[1][1].ogColor = player1Color;
   tiles[1][1].numUnits = 5;
   tiles[2][2].owner = 2;
   tiles[2][2].ogColor = player2Color;
   tiles[2][2].numUnits = 5;
*/


    //set num turns
    numTurns = getTotalNumUnits(whosTurn);

    //udpate text
    document.getElementById("who_turn").innerHTML = "Player 1's Turn";
    document.getElementById("num_turns").innerHTML = "Number of moves left: " + numTurns;

     //create link back to gleneder.com
     let link = document.createElement("a");
     let text = document.createTextNode("www.gleneder.com");
     link.appendChild(text);
     link.href = "https://www.gleneder.com/#";
     document.body.appendChild(link);
}

function draw() {
    //clear screen
    stroke(0);
    rect(0, 0, canvasWidth, canvasHeight);


    //draw playing grid and reset color from previous highlight
    for(var i = 0; i < tiles.length; i++) {
        for(var j = 0; j < tiles[i].length; j++) {
            tiles[i][j].render();
        }
    }

    //check if player one has units left
    if(getTotalNumUnits(1) < 1) {
        //game over for player one
        gameOver(2);
    }else if(getTotalNumUnits(2) < 1) {
        //game over for player two
        gameOver(1);
    } 

}


function gameOver(winner) {
    //udpate text
    document.getElementById("who_turn").innerHTML = "Player " + winner + " Wins!";
    document.getElementById("num_turns").innerHTML = "Total Moves: " + totalMoves;
}

function mousePressed() {
    let tileX = floor(mouseX / tileSize);
    let tileY = floor(mouseY / tileSize);

    let clickedTile = getTileAt(tileX, tileY);
    

    if(clickedTile.isHighlighted) {
        //move unit to tile
        if(homeTile.getNumUnits() > 0) {
            totalMoves++;
            clickedTile.numUnits++;
            clickedTile.owner = whosTurn;
            if(whosTurn == 1) {
                clickedTile.ogColor = player1Color;
            }else {
                clickedTile.ogColor = player2Color;
            }
        
        

            //remove unit from previous tile
            homeTile.numUnits--;

            //set turn to next player if num turns if exceeded
            numTurns--;
            if(numTurns < 1) {
                if(whosTurn == 1) {
                    whosTurn = 2;
                }else {
                    whosTurn = 1;
                }

                //reset num turns 
                numTurns = getTotalNumUnits(whosTurn);

                //remove highlights 
                removeHighlights();

                //udpate text
                document.getElementById("who_turn").innerHTML = "Player " + whosTurn + "'s turn";
                document.getElementById("num_turns").innerHTML = "Number of moves left: " + numTurns;
            }else {
                //udpate text
                document.getElementById("num_turns").innerHTML = "Number of moves left: " + numTurns;
            }

        }

    }else if(clickedTile != -1 && clickedTile.owner == whosTurn) {
        //clear previous hightlights 
        removeHighlights();

        //show moves possible
        showPossibleMoves(clickedTile, 1);

        //update homeTile
        homeTile = clickedTile;
    
    
    }else {
        removeHighlights();
    }
}

function isPossibleMove(tile, units) {

    //check if num units is greater than zero
    if(units < 1) {
        return false;
    }

    //check if tile is valid
    if(tile != -1) {
        //check if can be over taken
        if(tile.getNumUnits() < units) return true;

         //if tile is owned by player return true
        if(tile.owner == whosTurn) return true;
    }

   

    return false;
}

function getTileFromOffset(tile, x_offset, y_offset) {
    let x = tile.x_pos + x_offset;
    let y = tile.y_pos + y_offset;


    return getTileAt(x, y);
}


function getTileAt(x, y) {
    //check bounds
    if(x >= 0 && x < canvasWidth / tileSize) {
        if(y >= 0 && y < canvasHeight / tileSize) {
            return tiles[x][y];
        }
    }

    //return error if out of range
    return -1;
}

function removeHighlights() {
    for(var i = 0; i < tiles.length; i++) {
        for(var j = 0; j < tiles[i].length; j++) {
            tiles[i][j].setHighlighted(false);
        }
    }
}

function showPossibleMoves(centerTile, owner) {

    if(isPossibleMove(getTileFromOffset(centerTile, 1, 0), centerTile.getNumUnits())) {
        getTileFromOffset(centerTile, 1, 0).setHighlighted(true);
    }

    if(isPossibleMove(getTileFromOffset(centerTile, -1, 0), centerTile.getNumUnits())) {
        getTileFromOffset(centerTile, -1, 0).setHighlighted(true);
    }

    if(isPossibleMove(getTileFromOffset(centerTile, 0, 1), centerTile.getNumUnits())) {
        getTileFromOffset(centerTile, 0, 1).setHighlighted(true);
    }

    if(isPossibleMove(getTileFromOffset(centerTile, 0, -1), centerTile.getNumUnits())) {
        getTileFromOffset(centerTile, 0, -1).setHighlighted(true);
    }

}

function getTotalNumUnits(player) {
    let total = 0;
    for(var i = 0; i < tiles.length; i++) {
        for(var j = 0; j < tiles[i].length; j++) {
            if(tiles[i][j].owner == player) {
                total += tiles[i][j].getNumUnits();
            }
        }
    }

    return total;
}