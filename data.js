let localStorageKey = 'searchEngine'
let localStorageIndexKey = 'searchEngineIndex'
let localStorageSumKey = 'searchEngineSum'

init()

function init() {
    if (!localStorage.getItem(localStorageIndexKey)) {
        localStorage.setItem(localStorageKey + '-' + 1, 'https://www.google.com/search?q=')
        localStorage.setItem(localStorageKey + '-' + 2, 'https://www.baidu.com/s?wd=')
        localStorage.setItem(localStorageKey + '-' + 3, 'https://www.sogou.com/web?query=')
        localStorage.setItem(localStorageKey + '-' + 4, 'https://www.so.com/s?q=')
        localStorage.setItem(localStorageIndexKey, 1)
        localStorage.setItem(localStorageSumKey, 4)
    }
    checkNetwork()
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
                    message: '检测到谷歌网络不可用, 已自动切换至百度',
                    timeout: 3000,
                    position: 'right-bottom'
                })
                symbol = 2
                switching()
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