
const mysql2=require('mysql2')
const getConfig=require('../config/mysqlConfig')
const { orderState, stateCode, shopstate } = require('../util/messageCode')

const promisePool=mysql2.createPool(getConfig()).promise()
const OrderController={
    addOrder:async(data)=>{  
        try {
            let dishe=await promisePool.query('select * from `dishes` where dishes_id=?',data.dishes_id)
            let arr=[data.order_title,data.order_img1,data.order_price,data.order_num,data.order_state,data.user_id,data.dishes_id,dishe[0][0].shop_id,data.time]
            await promisePool.query('INSERT INTO `order` VALUE(NULL,?,?,?,?,?,?,?,?,?);',arr)
            return stateCode.success
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
    findOrder:async(state,user_id)=>{
        try {
            let data=await promisePool.query('select * from `order` where order_state=? and user_id=?',[state,user_id])
            return data[0]
        } catch (error) {
            console.log(error);
            return error
        }
    },
    findAll:async(user_id)=>{
        try {
            let data=await promisePool.query(
                'SELECT * FROM `order` WHERE order_state!=? AND user_id=?;'
                ,[orderState.shopCart,user_id])
            return data[0]
        } catch (error) {
            console.log(error);
            return error
        }
    },
    changeNum:async(order_id,order_num,user_id)=>{
        try {
            let result=await promisePool.query('update `order` set order_num=? where order_id=? and user_id',[order_num,order_id,user_id])
            return result
        } catch (error) {
            console.log(error);
            return error
        }
    },
    delete:async(order_id,user_id)=>{
        try {
            await promisePool.query('delete from `user_comments` where order_id=? and user_id=?',[order_id,user_id])
            let result=await promisePool.query('delete from `order` where order_id=? and user_id=?',[order_id,user_id])
            return stateCode.success
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
    reState:async(state,time,order_id,user_id)=>{
        try {
            let result=await promisePool.query('update `order` set order_state=?,time=? where order_id=? and user_id=?',[state,time,order_id,user_id])
            return result
        } catch (error) {
            console.log(error);
            return error
        }
    },
    findByUserID:async(user_id)=>{
        try {
            let data=await promisePool.query('SELECT * FROM `order` WHERE user_id=?;',user_id)
            return data[0]
        } catch (error) {
            console.log(error);
            return error
        }
    },
    findByShopID:async(data)=>{
        let arr=[data.shop_id,data.state]
        try {
            let data=await promisePool.query('SELECT * FROM `order` WHERE shop_id=? and order_state=?;',arr)
            return data[0]
        } catch (error) {
            console.log(error);
            return error
        }
    },
    getOrderStateNum:async (shop_id)=>{
        try {
            let data={}
            console.log(shop_id);
            let shopCart=await promisePool.query('select * from `order` where order_state=? and shop_id=?',[orderState.shopCart,shop_id])
            let noPay=await promisePool.query('select * from `order` where order_state=? and shop_id=?',[orderState.noPay,shop_id])
            let Pay=await promisePool.query('select * from `order` where order_state=? and shop_id=?',[orderState.Pay,shop_id])
            let finish=await promisePool.query('select * from `order` where order_state=? and shop_id=?',[orderState.finish,shop_id])
            let Evaluated=await promisePool.query('select * from `order` where order_state=? and shop_id=?',[orderState.Evaluated,shop_id])
            data[orderState.shopCart]=shopCart[0].length
            data[orderState.noPay]=noPay[0].length
            data[orderState.Pay]=Pay[0].length
            data[orderState.finish]=finish[0].length
            data[orderState.Evaluated]=Evaluated[0].length
            return data
        } catch (err) {
            console.log(err);
            return stateCode.error
        }
    },
}

module.exports=OrderController