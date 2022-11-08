const mysql2=require('mysql2')
const getConfig = require('../config/mysqlConfig')

const promisePool=mysql2.createPool(getConfig()).promise()
const SellerController={
    getAllSeller:async ()=>{
        let sellerlist=await promisePool.query('select * from shop')
        return sellerlist
    },
    getSellerByID:async (id)=>{
        let thisSellerList=await promisePool.query('select * from shop where shop_id=?',id)
        return thisSellerList
    }
}

module.exports=SellerController