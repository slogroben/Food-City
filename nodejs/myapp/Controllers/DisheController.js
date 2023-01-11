const mysql2=require('mysql2')
const getConfig = require('../config/mysqlConfig')

const promisePool=mysql2.createPool(getConfig()).promise()
const DisheController={
    getAllDishe:async ()=>{
        try {
            let dishelist=await promisePool.query('select * from dishes')
            return dishelist
        } catch (error) {
            return error
        }
        
    },
    getDisheByID:async (id)=>{
        try {
            let thisDisheList=await promisePool.query('select * from dishes where shop_id=?',id)
            return thisDisheList
        } catch (error) {
            return error
        } 
    },
    getDisheByDisheID:async (id)=>{
        try {
            let thisDisheList=await promisePool.query('select * from dishes where dishes_id=?',id)
            return thisDisheList[0]
        } catch (error) {
            return error
        } 
    }
}

module.exports=DisheController
