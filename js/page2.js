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
    if (score < price) return alert(`У вас недостаточно денег!\nСтоимость этого улучшения: ${format(price)}`)
    subRuble(price)
    updating += value;
    return updateStats();
}

function upgradePerSecond(value = 0, price = 0) {
    if (score < price) return alert(`У вас недостаточно денег!\nСтоимость этого улучшения: ${format(price)}`)
    subRuble(price)
    perSecond += value;
    return updateStats();
}

function buyTrophy() {
    if (score < trophyPrice) return alert(`У вас недостаточно денег!\nСтоимость трофея: ${format(trophyPrice)}`)
    subRuble(trophyPrice)
    trophyPrice *= 4;
    let randTrophy = random(0, avTropheys.length - 1);
    userTrophy.push(avTropheys[randTrophy])
    alert(`Вам выпал трофей ${avTropheys[randTrophy]}`)
    avTropheys.splice(randTrophy, 1)
    return updateStats();
}
setInterval(() => {
    let date = new Date(Date.now() - gameTimer)
    document.getElementById("Timer").innerText = `Время игры: ${String(date.getD()).padStart(2,0)}:${String(date.getMinutes()).padStart(2,0)}:${String(date.getSeconds()).padStart(2,0)}`
    if (userTrophy.length === tropheys.length) {
        alert(`Вы купили все трофеи`)
        alert(`Спасибо за игру!`)
        location.href = './index.html'
        userTrophy = []
    }
    addRuble(perSecond)
}, 1000)