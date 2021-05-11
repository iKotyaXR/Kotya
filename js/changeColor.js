let colored = false;
const colors = ['red', 'blue', 'green', 'brown', 'grey', 'cyan', 'aqua', 'yellow', 'pink']

function random(min, max) {
    if (max == null) {
        max = min;
        min = 0;
    }
    return min + Math.floor(Math.random() * (max - min));
}

function changeColor() {
    if (!colored) {
        colored = !colored;
        document.body.style.backgroundColor = colors[random(0, colors.length)]
    } else {
        colored = !colored
        document.body.style.backgroundColor = ""
    }
}

function party(ms = 10000) {
    let b = setInterval(() => {
        document.body.style.backgroundColor = colors[random(0, colors.length)]
    }, 50)

    setTimeout(() => {
        clearInterval(b)
        document.body.style.backgroundColor = ""
    }, ms)
}
let prevInterval;

function changes(value) {
    if (value === 0) {
        return document.body.style.backgroundColor = ""
    }
    let b = setInterval(() => {
        if (1000 / value == Infinity)
            document.body.style.backgroundColor = ""
        else
            document.body.style.backgroundColor = colors[random(0, colors.length)]
    }, 1000 / value)
    clearInterval(prevInterval);
    prevInterval = b;

}