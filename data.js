init()

function setBackground() {
    let background = localStorage.getItem('background')
    if (background !== undefined && background !== null) {
        let bodyObj = document.getElementById("body")
        if (background.startsWith("data:image")) {
            bodyObj.style.backgroundImage = "url('" + background + "')"
        } else {
            bodyObj.style.backgroundColor = background
        }
    }
}

function init() {
    if (!localStorage.getItem(localStorageIndexKey)) {
        localStorage.setItem(localStorageKey + '-' + 1, 'https://www.google.com/search?q=')
        localStorage.setItem(localStorageKey + '-' + 2, 'https://cn.bing.com/search?ensearch=1&q=')
        localStorage.setItem(localStorageKey + '-' + 3, 'https://www.baidu.com/s?wd=')
        localStorage.setItem(localStorageKey + '-' + 4, 'https://www.sogou.com/web?query=')
        localStorage.setItem(localStorageKey + '-' + 5, 'https://www.so.com/s?q=')
        localStorage.setItem(localStorageIndexKey, 1)
        localStorage.setItem(localStorageSumKey, 5)
    }
    checkNetwork()
    setBackground();
    initTodo();
    setClickListener();
    setDeleteListener();
}

// 设置稍后读删除事件
function setDeleteListener() {
    let tableI = document.getElementsByName("todo-table-i")
    for (let i = 0; i < tableI.length; i++) {
        tableI[i].onclick = function () {
            let todoJson = localStorage.getItem('todo')
            let todoObj = JSON.parse(todoJson)
            todoObj.splice(this.getAttribute('index'), 1)
            localStorage.setItem('todo', JSON.stringify(todoObj))

            this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)
        }
    }
}

// 设置稍后读点击事件
function setClickListener() {
    let todoLi = document.getElementsByName("todo-table-td")
    for (let i = 0; i < todoLi.length; i++) {
        todoLi[i].onclick = function () {
            window.open(this.getAttribute("url"), '_blank')
        }
    }
}

function initTodo() {
    let todo = ''
    let todoJson = localStorage.getItem('todo')
    let todoObj = JSON.parse(todoJson)
    if (todoObj === null) {
        return
    }
    for (let i = 0; i < todoObj.length; i++) {
        todo += '<tr style="height: 50px;">' +
            '    <td style="width: 80%;" name="todo-table-td" class="mdui-ripple" url="' + todoObj[i].url + '">' +
            '        <h3 style="padding-left: 2%;">' + todoObj[i].title + '</h3>' +
            '    </td>' +
            '    <td style="width: 17%;">记录时间: ' + formatDateTime(new Date(todoObj[i].time)) + '</td>' +
            '    <td style="width: 3%;">' +
            '        <button class="mdui-btn mdui-ripple" name="todo-table-i" index="' + i + '">' +
            '            <i class="mdui-icon material-icons">delete</i>' +
            '        </button>' +
            '    </td>' +
            '</tr>'
    }
    document.getElementById('todo-table').innerHTML = todo
}

function checkNetwork() {
    if (getSearchEngineIndex() === 1) {
        let startTime
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 1) {
                startTime = Date.now()
            }
            if (xhr.readyState === 4 && xhr.status !== 200) {
                mdui.snackbar({
                    message: '检测到谷歌网络不可用, 建以切换至百度',
                    timeout: 3000,
                    position: 'right-bottom'
                })
                symbol = 2
            }
            if (xhr.readyState === 4 && xhr.status === 200) {
                if ((Date.now() - startTime) > 2500) {
                    mdui.snackbar({
                        message: '谷歌网络延迟偏高, 建议使用百度',
                        timeout: 3000,
                        position: 'right-bottom'
                    })
                }
            }
        }
        xhr.timeout = 5000
        xhr.open("GET", "https://www.google.com", true);
        xhr.send()
    }
}

// 根据index获取对应的搜索引擎
function getSearchEngine(val) {
    return localStorage.getItem(localStorageKey + '-' + val)
}

// 获取当前搜索引擎index
function getSearchEngineIndex() {
    return parseInt(localStorage.getItem(localStorageIndexKey))
}

// 获取当前搜索引擎总数
function getSearchEngineSum() {
    return parseInt(localStorage.getItem(localStorageSumKey))
}

function setSearchEngineIndex(val) {
    localStorage.setItem(localStorageIndexKey, val)
}


function formatDateTime(inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};
