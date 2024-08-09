let playerX = 500;
let playerY = 500;
let zombieX = 0;
let zombieY = 0;
let speed = 5; // Adjust speed for smoother movement
let zombieSpeed = 2; // Speed of the zombie
let keys = { w: false, a: false, s: false, d: false, ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

// Function to update the player's position
function updatePlayerPosition() {
    if (keys.w || keys.ArrowUp) {
        playerY -= speed;
    }
    if (keys.s || keys.ArrowDown) {
        playerY += speed;
    }
    if (keys.a || keys.ArrowLeft) {
        playerX -= speed;
    }
    if (keys.d || keys.ArrowRight) {
        playerX += speed;
    }
    let player = document.getElementById("player");
    if (player) {
        player.style.left = playerX + "px";
        player.style.top = playerY + "px";
    }
}

// Function to update the zombie's position
function updateZombiePosition() {
    if (zombieX < playerX) {
        zombieX += zombieSpeed;
    } else if (zombieX > playerX) {
        zombieX -= zombieSpeed;
    }
    if (zombieY < playerY) {
        zombieY += zombieSpeed;
    } else if (zombieY > playerY) {
        zombieY -= zombieSpeed;
    }
    let zombie = document.getElementById("zombie");
    if (zombie) {
        zombie.style.left = zombieX + "px";
        zombie.style.top = zombieY + "px";
    }
}

// Game loop
function gameLoop() {
    updatePlayerPosition();
    updateZombiePosition();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);

window.addEventListener('keydown', (e) => {
    if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = true;
    }
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
    // Implement additional logic if needed
}, 1000);
