let fs = require('fs');
let path = require('path');
let util = require('util');
let readdir = util.promisify(fs.readdir);
let stat = util.promisify(fs.stat);

// let filePath = path.resolve(__dirname, 'components');
// let filePath = path.resolve('/Users/cq/Documents/tonglv/FeiYuSBC-Vue/src', 'components');
let filePath = path.resolve('/Users/cq/Documents/tonglv/FeiYuSBC-Vue', 'src');

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 * @param ignore 需要忽略的文件
 * @param outFileName 输出的文件
 */
function fileDisplay(filePath, ignore, outFileName) {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function (err, files) {
        if (err) {
            console.warn(err)
        } else {
            //遍历读取到的文件列表
            files.forEach(function (filename) {
                //获取当前文件的绝对路径
                let filedir = path.join(filePath, filename);
                if (filedir.match(ignore) == null) {
                    //根据文件路径获取文件信息，返回一个fs.Stats对象
                    fs.stat(filedir, function (eror, stats) {
                        if (eror) {
                            console.warn('获取文件stats失败');
                        } else {
                            let isFile = stats.isFile();//是文件
                            let isDir = stats.isDirectory();//是文件夹
                            if (isFile) {
                                readFile(filedir, filename, outFileName)
                            }
                            if (isDir) {
                                fileDisplay(filedir, ignore, outFileName);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                            }
                        }
                    })
                }
            });
        }
    });
}


function readFile(filedir, filename, outFileName) {
    if (filename === '.DS_Store') return;
    let str = fs.readFileSync(filedir, 'utf-8')
    fs.writeFileSync(outFileName, filename + ' =>\n' + str + '\n', {flag: 'a'})
}

//************************************
//************************************
//************************************

/**
 * 遍历的另一种写法
 * @param filePath
 * @param matching
 * @param outFileName 输出的文件
 */
async function fileFor(filePath, matching, outFileName) {
    let files = await readdir(filePath);
    files.forEach(filename => {
        let filedir = path.join(filePath, filename);
        stat(filedir).then(stats => {
            let isFile = stats.isFile();//是文件
            let isDir = stats.isDirectory();//是文件夹
            if (isFile && filedir.match(matching)) {
                readFile(filedir, filename, outFileName)
            }
            if (isDir) {
                fileFor(filedir, matching, outFileName);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
        }).catch(error => {
            console.warn(`获取文件stats失败: ${error}`);
        });
    })
}

//调用文件遍历方法
fileDisplay(filePath, /(assets|bak|.png)$/, 'feiyu-sbc.txt');
// fileFor(filePath, /(.vue|.js)$/, 'feiyu.txt');
