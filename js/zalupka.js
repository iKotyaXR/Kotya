function hello() {
    let text = ""
    let i = 1;
    setInterval(() => {
        text += '<h6>ТЫ ПИДОРАС!!!</h6>\n'
        document.body.innerHTML = text
    }, i *= 50);
    setTimeout(() => location.href = "./index.html", 1000)
}

