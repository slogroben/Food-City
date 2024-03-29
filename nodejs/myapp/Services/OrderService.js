const OrderController = require("../Controllers/OrderController")
const getTime = require("../util/getTime")
const JWT = require("../util/jwt")
const { orderState, stateCode } = require("../util/messageCode")


const OrderService={
    addOrder:async(req,res)=>{   
       let user_id=getUserId(req)
       req.body.user_id=user_id  
       req.body.time=getTime   
       req.body.shop_id
       let result= await OrderController.addOrder(req.body)
       res.send({result})
    },
    findOrder:async(req,res)=>{
        let {state}=req.query
        let user_id=getUserId(req)
        let data=await OrderController.findOrder(state,user_id)
        res.send(data)
    },
    changeNum:async(req,res)=>{
        let {order_id,order_num}=req.query
        let user_id=getUserId(req)
        let result=await OrderController.changeNum(order_id,order_num,user_id)
        res.send(result)
    },
    delete:async(req,res)=>{
        let {order_id}=req.query
        let user_id=getUserId(req)
        let result=await OrderController.delete(order_id,user_id)
        if(result){
            res.send({state:stateCode.success})
        }
        else{
            res.send({state:stateCode.error})
        }
    },
    reState:async(req,res)=>{
        let {state,order_id}=req.query
        let user_id=getUserId(req)
        let time=getTime
        let result=await OrderController.reState(state,time,order_id,user_id)
        res.send(result)
    },
    findAll:async(req,res)=>{
        let user_id=getUserId(req)
        let data=await OrderController.findAll(user_id)
        res.send(data)
    },
    findByUserID:async(req,res)=>{
        let user_id=getUserId(req)
        let data=await OrderController.findByUserID(user_id)
        res.send(data)
    },
    findByShopID:async(req,res)=>{
        let data=await OrderController.findByShopID(req.query)
        res.send(data)
    },
    getOrderStateNum:async(req,res)=>{
        let data=await OrderController.getOrderStateNum(req.query.shop_id)
        res.send(data)
    }
}

function getUserId(req){
    return JWT.verify(req.header('Authorization')?.split(' ')[1]).id
}
module.exports=OrderService
