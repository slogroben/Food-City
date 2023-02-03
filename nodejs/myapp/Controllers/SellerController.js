const mysql2=require('mysql2')
const getConfig = require('../config/mysqlConfig')
const { stateCode, shopstate, userType } = require('../util/messageCode')

const promisePool=mysql2.createPool(getConfig()).promise()
const SellerController={
    sellerLogin:async (phone)=>{
        try {
            let seller=await promisePool.query('select * from shop where sellerphone=?',phone)
            return seller[0][0]
        } catch (error) {
            console.log(error);
            return stateCode.error
        } 
    },
    sellerRegister:async (data)=>{
        let arr=[
            data.shopname,
            data.area,
            data.address,
            data.shoptype ,
            data.state,
            data.shopphone ,
            data.worktime,
            data.imgurl,
            data.description,
            data.sellerphone,
            data.ispass,
            data.shopstate,
            data.user_id,
        ]
        try {
            await promisePool.query('insert into `shop` value(null,?,?,?,?,?,?,?,?,?,?,?,?,?)',arr)
            let seller=await promisePool.query('select * from `shop` where user_id=?',data.user_id)
            await promisePool.query('update `user` set `type`=?,shop_id=? where `id`=?',[userType.seller,seller[0][0].shop_id,data.user_id])
            return stateCode.success
        } catch (error) {
            console.log(error);
            return stateCode.error
        } 
    },
    getAllSeller:async ()=>{
        try {
            let sellerlist=await promisePool.query('select * from shop where shopstate=?',shopstate.operate)
            return sellerlist
        } catch (error) {
            console.log(error);
            return stateCode.error
        }  
    },
    getSeller:async (shop_id)=>{
        try {
            let seller=await promisePool.query('select * from shop where shop_id=?',shop_id)
            return seller[0]
        } catch (error) {
            console.log(error);
            return stateCode.error
        }  
    },
    getSellerByID:async (id)=>{
        try {
            let thisSellerList=await promisePool.query('select * from shop where shop_id=?',id)
            return thisSellerList
        } catch (error) {
            console.log(error);
            return stateCode.error
        } 
    },
    getMyDishes:async (shop_id)=>{
        try {
            let dishes=await promisePool.query('select * from dishes where shop_id=?',shop_id)
            return dishes[0]
        } catch (error) {
            console.log(error);
            return stateCode.error
        } 
    },
    reShopState:async (shop_id,state)=>{
        try {
            await promisePool.query('update `shop` set shopstate=? where shop_id=?',[state,shop_id])
            return stateCode.success
        } catch (error) {
            console.log(error);
            return stateCode.error
        } 
    },
    pushDishe:async (data)=>{
        let arr=[
            data.dishes_title,
            data.dishes_type,
            data.img1,
            data.img2,
            data.img3,
            data.img4,
            data.img5,
            data.dishes_price,
            data.dishes_description,
            data.shop_id
        ]
        try {
            await promisePool.query('insert into `dishes` value(null,?,?,?,?,?,?,?,?,?,?)',arr)
            return stateCode.success
        } catch (error) {
            console.log(error);
            return stateCode.error
        } 
    },
    deleteDishe:async (data)=>{
        try {
            await promisePool.query('delete from `dishes` where dishes_id=?',data.dishes_id)
            return stateCode.success
        } catch (error) {
            console.log(error);
            return stateCode.error
        } 
    },
    reDishe:async (data)=>{
        let arr=[
            data.dishes_title,
            data.dishes_type,
            data.dishes_img1,
            data.dishes_img2,
            data.dishes_img3,
            data.dishes_img4,
            data.dishes_img5,
            data.dishes_price,
            data.dishes_description,
            data.dishes_id
        ]
        try {
            await promisePool.query(
                'update `dishes` set dishes_title=?,dishes_type=?,dishes_img1=?,dishes_img2=?,dishes_img3=?,dishes_img4=?,dishes_img5=?,dishes_price=?,dishes_description=? where dishes_id=?'
                ,arr)
            return stateCode.success
        } catch (error) {
            console.log(error);
            return stateCode.error
        } 
    },
    
}

module.exports=SellerController