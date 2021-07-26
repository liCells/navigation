let targetExtensionId = "amknoeeijphpflngehimhkcodfebeein"

document.onkeyup = function () {
    if (event.ctrlKey && event.keyCode === 191) {
        chrome.runtime.sendMessage(targetExtensionId, {type: 'TO-DO', url: window.location.href, title: document.title}, function (response) {
            console.log(response.code === 200);
            if (response.code === 200) {
                mdui.snackbar({
                    message: '已添加到稍后读.',
                    timeout: 3000,
                    position: 'right-bottom'
                })
            }
        })
    }
}