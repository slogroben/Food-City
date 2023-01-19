const { default: axios } = require('axios')
const express=require('express')
const getCaptch = require('../util/getCaptch')

const router=express.Router()
const JWT = require('../util/jwt')
const { stateCode } = require('../util/messageCode')
const { setString, getString } = require('../util/RedisClient')


router.get('/img',async(req, res) => {
    res.type('svg')
    // console.log(req.session);
    //对captcha.text进行加密处理
    // res.cookie('captcha',getCaptch.text.toLowerCase())
    await setString('captcah',getCaptch().text.toLowerCase(),300)
    // req.session.captcha=getCaptch().text.toLowerCase()
    res.send(getCaptch().data)
})

router.get('/verify',async(req,res)=>{
    let captcha=await getString('captcha')
    console.log(captcha);
    if(captcha==req.query.captcha){
        res.send({state:stateCode.success,msg:'验证码正确'})
        return
    }
    res.send({state:stateCode.error,msg:'验证码有误'})
})

module.exports=router