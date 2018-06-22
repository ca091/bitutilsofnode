/**
 * forMap
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

module.exports = {
    forMap,
    forReduce
};