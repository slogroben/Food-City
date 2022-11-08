const mysql2=require('mysql2')
const getConfig = require('../config/mysqlConfig')

const promisePool=mysql2.createPool(getConfig()).promise()
const DisheController={
    getAllDishe:async ()=>{
        let dishelist=await promisePool.query('select * from dishes')
        return dishelist
    },
    getDisheByID:async (id)=>{
        let thisDisheList=await promisePool.query('select * from dishes where shop_id=?',id)
        return thisDisheList
    }
}

module.exports=DisheController
