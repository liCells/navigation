let symbol = '1'

// 处理所有书签
const bookmarks = new Map();
let keys = [];
chrome.bookmarks.getTree(function(bookmarkArray){
    buildList(bookmarkArray)
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

// 获取输入框
let searchDom = document.getElementById("search")
// 聚焦到输入框
searchDom.focus()
// 设置输入框触发事件
searchDom.onkeyup = search

// 搜索事件
function search() {
    let val = searchDom.value
    console.log(val.hash)
    console.log('李宗'.hash)
    if (event.keyCode === 13) {
        switch (symbol) {
            case '1':
                location.href = 'https://www.google.com/search?q=' + val
                break
        }
        return
    }
    if (val !== '') {
        for (let i = 0; i < keys.length; i++) {
            if (keys[i].indexOf(val) !== -1) {
                // console.log(keys[i])
            }
        }
    }
}