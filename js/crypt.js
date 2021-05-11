function crypt(text = "") {
    let crypted = text.split("").map(symb => {
        return String.fromCharCode((symb.charCodeAt() << 256) ^ 256)
    })
    return crypted.join(" ")

}

function decrypt(crypted = "", key) {
    return crypted.split(" ").map(s => {
        return String.fromCharCode((s.charCodeAt() ^ 256) >> 256)
    }).join("")
}

function showCrypt(txt) {
    document.getElementById('crypted').innerText = `Текст: ${crypt(txt)}`
}

function showDecrypt(txt) {
    document.getElementById('decrypted').innerText = `Текст: ${decrypt(txt)}`
}