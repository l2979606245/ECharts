var log = console.log.bind(console)

var ajax = (request) => {
    var p = new Promise((resolve, reject) => {
        var r = new XMLHttpRequest()
        r.open(request.method, request.url, true)
        if (request.contentType !== undefined) {
            r.setRequestHeader('Content-Type', request.contentType)
        }
        r.onreadystatechange = () => {
            if (r.readyState === 4) {
                request.callback(r.response)
                resolve(r.response)
            }
        }
        if (request.method == 'GET') {
            r.send()
        } else {
            r.send(request.data)
        }

    })
    return p
}