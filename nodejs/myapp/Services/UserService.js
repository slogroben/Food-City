const UserContoller = require("../Controllers/UserContoller")
const DisheController = require("../Controllers/DisheController")
const OrderController = require("../Controllers/OrderController")

const getTime = require("../util/getTime")
const JWT = require("../util/jwt")
const { stateCode } = require("../util/messageCode")

const UserService={
    userRegister:async (req,res)=>{
        let result=await UserContoller.userRegister(req.body)
        if(result==stateCode.success){
            res.send({state:stateCode.success})
        }
        else{
            res.send({state:stateCode.error})
        }
    },
    userLogin:async (req,res)=>{
        const {username,password}=req.body
        let user=await UserContoller.userLogin(username,password)
        if(user[0].length){
            user=user[0][0]
            let token=JWT.generate(user)
            res.header('Authorization',token)
            //暴露Authorization
            res.setHeader("Access-Control-Expose-Headers", "Authorization");
            res.end()
        }
        else{
            res.status(401).send({errCode:stateCode.error})
        }
    },
    userCheck:async (req,res,token)=>{
        let user=JWT.verify(token)
        const {username,password}=user
        user=await UserContoller.userLogin(username,password)
        user=user[0][0]
        if(user){
            let token=JWT.generate(user)
            res.send({user,token,state:stateCode.success})
        }
        else{
            res.send({state:stateCode.error})
        }
    },
    DishesCollection:async (req,res)=>{
        let user_id=getUserId(req)
        req.query.user_id=user_id
        let result=await UserContoller.DishesCollection(req.query)
        if(result==stateCode.success){
            res.send({state:stateCode.success})
        }
        else{
            res.send({state:stateCode.error})
        }
    },
    DishesCollectionState:async (req,res)=>{
        let user_id=getUserId(req)
        req.query.user_id=user_id
        let result=await UserContoller.DishesCollectionState(req.query)
        if(result){
            res.send({state:stateCode.success})
        }
        else{
            res.send({state:stateCode.error})
        }
    },
    DishesCollectionDel:async (req,res)=>{
        let user_id=getUserId(req)
        req.query.user_id=user_id
        let result=await UserContoller.DishesCollectionDel(req.query)
        if(result==stateCode.success){
            res.send({state:stateCode.success})
        }
        else{
            res.send({state:stateCode.error})
        }
    },
    DishesCollectionAll:async (req,res)=>{
        let user_id=getUserId(req)
        req.query.user_id=user_id
        let list=await UserContoller.DishesCollectionAll(req.query)
        if(list){
            res.send(list)
        }
        else{
            res.send({state:stateCode.error})
        }
    },

    ShopCollection:async (req,res)=>{
        let user_id=getUserId(req)
        req.query.user_id=user_id
        let result=await UserContoller.ShopCollection(req.query)
        if(result==stateCode.success){
            res.send({state:stateCode.success})
        }
        else{
            res.send({state:stateCode.error})
        }
    },
    ShopCollectionState:async (req,res)=>{
        let user_id=getUserId(req)
        req.query.user_id=user_id
        let result=await UserContoller.ShopCollectionState(req.query)
        if(result){
            res.send({state:stateCode.success})
        }
        else{
            res.send({state:stateCode.error})
        }
    },
    ShopCollectionDel:async (req,res)=>{
        let user_id=getUserId(req)
        req.query.user_id=user_id
        let result=await UserContoller.ShopCollectionDel(req.query)
        if(result==stateCode.success){
            res.send({state:stateCode.success})
        }
        else{
            res.send({state:stateCode.error})
        }
    },
    ShopCollectionAll:async (req,res)=>{
        let user_id=getUserId(req)
        req.query.user_id=user_id
        let list=await UserContoller.ShopCollectionAll(req.query)
        if(list){
            res.send(list)
        }
        else{
            res.send({state:stateCode.error})
        }
    },
    AddComment:async (req,res)=>{
        let {score,comment,dishes_id,order_id,state}=req.body
        let user_id=getUserId(req)
        let {username,imgurl}=getUser(req)
        let time=getTime
        let dishes=await DisheController.getDisheByDisheID(dishes_id)
        let shop_id=dishes[0].shop_id
        let data={score,comment,dishes_id,order_id,shop_id,user_id,time,username,imgurl}
        let result=await UserContoller.AddComment(data)
        let result1=await OrderController.reState(state,time,order_id,user_id)
        if(result==stateCode.success){
            res.send({state:stateCode.success})
        }
        else{
            res.send({state:stateCode.error})
        }
    },
    AllComment:async (req,res)=>{
        let {dishes_id}=req.query
        let CommentList=await UserContoller.AllComment(dishes_id)
        if(CommentList){
            res.send(CommentList)
        }
        else{
            res.send({state:stateCode.error})
        }
    }
}

function getUserId(req){
    return JWT.verify(req.header('Authorization')?.split(' ')[1]).id
}
function getUser(req){
    return JWT.verify(req.header('Authorization')?.split(' ')[1])
}
module.exports=UserService