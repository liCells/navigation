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
}

let commonlyUsedUrls = [
    {
        title: 'github',
        url: 'https://github.com/'
    },
    {
        title: 'gitee',
        url: 'https://gitee.com/'
    },
    {
        title: '',
        url: ''
    },
]

// 根据index获取对应的搜索引擎
function getSearchEngine(val) {
    return localStorage.getItem(localStorageKey + '-' + val)
}

// 获取当前搜索引擎index
function getSearchEngineIndex() {
    return localStorage.getItem(localStorageIndexKey)
}

// 获取当前搜索引擎总数
function getSearchEngineSum() {
    return parseInt(localStorage.getItem(localStorageSumKey))
}

function setSearchEngineIndex(val) {
    return localStorage.setItem(localStorageIndexKey, val)
}
