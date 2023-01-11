const OrderController = require("../Controllers/OrderController")
const JWT = require("../util/jwt")
const { orderState } = require("../util/messageCode")


const OrderService={
    addOrder:async(req,res)=>{   
       let result= await OrderController.addNoPay(req.body)
       res.send({result})
    },
    findOrder:async(req,res)=>{
        let {state}=req.query
        // let user_id=JWT.verify(req.header('Authorization')?.split(' ')[1]).id\
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
        res.send(result)
    },
    reState:async(req,res)=>{
        let {state,order_id}=req.query
        let user_id=getUserId(req)
        let result=await OrderController.reState(state,order_id,user_id)
        res.send(result)
    },
    findAll:async(req,res)=>{
        let user_id=getUserId(req)
        let data=await OrderController.findAll(user_id)
        res.send(data)
    },
}

function getUserId(req){
    return JWT.verify(req.header('Authorization')?.split(' ')[1]).id
}
module.exports=OrderService
