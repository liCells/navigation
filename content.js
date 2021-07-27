let targetExtensionId = "amknoeeijphpflngehimhkcodfebeein"

document.onkeyup = function () {
    if (event.ctrlKey && event.keyCode === 191) {
        chrome.runtime.sendMessage(targetExtensionId, {type: 'TO-DO', url: window.location.href, title: document.title}, function (response) {
            if (response.code === 200) {
                alert(response.msg)
            }
        })
    }
}