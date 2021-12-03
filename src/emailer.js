const nodemailer = require('nodemailer')
// const html = require('./index.html')
const emailParams = require('../config/index')
const log = require('../log')

const { user, to, pass, from } = emailParams


let transporter = nodemailer.createTransport({
  host: 'smtp.163.com',//使用内置的163发送邮件  
  // port: 587,
  secure: true, // 是否使用tls加密。默认为false，当我们设置为true时，建议端口设置为465
  auth: {
    user,
    pass,
  },
})

// 邮件服务器准备
const emailSignUp = (data, month) => {

  log.info('data',data)

  return new Promise ((resolve,reject) => {
    let html = '<h2>找到的人</h2>';

    data.forEach(item => {
      html+= `<div>
                <img src=${ item.headimg_url } />
                <div>名字：${ item.nickname }</div>
                <div>微信名：${ item.wechatNumber }</div>
              </div>`
    })



    // 发送信息的内容
    let options = {
      from,  // 这里是你开启SMTP服务的QQ邮箱号
      to,  // 这个是前端注册页面输入的邮箱号
      subject: `FindYou--${ month }月`,
      html,
      // attachments: [
      //   {
      //     filename: 'circle.svg',
      //     path: './circle.svg'
      //   },
      //   {
      //     filename: 'content',
      //     content: 'content-content'
      //   }
      // ]  // 附件
    }

    // 发送邮件
    transporter.sendMail(options, (err, msg) => {
      if (err) {
        resolve('邮箱发送失败')
        return log.info('邮箱发送失败')
      } else {
        resolve('邮箱发送失败')
        return log.info('邮箱发送成功')
      }
    })
  })
}

module.exports = emailSignUp
