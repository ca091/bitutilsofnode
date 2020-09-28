/**
 * forMap 多个异步同时执行
 * @param arr
 * @param itemHandler
 * @returns {Promise<any[]>}
 */
async function forMap(arr, itemHandler) {
  if (typeof itemHandler !== 'function') throw new Error(`itemHandler should be function!`)
  return Promise.all(arr.map(itemHandler))
}

async function forReduce(arr, reduceHandler) {
  // return arr.reduce(async (total, item) => await total + item, 0);
  if (typeof reduceHandler !== 'function') throw new Error(`reduceHandler should be function!`)
  return arr.reduce(reduceHandler, 0)
}

async function forSome(arr, callback) {
  if (typeof callback !== 'function') throw new Error(`callback should be function!`)
  for (let [index, item] of Object.entries(arr)) {
    if (await callback(item, index, arr)) return true
  }
  return false
}

/**
 * 不同于forMap, forOf是异步按顺序执行
 * @param arr
 * @param callback
 * @returns {Promise<number>}
 */
async function forOf(arr, callback) {
  if (typeof callback !== 'function') throw new Error(`callback should be function!`)
  for (let [index, item] of Object.entries(arr)) {
    await callback(item, index, arr)
  }
  return 200
}

module.exports = {
  forMap,
  forReduce,
  forSome,
  forOf,
}
