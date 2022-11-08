const express=require('express')
const SellerService = require('../Services/SellerService')
const router=express.Router()

router.get('/getAllSeller',(req,res)=>{
    SellerService.getAllSeller(req,res)
})
router.get('/getSellerByID?:id',(req,res)=>{
    SellerService.getSellerByID(req,res)
})

module.exports=router