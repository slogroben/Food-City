
const mysql2=require('mysql2')
const getConfig=require('../config/mysqlConfig')
const { orderState, stateCode } = require('../util/messageCode')

const promisePool=mysql2.createPool(getConfig()).promise()
const OrderController={
    addOrder:async(data)=>{
        let arr=[data.order_title,data.order_img1,data.order_price,data.order_num,data.order_state,data.user_id,data.dishes_id,data.time]
        try {
            await promisePool.query('INSERT INTO `order` VALUE(NULL,?,?,?,?,?,?,?,?);',arr)
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
                'SELECT * FROM `order` WHERE order_state=? AND user_id=? UNION SELECT * FROM `order` WHERE order_state=? AND user_id=?;'
                ,[orderState.Pay,user_id,orderState.noPay,user_id])
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
            let result=await promisePool.query('delete from `order` where order_id=? and user_id=?',[order_id,user_id])
            return result
        } catch (error) {
            console.log(error);
            return error
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
    }
}

module.exports=OrderController