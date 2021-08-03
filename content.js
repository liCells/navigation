let targetExtensionId = chrome.runtime.id

document.onkeyup = function () {
    if (event.ctrlKey && event.keyCode === 191) {
        chrome.runtime.sendMessage(targetExtensionId, {type: 'TO-DO', url: window.location.href, title: document.title}, function (response) {
            // if (response.code === 200) {
            // }
        })
    }
}