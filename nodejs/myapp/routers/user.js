const express=require('express')
const UserService = require('../Services/UserService')
const router=express.Router()


router.post('/login',(req,res)=>{
    UserService.userLogin(req,res)
})

router.get('/check',(req,res)=>{
    const {token}=req.query
    UserService.userCheck(req,res,token)
})

//菜品收藏相关
router.get('/DishesCollection',(req,res)=>{
    UserService.DishesCollection(req,res)
})

router.get('/DishesCollectionState',(req,res)=>{
    UserService.DishesCollectionState(req,res)
})

router.get('/DishesCollectionDel',(req,res)=>{
    UserService.DishesCollectionDel(req,res)
})

router.get('/DishesCollectionAll',(req,res)=>{
    UserService.DishesCollectionAll(req,res)
})

//店铺收藏相关
router.get('/ShopCollection',(req,res)=>{
    UserService.ShopCollection(req,res)
})

router.get('/ShopCollectionState',(req,res)=>{
    UserService.ShopCollectionState(req,res)
})

router.get('/ShopCollectionDel',(req,res)=>{
    UserService.ShopCollectionDel(req,res)
})

router.get('/ShopCollectionAll',(req,res)=>{
    UserService.ShopCollectionAll(req,res)
})


module.exports=router