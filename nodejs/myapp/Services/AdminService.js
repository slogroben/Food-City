const AdminContoller = require("../Controllers/AdminContoller")
const { stateCode, stateMsg } = require("../util/messageCode")

const fs=require('fs')
const UserContoller = require("../Controllers/UserContoller")
const fileOperation = require("../util/fileOperation")

const AdminService={
    getAllUser:async(req,res)=>{
        let userlist=await AdminContoller.getAllUser()
        if(userlist){
            res.send(userlist)
        }else{
            res.send(res.send({state:stateCode.error,msg:stateMsg.error}))
        }
    },
    getAllUserPart:async(req,res)=>{
        req.query.limit=req.query.limit-0
        req.query.offset=req.query.offset-0
        let userlist=await AdminContoller.getAllUserPart(req.query)
        if(userlist){
            res.send(userlist)
        }else{
            res.send(res.send({state:stateCode.error,msg:stateMsg.error}))
        }
    },
    getAllUserNum:async(req,res)=>{
        let userlistNum=await AdminContoller.getAllUserNum()
        if(userlistNum){
            res.send({userNum:userlistNum})
        }else{
            res.send(res.send({state:stateCode.error,msg:stateMsg.error}))
        }
    },
    getKeyUserPart:async(req,res)=>{
        req.query.limit=req.query.limit-0
        req.query.offset=req.query.offset-0
        let data=await AdminContoller.getKeyUserPart(req.query)
        if(data){
            res.send({data:data.userlist,num:data.num})
        }else{
            res.send(res.send({state:stateCode.error,msg:stateMsg.error}))
        }
    },
    getUserOrder:async(req,res)=>{
        let user_id=req.query.user_id
        let userOrder=await AdminContoller.getUserOrder(user_id)
        if(userOrder){
            res.send(userOrder)
        }else{
            res.send({state:stateCode.error,msg:stateMsg.error})
        }
    },
    reUser:async(req,res)=>{
        req.body.imgname=req.file.filename
        let result=await AdminContoller.reUser(req.body)
        if(result){
            if(req.imgurl){
                fileOperation.delUser(req.imgurl)
            }
            res.send({state:stateCode.success,msg:stateMsg.success})
        }else{
            res.send({state:stateCode.error,msg:stateMsg.error})
        }
    },
    delUser:async(req,res)=>{
        let user_id=req.query.user_id
        let user=await AdminContoller.getUserByID(user_id)
        if(user[0]&&user[0].imgurl){
            await fileOperation.delUser(user[0].imgurl)
         }
        let result=await AdminContoller.delUser(user_id)
        if(result){
            res.send({state:stateCode.success,msg:stateMsg.success})
        }else{
            res.send({state:stateCode.error,msg:stateMsg.error})
        }
    },
    getSellerIsPass:async(req,res)=>{
        req.query.limit=req.query.limit-0
        req.query.offset=req.query.offset-0
        let userlist=await AdminContoller.getSellerIsPass(req.query)
        if(userlist){
            res.send(userlist)
        }else{
            res.send({state:stateCode.error,msg:stateMsg.error})
        }
    },
    getKeySellerIsPass:async(req,res)=>{
        req.query.limit=req.query.limit-0
        req.query.offset=req.query.offset-0
        let data=await AdminContoller.getKeySellerIsPass(req.query)
        if(data){
            res.send({data:data.sellerlist,num:data.num})
        }else{
            res.send(res.send({state:stateCode.error,msg:stateMsg.error}))
        }
    },
    getSellerIsPassNum:async(req,res)=>{
        let sellerlistNum=await AdminContoller.getSellerIsPassNum()
        if(sellerlistNum){
            res.send({sellerNum:sellerlistNum})
        }else{
            res.send({state:stateCode.error,msg:stateMsg.error})
        }
    },
    reSellerState:async(req,res)=>{
        let result=await AdminContoller.reSellerState(req.query)
        if(result){
            res.send({state:stateCode.success,msg:stateMsg.success})
        }else{
            res.send({state:stateCode.error,msg:stateMsg.error})
        }
    },
    getSellerIsQuit:async(req,res)=>{
        req.query.limit=req.query.limit-0
        req.query.offset=req.query.offset-0
        let userlist=await AdminContoller.getSellerIsQuit(req.query)
        if(userlist){
            res.send(userlist)
        }else{
            res.send({state:stateCode.error,msg:stateMsg.error})
        }
    },
    getKeySellerIsQuit:async(req,res)=>{
        req.query.limit=req.query.limit-0
        req.query.offset=req.query.offset-0
        let data=await AdminContoller.getKeySellerIsQuit(req.query)
        if(data){
            res.send({data:data.sellerlist,num:data.num})
        }else{
            res.send(res.send({state:stateCode.error,msg:stateMsg.error}))
        }
    },
    getSellerIsQuitNum:async(req,res)=>{
        let sellerlistNum=await AdminContoller.getSellerIsQuitNum()
        if(sellerlistNum){
            res.send({sellerNum:sellerlistNum})
        }else{
            res.send({state:stateCode.error,msg:stateMsg.error})
        }
    },
    getOperateShop:async(req,res)=>{
        req.query.limit=req.query.limit-0
        req.query.offset=req.query.offset-0
        let sellerlist=await AdminContoller.getOperateShop(req.query)
        if(sellerlist){
            res.send(sellerlist)
        }else{
            res.send({state:stateCode.error,msg:stateMsg.error})
        }
    },
    getOperateShopNum:async(req,res)=>{
        let sellerlistNum=await AdminContoller.getOperateShopNum()
        if(sellerlistNum){
            res.send({sellerNum:sellerlistNum})
        }else{
            res.send({state:stateCode.error,msg:stateMsg.error})
        }
    },
    delSeller:async(req,res)=>{
        let shop_id=req.query.shop_id
        let seller=await AdminContoller.getSellerByID(shop_id)
        if(seller[0]&&seller[0].imgurl){
            await fileOperation.delSeller(seller[0].imgurl)
        }
        let result=await AdminContoller.delSeller(shop_id)
        if(result){
            res.send({state:stateCode.success,msg:stateMsg.success})
        }else{
            res.send({state:stateCode.error,msg:stateMsg.error})
        }
    },
    getKeyDelSeller:async(req,res)=>{
        req.query.limit=req.query.limit-0
        req.query.offset=req.query.offset-0
        let data=await AdminContoller.getKeyDelSeller(req.query)
        if(data){
            res.send({data:data.sellerlist,num:data.num})
        }else{
            res.send(res.send({state:stateCode.error,msg:stateMsg.error}))
        }
    },
    addUser:async (req,res)=>{
        req.body.imgurl=req.file.filename
        let result=await AdminContoller.addUser(req.body)
        if(result==stateCode.success){
            res.send({state:stateCode.success})
        }
        else{
            res.send({state:stateCode.error})
        }
    },
    userTypeNum:async (req,res)=>{
        let data=await AdminContoller.userTypeNum()
        if(data){
            res.send(data)
        }
        else{
            res.send({state:stateCode.error})
        }
    },
}



module.exports=AdminService