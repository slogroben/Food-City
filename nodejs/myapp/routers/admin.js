const express=require('express')
const AdminService = require('../Services/AdminService')
const router=express.Router()

const multer=require('multer')
const UUID=require('uuid')
const storagePath = require('../util/storagePath')

const storageUser=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,storagePath.userImg)
    },
    filename:(req,file,cb)=>{
        cb(null,UUID.v4()+'.jpg')
    }
})
const uploadUser=multer({storage:storageUser})


router.get('/getAllUser',(req,res)=>{
    AdminService.getAllUser(req,res)
})
router.get('/getAllUserPart',(req,res)=>{
    AdminService.getAllUserPart(req,res)
})
router.get('/getAllUserNum',(req,res)=>{
    AdminService.getAllUserNum(req,res)
})
router.get('/getKeyUserPart',(req,res)=>{
    AdminService.getKeyUserPart(req,res)
})

router.get('/getUserOrder',(req,res)=>{
    AdminService.getUserOrder(req,res)
})

router.post('/reUser',uploadUser.single('reimgurl'),(req,res)=>{
    AdminService.reUser(req,res)
})

router.get('/delUser',(req,res)=>{
    AdminService.delUser(req,res)
})

router.get('/getSellerIsPass',(req,res)=>{
    AdminService.getSellerIsPass(req,res)
})
router.get('/getKeySellerIsPass',(req,res)=>{
    AdminService.getKeySellerIsPass(req,res)
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
router.get('/getKeySellerIsQuit',(req,res)=>{
    AdminService.getKeySellerIsQuit(req,res)
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
router.get('/getKeyDelSeller',(req,res)=>{
    AdminService.getKeyDelSeller(req,res)
})
router.post('/addUser',uploadUser.single('imgurl'),(req,res)=>{
    AdminService.addUser(req,res)
})

router.get('/userTypeNum',(req,res)=>{
    AdminService.userTypeNum(req,res)
})
module.exports=router