var request = require("http")
var router = require("./route")
var url = require("url")
var fs = require("fs")

function start() {
    request.createServer(function(req, res) {
        var content = ''
        var pathname = url.parse(req.url).pathname
        req.setEncoding("utf8");
        // 获取req里面的path路径
        req.addListener("data", function(postDataChunk) {
            content += postDataChunk
            console.log("Received POST data chunk '" + postDataChunk + "'.")
        })
        req.addListener("end", function() {
            console.log("Received POST data end.")
            console.log(content.length)
            router.route(pathname, res, content)
            return
        })
        if (pathname.indexOf("/index") > -1) {
            router.route(pathname, res, req)
        }
    }).listen(8888)
}

exports.start = start
