const express=require('express')
const UserService = require('../Services/UserService')
const router=express.Router()


router.post('/login',(req,res)=>{
    UserService.userLogin(req,res)
})

router.get('/check',(req,res)=>{
    const {token}=req.query
    UserService.userCheck(req,res,token)
})

function header(res){
    res.header("Access-Control-Allow-Origin", "*");
}
module.exports=router