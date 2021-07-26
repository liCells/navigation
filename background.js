chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request);
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
        sendResponse({code: 200, msg: 'Success.'});
    }
})