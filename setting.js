function blobToDataURL(blob, cb) {
    let reader = new FileReader();
    reader.onload = function (evt) {
        var base64 = evt.target.result
        cb(base64)
    };
    reader.readAsDataURL(blob);
}

let file = document.getElementById("background");
let fileColor = document.getElementById("backgroundColor");
let confirm = document.getElementById("confirm");
file.onchange = changeImg
confirm.onclick = setBackgroundColor

function setBackgroundColor() {
    localStorage.setItem('background', fileColor.value)
}

function changeImg() {
    let img = file.files[0]
    if (img) {
        blobToDataURL(img, function (base64Url) {
            localStorage.setItem('background', base64Url)
        })
    }
}
