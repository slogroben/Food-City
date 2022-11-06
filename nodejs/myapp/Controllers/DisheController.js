const mysql2=require('mysql2')
const getConfig = require('../config/mysqlConfig')


const DisheController={
    getAllDishe:async ()=>{
        const promisePool=mysql2.createPool(getConfig()).promise()
        let dishelist=await promisePool.query('select * from dishes')
        return dishelist
    }
}

module.exports=DisheController
