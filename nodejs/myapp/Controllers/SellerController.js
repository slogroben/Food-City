const mysql2=require('mysql2')
const getConfig = require('../config/mysqlConfig')
const { stateCode, shopstate, userType } = require('../util/messageCode')

const promisePool=mysql2.createPool(getConfig()).promise()
const SellerController={
    sellerLogin:async (phone)=>{
        try {
            let seller=await promisePool.query('select * from shop where sellerphone=?',phone)
            return seller[0][0]
        } catch (error) {
            console.log(error);
            return stateCode.error
        } 
    },
    sellerRegister:async (data)=>{
        let arr=[
            data.shopname,
            data.area,
            data.address,
            data.shoptype ,
            data.state,
            data.shopphone ,
            data.worktime,
            data.imgurl,
            data.description,
            data.sellerphone,
            data.ispass,
            data.shopstate,
            data.user_id,
        ]
        try {
            let seller=await promisePool.query('insert into `shop` value(null,?,?,?,?,?,?,?,?,?,?,?,?,?)',arr)
            await promisePool.query('update `user` set `type`=? where `id`=?',[userType.seller,data.user_id])
            return stateCode.success
        } catch (error) {
            console.log(error);
            return stateCode.error
        } 
    },
    getAllSeller:async ()=>{
        try {
            let sellerlist=await promisePool.query('select * from shop where shopstate=?',shopstate.operate)
            return sellerlist
        } catch (error) {
            console.log(error);
            return stateCode.error
        }  
    },
    getSeller:async (shop_id)=>{
        try {
            let seller=await promisePool.query('select * from shop where shop_id=?',shop_id)
            return seller[0]
        } catch (error) {
            console.log(error);
            return stateCode.error
        }  
    },
    getSellerByID:async (id)=>{
        try {
            let thisSellerList=await promisePool.query('select * from shop where shop_id=?',id)
            return thisSellerList
        } catch (error) {
            console.log(error);
            return stateCode.error
        } 
    },
    getMyDishes:async (shop_id)=>{
        try {
            let dishes=await promisePool.query('select * from dishes where shop_id=?',shop_id)
            return dishes[0]
        } catch (error) {
            console.log(error);
            return stateCode.error
        } 
    }
}

module.exports=SellerController