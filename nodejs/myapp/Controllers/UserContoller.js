const mysql2=require('mysql2')
const getConfig = require('../config/mysqlConfig')
const { stateCode } = require('../util/messageCode')

const promisePool=mysql2.createPool(getConfig()).promise()

const UserContoller={
    userLogin:async (username,password)=>{
        try {
            let user=await promisePool.query('select * from `user` where username=? and `password`=?',[username,password])
            return user
        } catch (err) {
            return stateCode.error
        }
    },
    DishesCollection:async(data)=>{
        let {dishes_id,user_id,dishes_title,dishes_img1}=data
        try {
            let result=await promisePool.query('insert into `dishes_collection` value(null,?,?,?,?)',[dishes_id,user_id,dishes_title,dishes_img1])
            return stateCode.success
        } catch (error) {
            return stateCode.error
        }
    },
    DishesCollectionState:async(data)=>{
        let {dishes_id,user_id}=data
        try {
            let result=await promisePool.query('select * from `dishes_collection` where dishes_id=? and user_id=? ',[dishes_id,user_id])
            return result[0][0]
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
    DishesCollectionDel:async(data)=>{
        let {dishes_id,user_id}=data
        try {
            let result=await promisePool.query('delete from `dishes_collection` where dishes_id=? and user_id=? ',[dishes_id,user_id])
            return stateCode.success
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
    DishesCollectionAll:async(data)=>{
        let {dishes_id,user_id}=data
        try {
            let list=await promisePool.query('select * from `dishes_collection` where user_id=?',user_id)
            return list[0]
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    }
    ,
    ShopCollection:async(data)=>{
        let {shop_id,user_id,shopname,imgurl}=data
        try {
            let result=await promisePool.query('insert into `shop_collection` value(null,?,?,?,?)',[shop_id,user_id,shopname,imgurl])
            return stateCode.success
        } catch (error) {
            return stateCode.error
        }
    },
    ShopCollectionState:async(data)=>{
        let {shop_id,user_id}=data
        try {
            let result=await promisePool.query('select * from `shop_collection` where shop_id=? and user_id=? ',[shop_id,user_id])
            return result[0][0]
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
    ShopCollectionDel:async(data)=>{
        let {shop_id,user_id}=data
        try {
            let result=await promisePool.query('delete from `shop_collection` where shop_id=? and user_id=? ',[shop_id,user_id])
            return stateCode.success
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
    ShopCollectionAll:async(data)=>{
        let {shop_id,user_id}=data
        try {
            let list=await promisePool.query('select * from `shop_collection` where user_id=?',user_id)
            return list[0]
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
    AddComment:async(data)=>{
        let arr=[data.score,data.comment,data.dishes_id,data.shop_id,data.order_id,data.user_id,data.time,data.username,data.imgurl]
        try {
            await promisePool.query('INSERT INTO `user_comments` VALUE(NULL,?,?,?,?,?,?,?);',arr)
            return stateCode.success
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
}

module.exports=UserContoller