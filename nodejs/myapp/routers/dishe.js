const express=require('express')
const DisheService = require('../Services/DisheService')
const router=express.Router()

router.get('/getAllDishe',(req,res)=>{
    DisheService.getAllDishe(req,res)
})

module.exports=router