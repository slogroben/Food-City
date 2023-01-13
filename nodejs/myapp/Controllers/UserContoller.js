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
        
    }
}

module.exports=UserContoller