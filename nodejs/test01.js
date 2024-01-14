fs = require('fs')
events = require('events').EventEmitter

var Data = function(path){
    this.path = path
    this.records = {}
    this.write_stream = fs.createWriteStream(this.path, {flags: 'a', encoding: 'utf-8'})
    this.load()
}
Data.prototype = Object.create(events.prototype)
Data.prototype.load = function(){
    database_this = this
    
    reader = fs.createReadStream(this.path,{flags: 'r', encoding: 'utf-8'})
    reader.on('readable', function(data){
        content = reader.read()
        if (content == null){
            return
        }
        clist = content.split("\n")
        clist.forEach(function(line){
            if (line.length > 0){
                record = JSON.parse(line)
                database_this.records[record.key] = record.value
            }
        })
    })
    reader.on('end', function(){
        database_this.emit('load')
    })
}
Data.prototype.get = function(key){
    return this.records[key]
}
Data.prototype.set = function(key, value, cb){
    this.records[key] = value
    jsonVal = JSON.stringify({key: key, value: value}) + "\n"
    this.write_stream.write(jsonVal, cb)
}
Data.prototype.del = function(key){
    delete this.records[key]
    this.write_stream.write(JSON.stringify({key: key, value: null}) + "\n")
}

d = new Data('./namelist.db')
d.on('load', function(){
    console.log('result:',this.get('xiaowang'))
    this.set('zhaoming', 19, function(err){
        console.log('err:', err)
    })
    this.del('xiaowang')
})