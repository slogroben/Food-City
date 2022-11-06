const express=require('express')
const SellerService = require('../Services/SellerService')
const router=express.Router()

router.get('/getAllSeller',(req,res)=>{
    SellerService.getAllSeller(req,res)
})

module.exports=router