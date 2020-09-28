let https = require('https')
let http = require('http')
// let querystring = require('querystring');
const {URL} = require('url')

function getData(res) {
  return new Promise((resolve, reject) => {
    res.setEncoding('utf8')
    let rawData = ''
    res.on('data', chunk => rawData += chunk)
    res.on('end', () => {
      try {
        resolve(JSON.parse(rawData))
      } catch (e) {
        console.warn(`${e.message}\n`)
        resolve(rawData)
      }
    })
  })
}

// want: Api.get(url<String>).then(data => {})
function get(url) {
  return new Promise(((resolve, reject) => {
    if (typeof url !== 'string') {
      reject(`expect url - string but get ${url} - ${typeof url}`)
    } else {
      let source = /^https:/.test(url) ? https : http
      source.get(url, res => {
        const {statusCode} = res
        if (statusCode !== 200) {
          res.resume()
          reject(`request fail statusCode: ${statusCode}`)
        } else {
          getData(res)
            .then(data => {
              resolve(data)
            })
            .catch(e => {
              reject(e)
            })
        }
      }).on('error', e => {
        reject(e.message)
      })
    }
  }))
}

// want: Api.request(opts<Object> || url<String>, params<Object>).then(data => {})
function request(options, params) {
  return new Promise((resolve, reject) => {
    let path, source, valid_options, valid_params
    if (typeof params !== 'object') {
      valid_params = new Error(`expect params - object but get ${params} - ${typeof params}`)
    }
    if (typeof options === 'string') {
      source = /^https:/.test(options) ? https : http
      path = new URL(options)
    } else if (typeof options === 'object') {
      source = /^https:/.test(options.protocol) ? https : http
      path = options
    } else {
      valid_options = new Error(`expect options - string || object but get ${options} - ${typeof options}`)
    }

    let valid = valid_options || valid_params
    if (valid) {
      reject(valid.message)
    } else {
      let req = source.request(path, res => {
        const {statusCode} = res
        if (statusCode !== 200) {
          res.resume()
          reject(`request fail statusCode: ${statusCode}`)
        } else {
          getData(res)
            .then(data => {
              resolve(data)
            })
            .catch(e => {
              reject(e)
            })
        }
      })

      req.on('error', e => {
        reject(e.message)
      })
      // here use JSON.stringify instead of querystring.stringify
      req.write(JSON.stringify(params))
      req.end()
    }
  })
}

let Api = {
  get: get,
  request: request,
}

module.exports = Api
