const numEnemies = 15;
var myPlayer;
var tempEnemy;
var myEnemies = [];
var tempBullet;
var myBullets = [];
var lives = 3;

function setup() {
    createCanvas(400, 400);
    
    myPlayer = new Player();
    
    for (i=0; i<numEnemies; i++){
        tempEnemy = new Enemy();
        myEnemies.push(tempEnemy);
    }
    
}

function draw() {
    background(51);
    
    myPlayer.move(mouseX);
    myPlayer.show();
    
    //check to see if enemies collide with player
    for (i=0; i<myEnemies.length; i++) {
        if (collided(myPlayer, myEnemies[i], 20)) {
            myEnemies[i].resetPos();
            lives--;
        }
    }
    
    if (lives > 0) {
        for (i=0; i<myEnemies.length; i++) {
            myEnemies[i].move();
            myEnemies[i].show();
        }
        textSize(24);
        fill(255,255,255);
        text("Lives: ", 10, 20);
        text(lives, 80, 20);
    } else {
        textSize(50);
        fill(255,255,255);
        text("YOU LOSE!!!", 50, 80)
    }

    
    for (i=0; i<myBullets.length; i++) {
        myBullets[i].move();
        myBullets[i].show();
    }
    
    var delete_index = -1;
    
    for (i=0; i<myBullets.length; i++) {
        for (j=0; j<myEnemies.length; j++) {
            if (collided(myBullets[i], myEnemies[j], 15)) {
                myEnemies.splice(j, 1);
                delete_index = i;
            }
        }
    }
    
    //now delete the bullet 
    if (delete_index >= 0) {
        myBullets.splice(delete_index, 1);
    }
    
    if (myEnemies.length < 1) {
        textSize(50);
        fill(255,255,255);
        text("YOU WIN!!!", 50, 80)
    }

}

function mousePressed() {
    if(mouseButton == LEFT) {
        tempBullet = new Bullet(mouseX+13);
        myBullets.push(tempBullet);
        //console.log(myBullets.length);
    }
}

function collided(tempObject1, tempObject2, threshold) {
    var x_diff = width;
    var y_diff = height;
    var neg_threshold = -1 * threshold;
    
    x_diff = tempObject1.getX() - tempObject2.getX();
    y_diff = tempObject1.getY() - tempObject2.getY();
    
    if (x_diff < threshold && x_diff > neg_threshold && y_diff < threshold && y_diff > neg_threshold) {
        return true;
    } else {
        return false;
    }
}


class Player {
    constructor() {
        this.x = 0;
        this.y = height-25;
    }
    
    move(x_value){
        this.x = x_value;
    }
    
    show() {
        stroke(0,255,0);
        fill(0,255,0);
        rect(this.x, this.y, 25, 25);
    }
    
    getX() {
        return this.x;
    }
    
    getY() {
        return this.y;
    }
}

class Enemy {
    constructor() {
        this.x = random(13,width-25);
        this.y = 0;
        this.speed = random(1,2);
    }
    
    move() {
        if (this.y > height-30) {
            this.y = 0;
            this.x = random(13,width-25);
        }
        else {
            this.y = this.y + this.speed;
        }
        
    }
    
    show() {
        stroke(255);
        fill(255);
        ellipse(this.x, this.y, 25, 25);
    }
    
    getX() {
        return this.x;
    }
    
    getY() {
        return this.y;
    }
    
    resetPos() {
        this.y = 0;
        this.x = random(13,width-25);
    }
    
}

class Bullet {
    constructor(x_value) {
        this.x = x_value;
        this.y = height-40;
        this.speed = 1;
    }

    move() {
        this.y = this.y - this.speed;
    }

    show() {
        stroke(0,0,255);
        fill(0,0,255);
        rect(this.x, this.y, 5, 25);
        
    }
    
    getX() {
        return this.x;
    }
    
    getY() {
        return this.y;
    }
}
