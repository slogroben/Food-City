const express=require('express')
const app=express()

var bodyParser=require('body-parser')
var dishe=require('./routers/dishe')
var seller=require('./routers/seller')
var user=require('./routers/user')



app.listen('8080',()=>{
    console.log('服务器启动,端口为8080');
})

// app.use(bodyParser())//express用来解析post请求中的携带的data
//解析post参数中间件
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/user',user)
app.use('/dishe',dishe)
app.use('/seller',seller)

