const express=require('express')
const SellerService = require('../Services/SellerService')
const router=express.Router()

const multer  = require('multer')
const upload = multer({ dest: 'D:/study/myproject/project1/src/assets/shopImg/' })


router.get('/login',(req,res)=>{
    SellerService.sellerLogin(req,res)
})

router.post('/register',upload.single('imgurl'),(req,res)=>{
    SellerService.sellerRegister(req,res)
})

router.get('/getAllSeller',(req,res)=>{
    SellerService.getAllSeller(req,res)
})
router.get('/getSeller',(req,res)=>{
    SellerService.getSeller(req,res)
})
router.get('/getSellerByID?:id',(req,res)=>{
    SellerService.getSellerByID(req,res)
})
router.get('/getMyDishes',(req,res)=>{
    SellerService.getMyDishes(req,res)
})

router.post('/pushDishe',upload.array('dishes_imgs',5),(req,res)=>{
    SellerService.pushDishe(req,res)
})

module.exports=router