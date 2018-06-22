/**
 * forMap 多个异步同时执行
 * @param arr
 * @param itemHandler
 * @returns {Promise<any[]>}
 */
async function forMap(arr, itemHandler) {
    if(typeof itemHandler !== 'function') throw new Error(`itemHandler should be function!`);
    return Promise.all(arr.map(itemHandler))
}

async function forReduce(arr, reduceHandler){
    // return arr.reduce(async (total, item) => await total + item, 0);
    if(typeof reduceHandler !== 'function') throw new Error(`reduceHandler should be function!`);
    return arr.reduce(reduceHandler, 0);
}

/**
 * 不同于forMap, forOf是异步按顺序执行
 * @param arr
 * @param callback
 * @returns {Promise<string>}
 */
async function forOf(arr, callback) {
    if(typeof callback !== 'function') throw new Error(`callback should be function!`);
    for (let [index, item] of Object.entries(arr)) {
        await callback(item, index, arr)
    }
    return 'execute over';
}

module.exports = {
    forMap,
    forReduce,
    forOf
};