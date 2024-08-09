let playerX = 500;
let playerY = 500;
let playerSpeed = 5; // Speed for player movement in pixels per frame
let zombieSpeed = 2; // Speed for zombie movement in pixels per frame
let keys = { w: false, a: false, s: false, d: false, ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

// Function to update the player's position
function updatePlayerPosition() {
    if (keys.w || keys.ArrowUp) {
        playerY -= playerSpeed;
    }
    if (keys.s || keys.ArrowDown) {
        playerY += playerSpeed;
    }
    if (keys.a || keys.ArrowLeft) {
        playerX -= playerSpeed;
    }
    if (keys.d || keys.ArrowRight) {
        playerX += playerSpeed;
    }

    let player = document.getElementById("player");
    if (player) {
        player.style.left = playerX + "px";
        player.style.top = playerY + "px";
    }
}

// Function to update the zombie's position
function updateZombiePosition() {
    let zombie = document.getElementById("zombie");
    if (zombie) {
        let zombieX = parseFloat(zombie.style.left) || 0;
        let zombieY = parseFloat(zombie.style.top) || 0;

        // Calculate the direction towards the player
        let dx = playerX - zombieX;
        let dy = playerY - zombieY;
        let distance = Math.sqrt(dx * dx + dy * dy);

        // Normalize the direction vector and move the zombie
        if (distance > 0) {
            dx /= distance;
            dy /= distance;
            zombieX += dx * zombieSpeed;
            zombieY += dy * zombieSpeed;
        }

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
