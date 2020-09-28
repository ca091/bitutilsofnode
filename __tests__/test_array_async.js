let ArrayAsync = require('../index').ArrayAsync

let arr = [1, 2, 3]

function mapHandler(item) {
  return new Promise((resolve, reject) => {
    let delay = item === 1 ? 3000 : (item - 1) * 1000
    setTimeout(() => {
      resolve(item * 2)
    }, delay)
  })
}

async function reduceHandler(total, item) {
  return await total + item
}

function ofHandler(item, index, context) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`ofItemHandler result: ${item}`)
    }, 1300)
  })
}

//测试单元
describe('array_async forMap', () => {
  test('return array', () => {
    expect.assertions(2)
    return ArrayAsync.forMap(arr, mapHandler)
      .then(data => {
        expect(data).toEqual([2, 4, 6])
        expect(data).toContain(2)
      })
  })

  test('catch error', () => {
    return ArrayAsync.forMap(arr, {})
      .then(data => {
        expect(data).toContain(2)
      })
      .catch(e => expect(e.message).toMatch('itemHandler should be function!'))
  })
})

describe('array_async forReduce', () => {
  test('return promise', () => {
    // arr.reduce(reduceHandler, 0).then(d => console.log(d))
    return ArrayAsync.forReduce(arr, reduceHandler)
      .then(data => {
        expect(data).toBe(1 + 2 + 3)
      })
  })
})

describe('array_async forSome', () => {
  test('return true', () => {
    return ArrayAsync.forSome(arr, async item => item === 2)
      .then(data => {
        expect(data).toBeTruthy()
      })
  })

  test('return false', () => {
    return ArrayAsync.forSome(arr, async item => item === 4)
      .then(data => {
        expect(data).toBeFalsy()
      })
  })
})


test('forOf', () => {
  return ArrayAsync.forOf(arr, ofHandler)
    .then(data => {
      expect(data).toBe(200)
    })
})
