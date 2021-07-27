chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'TO-DO') {
        let todoJson = localStorage.getItem('todo')
        let todo = JSON.parse(todoJson)
        if (!todo) {
            todo = []
        }
        todo.push({
            url: request.url,
            title: request.title,
            time: Date.now()
        })
        localStorage.setItem('todo', JSON.stringify(todo))
        chrome.notifications.create({
            type: 'basic',
            title: '已添加到稍后读.',
            message: '',
            iconUrl: 'todo.jpg'
        });
        // sendResponse({code: 200, msg: 'Success.'});
    }
})