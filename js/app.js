// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	this.x = 0;
	this.y = y;
	this.speed = Math.random()*50;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x += this.speed * dt;
    if(this.x > 500) {
        this.x = -100;
	} 
};

Enemy.prototype.increaseSpeed = function() {
	this.speed += 50;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function checkCollisions() {
    for (element in allEnemies) {
		var xDiff = allEnemies[element].x - player.x;
		var yDiff = allEnemies[element].y - player.y;
		var distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
        if (distance < 60) {
            player.resetPosition();
            player.updateScore(-100);
		}
	}
}



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	this.level = 1;
	this.score = 0;
	this.x = 200;
	this.y = 400;
	this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
	if (this.x > 400) {
        this.x = 400;
    } else if (this.x < 0) {
        this.x = 0;
    } else if (this.y > 400) {
        this.y = 400;
    } else if (this.y < 0) {
        this.y = 0;
        this.updateScore(100);
		enemy1.increaseSpeed();
		enemy2.increaseSpeed();
		enemy3.increaseSpeed();
		this.levelUp();
        this.resetPosition();
    }
	ctx.font = "30px Arial";
	ctx.clearRect(0,0,505,100);
	ctx.strokeText("Score : " + this.score,10,40);
	ctx.strokeText("Level : " + this.level,350,40);
};

Player.prototype.resetPosition = function() {
    this.x = 200;
    this.y = 400;
}

Player.prototype.updateScore = function(amount) {
	this.score += amount;
	if (this.score < 0) {
		this.score = 0;
	}
};

Player.prototype.levelUp = function() {
	this.level += 1;
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keys) {
	var distance = 50;
	console.log("123");
	if (keys == 'up') {
		this.y -= distance;
	}
	if (keys == 'down') {
		this.y += distance;
	}
	if (keys == 'left') {
		this.x -= distance;
	}
	if (keys == 'right') {
		this.x += distance;
	}
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var enemy1 = new Enemy(50);
var enemy2 = new Enemy(140);;
var enemy3 = new Enemy(220);
var allEnemies = [enemy1, enemy2, enemy3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
