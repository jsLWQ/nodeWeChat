const axios = require('axios')
const cookie = require('../const/cookie')

const Get = (url, data) => {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'get',
      data,
      headers: {
        cookie
      }
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

const Post = (url, data) => {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'post',
      data,
      headers: {
        cookie
      }
    }).then(res => {
      setTimeout(() => {
        resolve(res)
      }, 5000)
    }).catch(err => {
      setTimeout(() => {
        reject(err)
      }, 5000)
    })
  })
}

module.exports = {
  Get,
  Post
}