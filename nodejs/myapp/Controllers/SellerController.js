const mysql2=require('mysql2')
const getConfig = require('../config/mysqlConfig')


const SellerController={
    getAllSeller:async ()=>{
        const promisePool=mysql2.createPool(getConfig()).promise()
        let sellerlist=await promisePool.query('select * from shop')
        return sellerlist
    }
}

module.exports=SellerController