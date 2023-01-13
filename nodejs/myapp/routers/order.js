const express=require('express')
const OrderService = require('../Services/OrderService')
const router=express.Router()

router.post('/add',(req,res)=>{
    OrderService.addOrder(req,res)
})

router.get('/find',(req,res)=>{
    OrderService.findOrder(req,res)
})

router.put('/change',(req,res)=>{
    OrderService.changeNum(req,res)
})

router.get('/delete',(req,res)=>{
    OrderService.delete(req,res)
})

router.put('/restate',(req,res)=>{
    OrderService.reState(req,res)
})

router.get('/findAll',(req,res)=>{
    OrderService.findAll(req,res)
})

router.get('/findByUserID',(req,res)=>{
    OrderService.findByUserID(req,res)
})

module.exports=router