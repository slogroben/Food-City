const express=require('express')
const app=express()

var bodyParser=require('body-parser')
var dishe=require('./routers/dishe')
var seller=require('./routers/seller')
var user=require('./routers/user')
var order=require('./routers/order')

var urlname=require('url')
const JWT = require('./util/jwt')
const { stateCode } = require('./util/messageCode')




app.listen('8080',()=>{
    console.log('服务器启动,端口为8080');
})

// app.use(bodyParser())//express用来解析post请求中的携带的data
//解析post参数中间件
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.all('*', function (req, res, next) {
    // 设置请求头为允许跨域
    res.header('Access-Control-Allow-Origin', '*');
    // 设置服务器支持的所有头信息字段
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, sessionToken');
    // 设置服务器支持的所有跨域请求的方法
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
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
            res.status(401).send({errCode:stateCode.tokenOutTime,errInfo:'token过期'})
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

