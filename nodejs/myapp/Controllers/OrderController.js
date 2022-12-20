
const mysql2=require('mysql2')
const getConfig=require('../config/mysqlConfig')

const promisePool=mysql2.createPool(getConfig()).promise()
const OrderController={
    addNoPay:async(data)=>{
        console.log(data.user_id)
        let arr=[data.order_title,data.order_img1,data.order_price,data.order_num,'nopay',data.user_id]
        try {
            await promisePool.query('INSERT INTO `order` VALUE(NULL,?,?,?,?,?,?);',arr)
            return 1
        } catch (error) {
            console.log(error);
            return 0
        }
    }
}

module.exports=OrderController