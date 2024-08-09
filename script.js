let playerX = 500;
let playerY = 500;
let zombieX = 0;
let zombieY = 0;
let multiplyer = 1;
let hp = 100;

window.onkeydown = function(event) {
    let key = event.key;
    if (key === "ArrowDown") {
        playerY += 50 * multiplyer;
    }
    if (key === "ArrowUp") {
        playerY -= 50 * multiplyer;
    }
    if (key === "ArrowLeft") {
        playerX -= 50 * multiplyer;
    }
    if (key === "ArrowRight") {
        playerX += 50 * multiplyer;
    }
};

function checkCollision(zombie, player) {
    let rect1 = zombie.getBoundingClientRect();
    let rect2 = player.getBoundingClientRect();
    if (rect1.right >= rect2.left &&
        rect1.left <= rect2.right &&
        rect1.bottom >= rect2.top &&
        rect1.top <= rect2.bottom) {
        return true;
    }
    return false;
}

function generateBoosts() {
    let div = document.createElement('div');
    div.id = 'speed';
    document.body.appendChild(div);
}

generateBoosts();

setInterval(() => {
    let player = document.getElementById("player");
    let zombie = document.getElementById("zombie");
    let speed = document.getElementById("speed");

    player.style.top = playerY + 'px';
    player.style.left = playerX + 'px';

    if (zombieX <= playerX) {
        zombieX += 5;
        zombie.style.left = zombieX + "px";
    }
    if (zombieY <= playerY) {
        zombieY += 5;
        zombie.style.top = zombieY + "px";
    }
    if (zombieX >= playerX) {
        zombieX -= 5;
        zombie.style.left = zombieX + "px";
    }
    if (zombieY >= playerY) {
        zombieY -= 5;
        zombie.style.top = zombieY + "px";
    }

    if (checkCollision(zombie, player)) {
        hp -= 10;
    }

    if (checkCollision(player, speed)) {
        multiplyer = 3;
        setTimeout(() => {
            multiplyer = 1;
        }, 3000);
    }

    checkDead();
}, 16);

function checkDead() {
    if (hp <= 0) {
        alert("You died");
        playerX = 1000;
        playerY = 1000;
        zombieX = 0;
        zombieY = 0;
        hp = 100;
    }
}
