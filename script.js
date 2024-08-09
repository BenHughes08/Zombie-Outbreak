let playerX = 500;
let playerY = 500;
let speed = 300; // Pixels per second
let keys = { w: false, a: false, s: false, d: false, ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
let lastTime = 0;

// Function to update the player's position
function updatePlayerPosition(deltaTime) {
    const moveSpeed = speed * (deltaTime / 1000); // Speed in pixels per frame

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

// Game loop
function gameLoop(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    updatePlayerPosition(deltaTime);
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
    let player = document.getElementById("player");
    let zombie = document.getElementById("zombie");
    let speedElement = document.getElementById("speed");
    // Implement additional logic if needed
}, 1000);
