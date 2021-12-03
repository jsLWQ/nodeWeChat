const { default: axios } = require('axios')
const log = require('../log')
const { Post } = require('../utils/request')
const emailSignUp = require('./emailer')


const url = `https://mp.weixin.qq.com/wxamp/cgi/route?path=%2Fwxopen%2Fauthprofile%3Faction%3Dsearch%26use_role%3D1%26is_expr%3D1&token=650678514&lang=zh_CN&random=${ Math.random() }`
let month = 1 // 月份
let count = 0 // 
let arrData = [] // 日期
let findYou = [] // 找到



function interface (username) {
  return new Promise((resolve,reject) => {
    Post(url,{
      username,
      type: 4
    }).then(res => {
      console.log('res',res.data)
      const { ret } = res.data
      if(!ret) {
        res.data.wechatNumber = username
        findYou.push(res.data)
      }
      resolve()
    }).then(err => {
      console.log('err',err)
      reject()
    })
  })
  
}


// 生成日期
function generateDate (month) {
  for(let i = 1;i < 32;i++) {
    let months = month < 10? `0${ month }` : month
    let day = i < 10? `0${ i }` : i
    arrData.push(`wx-${ months }${day }`)
  }
}

generateDate(month)

log.info('生成日期',arrData)

async function recursive () {
  try {
    await interface(arrData[count])
    
  } catch (error) {
    
  } finally {
    count++
    
    // console.log(count)
    if(count === arrData.length && month >=5) {
      await emailSignUp(findYou,month)
      return
    }else if (count === arrData.length && month <5) {
      count = 0
      arrData = []
      await emailSignUp(findYou,month)
      month++
      findYou = []
      generateDate(month)
      recursive()
    }else {
      recursive()
    }
  }
  
}

recursive()
