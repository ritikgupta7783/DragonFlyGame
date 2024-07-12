let score = 0;
let cross = true;

document.onkeydown = function(e) {
    console.log("Key Code is: ", e.keyCode);

    var dino = document.querySelector('.dino');
    var dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));

    if (e.keyCode == 38) { // Up arrow key
        dino.classList.add('animateDino');
        setTimeout(function() {
            dino.classList.remove('animateDino');
        }, 700);
    }

    if (e.keyCode == 39) { // Right arrow key
        dino.style.left = dinoX + 20 + "px"; // Adjust movement increment as needed
    }

    if (e.keyCode == 37) { // Left arrow key
        dino.style.left = dinoX - 20 + "px"; // Adjust movement increment as needed
    }
};

setInterval(function() {
    var dino = document.querySelector('.dino');
    var gameOver = document.querySelector(".gameOver");
    var obstacle = document.querySelector(".obstacle");
    var scoreCount = document.querySelector('#scoreCount'); // Ensure this element exists

    var dinoRect = dino.getBoundingClientRect();
    var obstacleRect = obstacle.getBoundingClientRect();

    // Check for collision using bounding rectangles
    if (
        dinoRect.bottom > obstacleRect.top &&
        dinoRect.top < obstacleRect.bottom &&
        dinoRect.right > obstacleRect.left &&
        dinoRect.left < obstacleRect.right
    ) {
        // Collision detected
        gameOver.style.visibility = 'visible';
        obstacle.classList.remove('obstacleAni');
    } else {
        // Calculate the distance between dino and obstacle
        let distance = obstacleRect.left - dinoRect.right;
        console.log('Distance:', distance);
        if (distance < 145 && cross) {
            score += 5;
            updateScore(score);
            cross = false;
            setTimeout(() => {
                cross = true;
            }, 1000);
        }
    }
}, 100);

function updateScore(score) {
    var scoreCount = document.querySelector('#scoreCount');
    console.log('Updating score:', score);
    scoreCount.innerHTML = "Your Score: " + score;
}

