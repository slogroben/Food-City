const express=require('express')
const DisheService = require('../Services/DisheService')
const router=express.Router()

router.get('/getAllDishe',(req,res)=>{
    DisheService.getAllDishe(req,res)
})

router.get('/getDisheByID?:id',(req,res)=>{
    DisheService.getDisheByID(req,res)
})

router.get('/getDisheByDisheID?:id',(req,res)=>{
    DisheService.getDisheByDisheID(req,res)
})

module.exports=router