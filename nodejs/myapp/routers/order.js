const express=require('express')
const OrderService = require('../Services/OrderService')
const router=express.Router()

router.post('/add',(req,res)=>{
    OrderService.addOrder(req,res)
})

router.get('/find',(req,res)=>{
    OrderService.findOrder(req,res)
})


module.exports=router