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

module.exports = {
    forMap
};