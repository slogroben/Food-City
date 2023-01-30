const express=require('express')
const SellerService = require('../Services/SellerService')
const router=express.Router()

//引入nanoid，生成图片名
const UUID=require('uuid')

const multer  = require('multer')
const storagePath = require('../util/storagePath')
const storageDishe=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,storagePath.dishesImg)
    },
    filename:(req,file,cb)=>{
        cb(null,UUID.v4()+'.jpg')
    }
})
const storageShop=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,storagePath.shopImg)
    },
    filename:(req,file,cb)=>{
        cb(null,UUID.v4()+'.jpg')
    }
})
const uploadShop = multer({ storage:storageShop})
const uploadDishes = multer({ storage:storageDishe })


router.get('/login',(req,res)=>{
    SellerService.sellerLogin(req,res)
})

router.post('/register',uploadShop.single('imgurl'),(req,res)=>{
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

router.get('/reShopState',(req,res)=>{
    SellerService.reShopState(req,res)
})

router.post('/pushDishe',uploadDishes.array('dishes_imgs',5),(req,res)=>{
    SellerService.pushDishe(req,res)
})

router.post('/deleteDishe',(req,res)=>{
    SellerService.deleteDishe(req,res)
})

router.post('/reDishe',uploadDishes.any(),(req,res)=>{
    SellerService.reDishe(req,res)
})


module.exports=router