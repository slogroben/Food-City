const express=require('express')
const OrderService = require('../Services/OrderService')
const router=express.Router()

router.post('/add',async (req,res)=>{
    OrderService.addOrder(req,res)
})


module.exports=router