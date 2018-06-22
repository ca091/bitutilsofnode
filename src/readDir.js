let fs = require('fs');
let path = require('path');
let util = require('util');
let readdir = util.promisify(fs.readdir);
let stat = util.promisify(fs.stat);

async function fileFor(filePath, matching, callback) {
    let files = await readdir(filePath);
    for(let filename of files){
        let filedir = path.join(filePath, filename);
        let stats = await stat(filedir);
        if(stats.isFile() && filedir.match(matching)){
            await callback(filedir, filename)
        }else if(stats.isDirectory()){
            await fileFor(filedir, matching, callback)
        }
    }
    return 'fileFor execute over!'
}

module.exports = fileFor;