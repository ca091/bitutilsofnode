let ArrayAsync = require('../src/array_async');

let arr = [1, 2, 3];

function mapItemHandler(item){
    return new Promise((resolve, reject) => {
        let delay = item === 1 ? 3000 : (item - 1) * 1000;
        setTimeout(() => {
            resolve(item * 2)
        }, delay)
    })
}

async function reduceHandler(total, item) {
    return await total + item
}

function ofItemHandler(item, index, context) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`ofItemHandler result: ${item}`)
        }, 1300)
    })
}

//测试单元
describe('array_async forMap', () => {
    test('return array', () => {
        expect.assertions(3);
        return ArrayAsync.forMap(arr, mapItemHandler)
            .then(data => {
                console.log(`forMap result = ${data}`);
                expect(data).toContain(2);
                expect(data).toContain(4);
                expect(data).toContain(6);
            })
    });

    test('catch error', () => {
        return ArrayAsync.forMap(arr, {})
            .then(data => {
                expect(data).toContain(2);
            })
            .catch(e => expect(e.message).toMatch('itemHandler should be function!'));
    });
});

describe('array_async forReduce', () => {
    test('return promise', () => {
        // arr.reduce(reduceHandler, 0).then(d => console.log(d))
        return ArrayAsync.forReduce(arr, reduceHandler)
            .then(data => {
                console.log(`forReduce result = ${data}`);
            })
    });
});

test('forOf', () => {
    return ArrayAsync.forOf(arr, ofItemHandler).then(data => console.log(`forOf result = ${data}`))
});