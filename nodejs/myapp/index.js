const express=require('express')
const app=express()
var dishe=require('./routers/dishe')
var seller=require('./routers/seller')

app.listen('8080',()=>{
    console.log('服务器启动,端口为8080');
})


app.use('/dishe',dishe)
app.use('/seller',seller)

