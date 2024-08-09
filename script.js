let playerX = 500;
let playerY = 500;
let multiplyer = 1;
let keys = { w: false, a: false, s: false, d: false, ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

// Function to update the player's position
function updatePlayerPosition() {
    if (keys.w || keys.ArrowUp) {
        playerY -= 50 * multiplyer;
    }
    if (keys.s || keys.ArrowDown) {
        playerY += 50 * multiplyer;
    }
    if (keys.a || keys.ArrowLeft) {
        playerX -= 50 * multiplyer;
    }
    if (keys.d || keys.ArrowRight) {
        playerX += 50 * multiplyer;
    }
    let player = document.getElementById("player");
    if (player) {
        player.style.left = playerX + "px";
        player.style.top = playerY + "px";
    }
}

window.addEventListener('keydown', (e) => {
    if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = true;
    }
    updatePlayerPosition();
});

window.addEventListener('keyup', (e) => {
    if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = false;
    }
});

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
