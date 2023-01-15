const UserContoller = require("../Controllers/UserContoller")
const JWT = require("../util/jwt")
const { stateCode } = require("../util/messageCode")

const UserService={
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
    }
}

function getUserId(req){
    return JWT.verify(req.header('Authorization')?.split(' ')[1]).id
}
module.exports=UserService