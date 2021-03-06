// 搜索引擎选项
let symbol = getSearchEngineIndex()

// 获取输入框
let searchObj = document.getElementById("search")
let navigationObj = document.getElementById("tab-1")
let dataListObj = document.getElementById("dataList")
let markObj = document.getElementById("logo")

// 设置输入框触发事件
searchObj.onkeydown = search
navigationObj.onclick = function () {tabIndex = 1}

// 处理所有书签
const bookmarks = []
// 获取书签
chrome.bookmarks.getTree(function (bookmarkArray) {
    buildList(bookmarkArray)
    switchSearchEngine(null)
    // 聚焦到输入框
    searchObj.focus()
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

function findOptions(val, options) {
    position = -1
    for (let i = 0; i < options.length; i++) {
        if (options[i].title.toLowerCase().indexOf(val.toLowerCase()) > -1) {
            optionalContext += "<li class='select-option' style='background: rgb(227, 227, 227)' id='" + optionIdPrefix + optionalSum + "' value='" + options[i].url + "'>" + options[i].title + "</li>"
            optionalSum++
        }
        if (optionalSum === 10) {
            break
        }
    }
    return optionalContext
}

document.onkeyup = function () {
    if (event.keyCode === 191) {
        if (tabIndex !== 0) {
            tabIndex = 0
            document.getElementById(prefixTab + tabIndex).click()
        }
        searchObj.focus()
        return
    }
    if (event.altKey && (event.keyCode === 49 || event.keyCode === 50 || event.keyCode === 51)) {
        tabIndex = event.keyCode === 49 ? 0 : event.keyCode === 50 ? 1 : 2
        document.getElementById(prefixTab + tabIndex).click()
    }
}

// 搜索事件
function search() {
    let val = searchObj.value
    // CTRL + ALT + ←/→
    if (event.altKey && event.ctrlKey) {
        switchSearchEngine(event.keyCode)
        return
    }

    // ESC
    if (event.keyCode === 27) {
        emptySearchInput()
        searchObj.style.borderRadius = '22px 22px'
        return
    }

    // 上下选择
    if (event.keyCode === 38) {
        up()
    } else if (event.keyCode === 40) {
        down()
    }

    if (val === '') {
        dataListObj.innerHTML = ''
        searchObj.style.borderRadius = '22px 22px 22px 22px'
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
        optionalSum = 0
        optionalContext = ''
        let li = findOptions(val, bookmarks)
        if (li === '' || optionalSum !== 10) {
            if (symbol === 1) {
                getTipsForGoogle(val)
            } else {
                getTipsForBaidu(val)
            }
            li = findOptions(val, temp)
        }
        dataListObj.innerHTML = li
        let dataObj = document.getElementsByTagName("li")
        if (dataObj.length !== 0) {
            searchObj.style.borderRadius = '22px 22px 0px 0px'
        } else {
            searchObj.style.borderRadius = '22px 22px 22px 22px'
        }
        for (let i = 0; i < dataObj.length; i++) {
            dataObj[i].addEventListener("click", function () {
                searchObj.value = this.innerText
            })
            if (i === dataObj.length - 1) {
                dataObj[i].style.borderRadius = '0px 0px 22px 22px'
            }
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
        let liObj = document.getElementsByTagName("li")
        position = liObj.length
        let dataObj = document.getElementById(optionIdPrefix + --position)
        dataObj.style.color = 'black'
        if (dataObj.innerHTML !== '' && dataObj.innerHTML !== undefined) {
            searchObj.value = dataObj.innerHTML
        }
    }
}

// 下移
function down() {
    if (position === document.getElementsByTagName("li").length - 1) {
        document.getElementById(optionIdPrefix + position).style.color = 'gray'
        position = -1
        down()
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
    switching()
}

function switching() {
    switch (symbol) {
        case 1:
            markObj.innerHTML = 'G'
            break
        case 2:
            markObj.innerHTML = '必应'
            break
        case 3:
            markObj.innerHTML = '百度'
            break
        case 4:
            markObj.innerHTML = '搜狗'
            break
        case 5:
            markObj.innerHTML = '360'
            break
    }
    setSearchEngineIndex(symbol)
}

// 清空搜索框
function emptySearchInput() {
    dataListObj.innerHTML = ''
    searchObj.value = ''
}

// 从百度获取提示
function getTipsForBaidu(val) {
    let url = 'https://www.baidu.com/sugrec?ie=utf-8&json=1&prod=pc&from=pc_web&wd=' + val
    let xhr = ''
    if (window.XMLHttpRequest) {
        xhr = new window.XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }
    xhr.open('get', url, true)
    xhr.setRequestHeader('Content-Type', 'text/plain; charset=UTF-8')
    xhr.send()
    xhr.onreadystatechange = function () {
        if (xhr.status === 200) {
            try {
                let val1 = JSON.parse(xhr.response).g
                temp = []
                for (let i = 0; i < val1.length; i++) {
                    temp.push({title: val1[i].q, url: ''})
                }
            } catch (e) {
                temp = {}
            }
        }
    }
}

// 从谷歌获取提示
function getTipsForGoogle(val) {
    let url = 'https://www.google.com.hk/complete/search?q=' + val + '&client=gws-wiz&hl=zh-CN'
    let xhr = ''
    if (window.XMLHttpRequest) {
        xhr = new window.XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }
    xhr.open('get', url, true)
    xhr.setRequestHeader('Content-Type', 'text/plain; charset=UTF-8')
    xhr.send()
    xhr.onreadystatechange = function () {
        if (xhr.status === 200) {
            try {
                let val1 = xhr.response.replace('window.google.ac.h(', '')
                let val2 = val1.substring(0, val1.length - 1)
                let val3 = JSON.parse(val2)[0]
                temp = []
                for (let i = 0; i < val3.length; i++) {
                    temp.push({title: val3[i][0], url: ''})
                }
            } catch (e) {
                temp = {}
            }
        }
    }
}