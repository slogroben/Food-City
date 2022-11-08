const express=require('express')
const UserService = require('../Services/UserService')
const router=express.Router()


router.post('/login',(req,res)=>{
    UserService.userLogin(req,res)
})

module.exports=router