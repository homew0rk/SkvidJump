var character = document.getElementById("character");
var block = document.getElementById("block");
var blockTop = document.getElementById("blockTop");
var bonus = document.getElementById("bonus");
var enemy = document.getElementById("enemy");
var counter = 0;
var jumpCounter = 0;
var isBottomBlock = true;

var bullets = [];

function jump() {
    if (character.classList.contains("animate")) { return; }
    character.classList.add("animate");
    jumpCounter++;

    setTimeout(function () {
        character.classList.remove("animate");
    }, 800);
}

function spawnBlock() {
    if (isBottomBlock) {
        block.style.display = "block";
        block.style.animation = "block 3s linear";

        setTimeout(function () {
            block.style.display = "none";
            isBottomBlock = false;
            spawnBlock();
        }, 3000);
    } else {
        blockTop.style.display = "block";
        blockTop.style.animation = "blockTop 3s linear";

        setTimeout(function () {
            blockTop.style.display = "none";
            isBottomBlock = true;
            spawnBlock();
        }, 3000);
    }
}


function spawnBonus() {
    bonus.style.display = "block";
    bonus.style.animation = "bonusMove 6s linear";

    setTimeout(function () {
        bonus.style.display = "none";
        setTimeout(spawnBonus, 4000);
    }, 6000);
}

function spawnEnemy() {
    enemy.style.display = "block";
    enemy.style.animation = "enemyMove 3s linear";

    setTimeout(function () {
        enemy.style.display = "none";
        setTimeout(spawnEnemy, 5000);
    }, 3000);
}

function shoot() {
    var bullet = document.createElement("div");
    bullet.classList.add("bullet");
    bullet.style.top = character.offsetTop + 20 + "px";
    bullet.style.left = character.offsetLeft + 50 + "px";
    document.getElementById("game").appendChild(bullet);
    bullets.push(bullet);

    var bulletInterval = setInterval(function () {
        bullet.style.left = parseInt(bullet.style.left) + 10 + "px";

        let enemyLeft = parseInt(window.getComputedStyle(enemy).getPropertyValue("left"));
        let enemyTop = parseInt(window.getComputedStyle(enemy).getPropertyValue("top"));
        let enemyWidth = 50;
        let enemyHeight = 50;


        let bulletLeft = parseInt(bullet.style.left);
        let bulletTop = parseInt(bullet.style.top);

        if (bulletLeft >= enemyLeft && bulletLeft <= enemyLeft + enemyWidth &&
            bulletTop >= enemyTop && bulletTop <= enemyTop + enemyHeight) {
            enemy.style.display = "none";
            document.getElementById("game").removeChild(bullet);
            clearInterval(bulletInterval);
            counter += 100;
            document.getElementById("scoreSpan").innerHTML = Math.floor(counter / 100);
        }

        if (bulletLeft > 600) {
            document.getElementById("game").removeChild(bullet);
            clearInterval(bulletInterval);
        }
    }, 20);
}


spawnBlock();
spawnBonus();
spawnEnemy();

var checkDead = setInterval(function () {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));

    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    let blockTopLeft = parseInt(window.getComputedStyle(blockTop).getPropertyValue("left"));
    let enemyLeft = parseInt(window.getComputedStyle(enemy).getPropertyValue("left"));

    let bonusLeft = parseInt(window.getComputedStyle(bonus).getPropertyValue("left"));

    let characterWidth = 50;
    let characterHeight = 50;

    let blockWidth = 40;
    let blockHeight = 20;

    let blockTopWidth = 40;
    let blockTopHeight = 20;

    let bonusWidth = 30;
    let bonusHeight = 30;

    if (blockLeft < characterLeft + characterWidth && blockLeft + blockWidth > characterLeft &&
        180 < characterTop + characterHeight && 180 + blockHeight > characterTop) {
        block.style.animation = "none";
        alert("Game Over. Score: " + Math.floor(counter / 100));
        counter = 0;
        block.style.animation = "block 3s linear";
    }

    if (blockTopLeft < characterLeft + characterWidth && blockTopLeft + blockTopWidth > characterLeft &&
        100 < characterTop + characterHeight && 100 + blockTopHeight > characterTop) {
        blockTop.style.display = "none";
        alert("Game Over. Score: " + Math.floor(counter / 100));
        counter = 0;
    }

    if (enemyLeft < characterLeft + characterWidth && enemyLeft + 50 > characterLeft &&
        characterTop < 150 + 50 && characterTop + 50 > 150) {
        enemy.style.display = "none";
        alert("Game Over. Score: " + Math.floor(counter / 100));
        counter = 0;
    }

    if (bonusLeft < characterLeft + characterWidth && bonusLeft + bonusWidth > characterLeft &&
        characterTop < 115) {
        counter += 50;
        bonus.style.display = "none";
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter / 100);
    }

    counter++;
    document.getElementById("scoreSpan").innerHTML = Math.floor(counter / 100);
}, 10);

document.body.onkeyup = function (e) {
    if (e.keyCode == 32) { // Пробел для прыжка
        jump();
    } else if (e.keyCode == 83) { // Клавиша S для пиу-пиу
        shoot();
    }
};

