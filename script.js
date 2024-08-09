let playerX = 500;
let playerY = 500;
let speed = 300; // Pixels per second
let speedBoost = 1; // Normal speed multiplier
let keys = { w: false, a: false, s: false, d: false, ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
let lastTime = 0;

// Function to update the player's position
function updatePlayerPosition(deltaTime) {
    const moveSpeed = speed * speedBoost * (deltaTime / 1000); // Speed in pixels per frame

    if (keys.w || keys.ArrowUp) {
        playerY -= moveSpeed;
    }
    if (keys.s || keys.ArrowDown) {
        playerY += moveSpeed;
    }
    if (keys.a || keys.ArrowLeft) {
        playerX -= moveSpeed;
    }
    if (keys.d || keys.ArrowRight) {
        playerX += moveSpeed;
    }

    let player = document.getElementById("player");
    if (player) {
        player.style.left = playerX + "px";
        player.style.top = playerY + "px";
    }
}

// Function to update the zombie's position
function updateZombiePosition(deltaTime) {
    let zombie = document.getElementById("zombie");
    if (zombie) {
        // Example zombie movement logic
        let zombieX = parseFloat(zombie.style.left) || 0;
        let zombieY = parseFloat(zombie.style.top) || 0;

        // Move zombie towards player
        const moveSpeed = 100 * (deltaTime / 1000); // Adjust speed as needed
        if (zombieX < playerX) {
            zombieX += moveSpeed;
        }
        if (zombieX > playerX) {
            zombieX -= moveSpeed;
        }
        if (zombieY < playerY) {
            zombieY += moveSpeed;
        }
        if (zombieY > playerY) {
            zombieY -= moveSpeed;
        }

        zombie.style.left = zombieX + "px";
        zombie.style.top = zombieY + "px";
    }
}

// Function to check for collisions
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

// Function to generate speed boosts
function generateBoosts() {
    let div = document.createElement('div');
    div.id = 'speed';
    document.body.appendChild(div);
}

generateBoosts();

// Game loop
function gameLoop(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    updatePlayerPosition(deltaTime);
    updateZombiePosition(deltaTime);

    let player = document.getElementById("player");
    let zombie = document.getElementById("zombie");
    let speedElement = document.getElementById("speed");

    if (checkCollision(zombie, player)) {
        // Handle collision, e.g., reduce health or end game
    }

    if (checkCollision(player, speedElement)) {
        speedBoost = 3; // Temporarily increase speed
        setTimeout(() => {
            speedBoost = 1; // Reset speed after 3 seconds
        }, 3000);
    }

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
