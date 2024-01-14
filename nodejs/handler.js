var fs = require("fs")
var formidable = require("formidable");

function index(response, content) {
    response.writeHead(200, {"Content-Type": "text/html"})
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="textarea" name="upload" style="width:800px;height:600px">'+
    '<input type="submit" value="提交" />'+
    '</form>'+
    '</body>'+
    '</html>';
    response.write(body);
    response.end()
}

function upload(response, content) {
    // 获取request里面的文件
    var form = new formidable.IncomingForm();
    console.log("about to parse");
    fs.writeFile('/tmp/test.text', content, (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log('File has been written successfully!');
        }
      });
    // fs.renameAsync(request.files.upload.path, "/tmp/test.png")
    // response.writeHead(200, {"Content-Type": "text/html"})
    // response.end("<html><body><img src='/show'></body></html>")
}

function show(response, content) {
    fs.readFile("/tmp/test.png", "binary", function(error, file) {
        response.writeHead(200, {"Content-Type": "image/png"})
        response.end(file, "binary")
    })
}

exports.index = index
exports.upload = upload
exports.show = show