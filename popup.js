let symbol = '1'
let position = -1
let optionIdPrefix = 'option-'
let ignoreKeys = [37, 38, 39, 40, 13, 27]

// 获取输入框
let searchObj = document.getElementById("search")
let dataListObj = document.getElementById("dataList")

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

    if (event.keyCode === 27) {
        dataListObj.innerHTML = ''
        searchObj.value = ''
        return
    }

    if (event.keyCode === 38) {
        try {
            document.getElementById(optionIdPrefix + position).style.color = ''
            let dataObj = document.getElementById(optionIdPrefix + --position)
            dataObj.style.color = 'red'
            if (dataObj.innerHTML !== '' && dataObj.innerHTML !== undefined) {
                searchObj.value = dataObj.innerHTML
            }
        } catch (e) {

        }
    } else if (event.keyCode === 40) {
        if (position === document.getElementsByTagName("li").length - 1) {
            return
        }
        try {
            document.getElementById(optionIdPrefix + position).style.color = ''
        } catch (e) {

        }
        let dataObj = document.getElementById(optionIdPrefix + ++position)
        dataObj.style.color = 'red'

        if (dataObj.innerHTML !== '' && dataObj.innerHTML !== undefined) {
            searchObj.value = dataObj.innerHTML
        }
    }
    if (val === '') {
        dataListObj.innerHTML = ''
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
        location.href = document.getElementById(optionIdPrefix + position).getAttribute('value')
    }

    if (ignoreKeys.indexOf(event.keyCode) === -1) {
        position = -1
        let li = ''
        let sum = 0
        for (let i = 0; i < bookmarks.length; i++) {
            if (bookmarks[i].title.toLowerCase().indexOf(val.toLowerCase()) > -1) {
                li += "<li style='overflow:hidden; text-overflow: ellipsis; white-space: nowrap;' id='" + optionIdPrefix + sum + "' value='" + bookmarks[i].url + "'>" + bookmarks[i].title + "</li>"
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
