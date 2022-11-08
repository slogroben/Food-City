const mysql2=require('mysql2')
const getConfig = require('../config/mysqlConfig')

const promisePool=mysql2.createPool(getConfig()).promise()

const UserContoller={
    userLogin:async (username,password)=>{
        let user=await promisePool.query('select * from `user` where username=? and `password`=?',[username,password])
        return user
    }
}

module.exports=UserContoller