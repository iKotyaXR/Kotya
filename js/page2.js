let score = 0.00;
let updating = 0.01;
let perSecond = 0;
let userTrophy = [];
let tropheys = ["🤡", "🦠", "🙊", "💘", "🦋", "💕", "🧠", "🦷", "🦴", "👀", "⛔", "❗"];
let avTropheys = tropheys.slice();
let trophyPrice = 1000;
let gameTimer = Date.now();
let scoreElement = document.getElementById('score')
let statsElement = document.getElementById('stats')

window.onload = () => {
    addRuble(0);
    score = +localStorage.getItem('score');
    let localUpdates = localStorage.getItem('updating')
    let localPerSecond = localStorage.getItem('perSecond')
    if (!localUpdates || localUpdates == 0)
        localStorage.setItem('updating', updating)
    if (!localPerSecond || localPerSecond == 0)
        localStorage.setItem('perSecond', perSecond)
    updating = +localStorage.getItem('updating');
    perSecond = +localStorage.getItem('perSecond');
    scoreElement.innerText = `Баланс: ` + format(score)
    updateStats()
};

function random(min, max) {
    if (max == null) {
        max = min;
        min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
}

function format(value = 0) {
    return `${value.toLocaleString().replace(',', '.')} ₽`
}

function updateStats() {
    return statsElement.innerText = `За клик: ${format(updating)} | В секунду: ${format(perSecond)} | Ваши трофеи (${userTrophy.length}/${tropheys.length}): ${userTrophy.join(" ")}`
}

function addRuble(value) {
    score += value
    updateStats();
    return scoreElement.innerText = `Баланс: ` + format(score)
}

function subRuble(value) {
    score -= value
    updateStats();
    return scoreElement.innerText = `Баланс: ` + format(score)
}

function upgradeClick(value = 0, price = 0) {
    if (score < price) {
        new Audio('./sounds/error.mp3').play();
        return setTimeout(() => { alert(`У вас недостаточно денег!\nСтоимость этого улучшения: ${format(price)}`) }, 50)
    }
    new Audio('./sounds/upgrade.mp3').play();
    subRuble(price)
    updating += value;
    return updateStats();
}

function upgradePerSecond(value = 0, price = 0) {
    if (score < price) {
        new Audio('./sounds/error.mp3').play();
        return setTimeout(() => { alert(`У вас недостаточно денег!\nСтоимость этого улучшения: ${format(price)}`) }, 50)
    }
    new Audio('./sounds/upgrade.mp3').play();
    subRuble(price)
    perSecond += value;
    return updateStats();
}

function buyTrophy() {
    if (score < trophyPrice) {
        new Audio('./sounds/error.mp3').play();
        return setTimeout(() => { alert(`У вас недостаточно денег!\nСтоимость трофея: ${format(trophyPrice)}`) }, 50)
    }
    subRuble(trophyPrice)
    trophyPrice *= 4;
    let randTrophy = random(0, avTropheys.length - 1);
    userTrophy.push(avTropheys[randTrophy])
    alert(`Вам выпал трофей ${avTropheys[randTrophy]}`)
    avTropheys.splice(randTrophy, 1)
    return updateStats();
}
setInterval(() => {
    localStorage.setItem('score', score);
    localStorage.setItem('updating', updating);
    localStorage.setItem('perSecond', perSecond);
    let date = new Date(Date.now() - gameTimer)
    document.getElementById("Timer").innerText = `Время игры: ${String(date.getUTCHours()).padStart(2,0)}:${String(date.getMinutes()).padStart(2,0)}:${String(date.getSeconds()).padStart(2,0)}`
    if (userTrophy.length === tropheys.length) {
        alert(`Вы купили все трофеи`)
        alert(`Спасибо за игру!`)
        location.href = './index.html'
        userTrophy = []
    }
    document.title = `Счет: ${score.toFixed(2)}`
    addRuble(perSecond)
}, 1000)