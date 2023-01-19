const redis=require('redis')

const svgCaptcha = require('svg-captcha')

function getCaptch(){
    const captcha = svgCaptcha.create({
        inverse: false, // 翻转颜色
        fontSize: 70, // 字体大小
        noise: 2, // 干扰线条数
        width:  180, // 宽度
        height:  60, // 高度
        size: 4, // 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        color: true, // 验证码是否有彩色
        background: '#cc9966', // 验证码图片背景颜色
      })
    return captcha
}


  module.exports=getCaptch