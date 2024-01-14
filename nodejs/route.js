var handler = require("./handler")


function routeList() {
    hanblers = {}
    hanblers["/index"] = handler.index
    hanblers["/upload"] = handler.upload
    hanblers["/show"] = handler.show
    return hanblers
}

function route(pathname, response, req) {
    hanblers = routeList()
    console.log("About to route a request for " + pathname)
    if (pathname.indexOf("favicon.ico") > -1) {
        return
    }
    if (typeof hanblers[pathname] === 'function') {
        hanblers[pathname](response, req)
    } else {
        console.log("No request handler found for " + pathname)
        response.writeHead(404, {"Content-Type": "text/plain"})
        response.write("404 Not found")
        response.end()
    }
}

exports.route = route