// 搜索引擎选项
let symbol = getSearchEngineIndex()
// 选项位置
let position = -1
let optionIdPrefix = 'option-'
// 特殊KEY
let ignoreKeys = [37, 38, 39, 40, 13, 27]

// 获取输入框
let searchObj = document.getElementById("search")
let dataListObj = document.getElementById("dataList")
let markObj = document.getElementById("logo")

// 聚焦到输入框
searchObj.focus()
// 设置输入框触发事件
searchObj.onkeyup = search

// 处理所有书签
const bookmarks = []
// 获取书签
chrome.bookmarks.getTree(function (bookmarkArray) {
    buildList(bookmarkArray)
    buildList(commonlyUsedUrls)
});

// 递归处理书签
function buildList(val) {
    for (let i = 0; i < val.length; i++) {
        if (val[i].url !== undefined) {
            bookmarks.push({title: val[i].title, url: val[i].url})
        }
        if (val[i].children !== undefined) {
            buildList(val[i].children)
        }
    }
}

// 搜索事件
function search() {
    let val = searchObj.value
    // ALT + ←/→
    if (event.altKey) {
        switchSearchEngine(event.keyCode);
        return
    }

    // ESC
    if (event.keyCode === 27) {
        emptySearchInput()
        return
    }

    if (event.keyCode === 38) {
        up()
    } else if (event.keyCode === 40) {
        down()
    }
    if (val === '') {
        dataListObj.innerHTML = ''
        return
    }

    if (event.keyCode === 13 && !event.shiftKey) {
        let prefix = getSearchEngine(symbol)
        location.href = prefix + val
        return
    }

    if (event.keyCode === 13 && event.shiftKey) {
        location.href = document.getElementById(optionIdPrefix + position).getAttribute('value')
    }

    if (ignoreKeys.indexOf(event.keyCode) === -1) {
        position = -1
        let li = ''
        let sum = 0
        for (let i = 0; i < bookmarks.length; i++) {
            if (bookmarks[i].title.toLowerCase().indexOf(val.toLowerCase()) > -1) {
                li += "<li class='select-option' id='" + optionIdPrefix + sum + "' value='" + bookmarks[i].url + "'>" + bookmarks[i].title + "</li>"
                sum++
            }
            if (sum === 10) {
                break
            }
        }
        dataListObj.innerHTML = li
        let dataObj = document.getElementsByTagName("li")
        for (let i = 0; i < dataObj.length; i++) {
            dataObj[i].addEventListener("click", function () {
                searchObj.value = this.innerText
            })
        }
    }
}

// 上移
function up() {
    try {
        document.getElementById(optionIdPrefix + position).style.color = 'gray'
        let dataObj = document.getElementById(optionIdPrefix + --position)
        dataObj.style.color = 'black'
        if (dataObj.innerHTML !== '' && dataObj.innerHTML !== undefined) {
            searchObj.value = dataObj.innerHTML
        }
    } catch (e) {

    }
}

// 下移
function down() {
    if (position === document.getElementsByTagName("li").length - 1) {
        return
    }
    try {
        document.getElementById(optionIdPrefix + position).style.color = 'gray'
    } catch (e) {

    }
    let dataObj = document.getElementById(optionIdPrefix + ++position)
    dataObj.style.color = 'black'

    if (dataObj.innerHTML !== '' && dataObj.innerHTML !== undefined) {
        searchObj.value = dataObj.innerHTML
    }
}

// 切换搜索引擎
function switchSearchEngine(val) {
    if (val === 39 && ++symbol === getSearchEngineSum() + 1) {
        symbol = 1
    }
    if (val === 37 && --symbol === 0) {
        symbol = 4
    }
    switch (symbol) {
        case 1:
            markObj.innerHTML = 'G'
            break
        case 2:
            markObj.innerHTML = 'B'
            break
        case 3:
            markObj.innerHTML = 'S'
            break
        case 4:
            markObj.innerHTML = '3'
            break
    }
    setSearchEngineIndex(symbol)
}

// 清空搜索框
function emptySearchInput() {
    dataListObj.innerHTML = ''
    searchObj.value = ''
}