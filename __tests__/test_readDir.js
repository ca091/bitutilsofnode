let fs = require('fs');
let path = require('path');
let fileFor = require('../src/readDir');

let filePath = path.resolve(__dirname, '../src');
let outPut = 'out.txt';

function readFile(filedir, filename) {
    if (filename === '.DS_Store') return false;
    let str = fs.readFileSync(filedir, 'utf-8');
    fs.writeFileSync(outPut, filename + ' =>\n' + str + '\n', {flag: 'a'})
}

test('fileFor', () => {
    return fileFor(filePath, /(.vue|.js)$/, readFile)
        .then(data => {
            expect(data).toBe(200)
        })
});
