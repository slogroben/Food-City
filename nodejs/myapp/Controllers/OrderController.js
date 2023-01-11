
const mysql2=require('mysql2')
const getConfig=require('../config/mysqlConfig')
const { orderState } = require('../util/messageCode')

const promisePool=mysql2.createPool(getConfig()).promise()
const OrderController={
    addNoPay:async(data)=>{
        let arr=[data.order_title,data.order_img1,data.order_price,data.order_num,orderState.shopCart,data.user_id]
        try {
            await promisePool.query('INSERT INTO `order` VALUE(NULL,?,?,?,?,?,?);',arr)
            return 1
        } catch (error) {
            console.log(error);
            return 0
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
    findAll:async(state,user_id)=>{
        try {
            let data=await promisePool.query('select * from `order` where order_state=? or order_state=? and user_id=?',[orderState.Pay,orderState.noPay,user_id])
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
    reState:async(state,order_id,user_id)=>{
        try {
            let result=await promisePool.query('update `order` set order_state=? where order_id=? and user_id=?',[state,order_id,user_id])
            return result
        } catch (error) {
            console.log(error);
            return error
        }
    }
}

module.exports=OrderController