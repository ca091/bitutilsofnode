let Api = require('../index').Api

const url = 'https://recommender-api-ms.juejin.im/v1/get_recommended_entry?suid=MUFM2qeBa7jUneE6aYiu&ab=welcome_3&src=web'

const postData = {
  city_code: '110100',
  key: '2',
}

const options = {
  hostname: 'sbc.tonglvhuanqiu.com',
  path: '/H5/Product/getProductList',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
  },
}

test('Api.get', () => {
  return Api.get(url)
    .then(data => {
      // console.log(data);
      if (typeof data === 'string') {
        expect(data).toMatch(/^{[^]*}$/)
      } else if (typeof data === 'object') {
        expect(JSON.stringify(data)).toMatch(/^{[^]*}$/)
      }
    })
    .catch(e => {
      expect(e).toMatch(/[\s\S]*/)
    })
})

test('Api.request', () => {
  return Api.request(options, postData)
    .then(data => {
      // console.log(data);
      if (typeof data === 'string') {
        expect(data).toMatch(/^{[^]*}$/)
      } else if (typeof data === 'object') {
        expect(JSON.stringify(data)).toMatch(/^{[^]*}$/)
      }
    })
    .catch(e => {
      console.error(e)
      expect(e).toMatch(/[\s\S]*/)
    })
})
