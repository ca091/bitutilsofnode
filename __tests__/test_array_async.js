let ArrayAsync = require('../src/array_async');

let arr = [1, 2, 3];
async function itemHandler(item) {
    return getData(item);
}

function getData(item){
    console.log(`${item} * 2 = ?`);
    return new Promise((resolve, reject) => {
        let delay = item === 1 ? 3000 : (item - 1) * 1000;
        setTimeout(() => {
            console.log(`${item} * 2 = ${item * 2}`);
            resolve(item * 2)
        }, delay)
    })
}


//测试单元
describe('array_async forMap', () => {
    test('return array', () => {
        expect.assertions(3);
        return ArrayAsync.forMap(arr, itemHandler)
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
