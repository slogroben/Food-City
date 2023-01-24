const express=require('express')
const app=express()

var bodyParser=require('body-parser')
var dishe=require('./routers/dishe')
var seller=require('./routers/seller')
var user=require('./routers/user')
var order=require('./routers/order')
var captcha=require('./routers/captcha')

//二进制图片处理
const multer=require('multer')

var urlname=require('url')
const JWT = require('./util/jwt')
const { stateCode, stateMsg } = require('./util/messageCode')

var cookieParser=require('cookie-parser')
app.use(cookieParser('xycode'))

const session = require('express-session')
// 使用express-session 来存放数据到session中
app.use(
    session({
        secret: 'xycode',
        saveUninitialized: false,
        resave: false,	// 强制将会话保存回会话容器
        cookie: { 
            maxAge:1000*60*5,
            secure: false 
        }
    })
)
app.listen('8080',async()=>{
    console.log('服务器启动,端口为8080');
})

// app.use(bodyParser())//express用来解析post请求中的携带的data
//解析post参数中间件
app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.all('*', function (req, res, next) {
    // 设置请求头为允许跨域
    res.header('Access-Control-Allow-Origin','*');
    // 设置服务器支持的所有头信息字段
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, sessionToken');
    // 设置服务器支持的所有跨域请求的方法
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    res.header('Access-Control-Allow-Credentials','true');
    
    if (req.method.toLowerCase() == 'options') {
        res.send(200);  // 让options尝试请求快速结束
    } else {
        next();
    }
  })
//校验token
app.use((req,res,next)=>{
    let token=req.header('Authorization')?.split(' ')[1]
    if(token){
        let payload=JWT.verify(token)
        if(payload){   
            try {
                let newtoken=JWT.generate(payload)
                res.header('Authorization',newtoken)
            } catch (error) {
                console.log(error);
            }
            next()
        }
        else{
            res.status(401).send({errCode:stateCode.tokenOutTime,errInfo:stateMsg.tokenOutTime})
        }
    }
    else{
        next()
    }
})


app.use('/user',user)
app.use('/dishe',dishe)
app.use('/seller',seller)
app.use('/order',order)
app.use('/captcha',captcha)

