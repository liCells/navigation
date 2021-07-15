let symbol = '1'

// 获取输入框
let searchObj = document.getElementById("search")
let dataListObj = document.getElementById("dataList")

// 聚焦到输入框
searchObj.focus()
// 设置输入框触发事件
searchObj.onkeyup = search

// 处理所有书签
const bookmarks = new Map()
let keys = []
// 获取书签
chrome.bookmarks.getTree(function (bookmarkArray) {
    buildList(bookmarkArray)
    let li = ''
    for (let i = 0; i < 10; i++) {
        li += "<li style='overflow:hidden; text-overflow: ellipsis; white-space: nowrap;'>" + keys[i] + "</li>"
    }
    dataListObj.innerHTML = li
    let dataObj = document.getElementsByTagName("li")
    for (let i = 0; i < dataObj.length; i++) {
        dataObj[i].addEventListener("click", function () {
            searchObj.value = this.innerText
        })
    }
});

// 递归处理书签
function buildList(val) {
    for (let i = 0; i < val.length; i++) {
        if (val[i].url !== undefined) {
            bookmarks.set(val[i].title, val[i].url)
            keys.push(val[i].title)
        }
        if (val[i].children !== undefined) {
            buildList(val[i].children)
        }
    }
}

// 搜索事件
function search() {
    let val = searchObj.value
    if (val === '') {
        return
    }

    if (event.keyCode === 13 && !event.shiftKey) {
        switch (symbol) {
            case '1':
                location.href = 'https://www.google.com/search?q=' + val
                break
        }
        return
    }

    if (event.keyCode === 13 && event.shiftKey) {
    }

    for (let i = 0; i < keys.length; i++) {
        if (keys[i].indexOf(val) !== -1) {
            // console.log(keys[i])
        }
    }
}
