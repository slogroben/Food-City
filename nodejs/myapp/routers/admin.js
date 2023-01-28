const express=require('express')
const AdminService = require('../Services/AdminService')
const router=express.Router()

router.get('/getAllUser',(req,res)=>{
    AdminService.getAllUser(req,res)
})
router.get('/getAllUserPart',(req,res)=>{
    AdminService.getAllUserPart(req,res)
})
router.get('/getAllUserNum',(req,res)=>{
    AdminService.getAllUserNum(req,res)
})

router.get('/getUserOrder',(req,res)=>{
    AdminService.getUserOrder(req,res)
})

router.post('/reUser',(req,res)=>{
    AdminService.reUser(req,res)
})

router.get('/delUser',(req,res)=>{
    AdminService.delUser(req,res)
})

router.get('/getSellerIsPass',(req,res)=>{
    AdminService.getSellerIsPass(req,res)
})

router.get('/getSellerIsPassNum',(req,res)=>{
    AdminService.getSellerIsPassNum(req,res)
})

router.get('/reSellerState',(req,res)=>{
    AdminService.reSellerState(req,res)
})

router.get('/getSellerIsQuit',(req,res)=>{
    AdminService.getSellerIsQuit(req,res)
})

router.get('/getSellerIsQuitNum',(req,res)=>{
    AdminService.getSellerIsQuitNum(req,res)
})

router.get('/getOperateShop',(req,res)=>{
    AdminService.getOperateShop(req,res)
})
router.get('/getOperateShopNum',(req,res)=>{
    AdminService.getOperateShopNum(req,res)
})

router.get('/delSeller',(req,res)=>{
    AdminService.delSeller(req,res)
})

module.exports=router