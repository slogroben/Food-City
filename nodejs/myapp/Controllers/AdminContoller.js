const mysql2=require('mysql2')
const getConfig = require('../config/mysqlConfig')
const { userType, stateCode, shopstate } = require('../util/messageCode')

const promisePool=mysql2.createPool(getConfig()).promise()
const AdminContoller={
    getAllUser:async()=>{
        try {
            let userlist=await promisePool.query('select * from `user` where type!=?',userType.root)
            return userlist[0]
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
    getAllUserPart:async(data)=>{
        try {
            let userlist=await promisePool.query('select * from `user` where type!=? limit ? offset ?',[userType.root,data.limit,data.offset])
            return userlist[0]
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
    getAllUserNum:async()=>{
        try {
            let userlist=await promisePool.query('select * from `user` where type!=?',userType.root)
            return userlist[0].length
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
    getKeyUserPart:async(data)=>{
        try {
            data.keyword='%'+data.keyword+"%"
            let userlist=await promisePool.query('select * from `user` where type!=? and username like ? limit ? offset ?',[userType.root,data.keyword,data.limit,data.offset])
            let userlistAll=await promisePool.query('select * from `user` where type!=? and username like ?',[userType.root,data.keyword])
            return {userlist:userlist[0],num:userlistAll[0].length}
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
    getUserOrder:async(user_id)=>{
        try {
            let orderlist=await promisePool.query('select * from `order` where user_id=?',user_id)
            return orderlist[0]
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
    reUser:async(data)=>{
        let arr=[
            data.username,
            data.password,
            data.phone,
            data.imgname,
            data.id
        ]
        try {
            let orderlist=await promisePool.query(
                'update `user` set username=?,password=?,phone=?,imgurl=? where id=?'
                ,arr)
            return stateCode.success
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
    delUser:async(user_id)=>{
        try {
            await promisePool.query(
                'delete from `user` where id=?'
                ,user_id)
            return stateCode.success
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
    getSellerIsPass:async(data)=>{
        try {
            let sellerList=await promisePool.query('select * from `shop` where shopstate=? limit ? offset ?',[shopstate.review,data.limit,data.offset])
            return sellerList[0]
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
    getKeySellerIsPass:async(data)=>{
        try {
            data.keyword='%'+data.keyword+"%"
            let sellerlist=await promisePool.query('select * from `shop` where shopstate=? and shopname like ? limit ? offset ?',[shopstate.review,data.keyword,data.limit,data.offset])
            let sellerlistAll=await promisePool.query('select * from `shop` where shopstate=? and shopname like ?',[shopstate.review,data.keyword])
            return {sellerlist:sellerlist[0],num:sellerlistAll[0].length}
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
    getSellerIsPassNum:async()=>{
        try {
            let sellerlist=await promisePool.query('select * from `shop` where shopstate=?',shopstate.review)
            return sellerlist[0].length
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
    reSellerState:async(data)=>{
        try {
            await promisePool.query('update `shop` set shopstate=? where shop_id=?',[data.shopstate,data.shop_id])
            return stateCode.success
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
    getSellerIsQuit:async(data)=>{
        try {
            let sellerList=await promisePool.query('select * from `shop` where shopstate=? limit ? offset ?',[shopstate.isquit,data.limit,data.offset])
            return sellerList[0]
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
    getKeySellerIsQuit:async(data)=>{
        try {
            data.keyword='%'+data.keyword+"%"
            let sellerlist=await promisePool.query('select * from `shop` where shopstate=? and shopname like ? limit ? offset ?',[shopstate.isquit,data.keyword,data.limit,data.offset])
            let sellerlistAll=await promisePool.query('select * from `shop` where shopstate=? and shopname like ?',[shopstate.isquit,data.keyword])
            return {sellerlist:sellerlist[0],num:sellerlistAll[0].length}
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
    getSellerIsQuitNum:async()=>{
        try {
            let sellerlist=await promisePool.query('select * from `shop` where shopstate=?',shopstate.isquit)
            return sellerlist[0].length
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
    getOperateShop:async(data)=>{
        try {
            let sellerlist=await promisePool.query('select * from `shop` where shopstate=? limit ? offset ?',[shopstate.operate,data.limit,data.offset])
            return sellerlist[0]
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
    getOperateShopNum:async()=>{
        try {
            let sellerlist=await promisePool.query('select * from `shop` where shopstate=?',shopstate.operate)
            return sellerlist[0].length
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
    delSeller:async(user_id)=>{
        try {
            await promisePool.query(
                'delete from `shop` where shop_id=?'
                ,user_id)
            return stateCode.success
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
    getKeyDelSeller:async(data)=>{
        try {
            data.keyword='%'+data.keyword+"%"
            let sellerlist=await promisePool.query('select * from `shop` where shopstate=? and shopname like ? limit ? offset ?',[shopstate.operate,data.keyword,data.limit,data.offset])
            let sellerlistAll=await promisePool.query('select * from `shop` where shopstate=? and shopname like ?',[shopstate.operate,data.keyword])
            return {sellerlist:sellerlist[0],num:sellerlistAll[0].length}
        } catch (error) {
            console.log(error);
            return stateCode.error
        }
    },
    addUser:async (data)=>{
        let {username,password,phone,imgurl,type}=data
        try {
            let result=await promisePool.query('insert into `user` value(null,?,?,?,?,?,null)',[username,password,phone,imgurl,type])
            return stateCode.success
        } catch (err) {
            return stateCode.error
        }
    },
    getUserByID:async (id)=>{
        try {
            let user=await promisePool.query('select * from `user` where id=?',id)
            return user[0]
        } catch (err) {
            return stateCode.error
        }
    },
    getSellerByID:async (shop_id)=>{
        try {
            let seller=await promisePool.query('select * from `shop` where shop_id=?',shop_id)
            return seller[0]
        } catch (err) {
            return stateCode.error
        }
    },
    userTypeNum:async ()=>{
        try {
            let data={}
            let rootNum=await promisePool.query('select * from `user` where type=?',userType.root)
            let sellerNum=await promisePool.query('select * from `user` where type=?',userType.seller)
            let NormalNum=await promisePool.query('select * from `user` where type=?',userType.Normal)
            data[userType.root]=rootNum[0].length
            data[userType.seller]=sellerNum[0].length
            data[userType.Normal]=NormalNum[0].length
            return data
        } catch (err) {
            console.log(err);
            return stateCode.error
        }
    },
}




module.exports=AdminContoller