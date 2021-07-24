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
        category: 'code',
        urls: [
            {
                title: 'github',
                url: 'https://github.com/',
                content: ''
            },
            {
                title: 'gitee',
                url: 'https://gitee.com/',
                content: ''
            },
            {
                title: '美团技术博客',
                url: 'https://tech.meituan.com/',
                content: ''
            },
            {
                title: '数据库内核月报',
                url: 'http://mysql.taobao.org/monthly/',
                content: ''
            },
            {
                title: 'Thoughtworks洞见',
                url: 'https://insights.thoughtworks.cn/',
                content: ''
            },
            {
                title: 'pom 镜像站',
                url: 'https://mvnrepository.com/',
                content: '我是人类...'
            },
            {
                title: 'Programming-Idioms',
                url: 'https://programming-idioms.org/about#about-block-cheatsheets',
                content: '学习新语言, 将两种语言进行对比'
            },
            {
                title: '探索雷达',
                url: 'https://www.thoughtworks.com/cn/radar',
                content: '有态度的前沿技术解析'
            },
            {
                title: 'github-rank',
                url: 'https://wangchujiang.com/github-rank/',
                content: 'Github 中国和全球用户排名, 全球仓库 Star 最多排名'
            },
            {
                title: '',
                url: '',
                content: ''
            },
        ]
    },
    {
        category: 'movies',
        urls: [
            {
                title: '哔哩哔哩',
                url: 'https://www.bilibili.com/',
                content: ''
            },
            {
                title: '油管',
                url: 'https://www.youtube.com/',
                content: ''
            },
            {
                title: '',
                url: '',
                content: ''
            },
            {
                title: '',
                url: '',
                content: ''
            },
            {
                title: '',
                url: '',
                content: ''
            },
        ]
    },
]


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
    return localStorage.setItem(localStorageIndexKey, val)
}
