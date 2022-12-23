const OrderController = require("../Controllers/OrderController")
const { orderStatus } = require("../util/messageCode")


const OrderService={
    addOrder:async(req,res)=>{
        header(res)
       let result= await OrderController.addNoPay(req.body)
       res.send({result})
    },
    findOrder:async(req,res)=>{
        const param=req.query
        header(res)
        
    }
}


function header(res){
    res.header("Access-Control-Allow-Origin", "*");
}
module.exports=OrderService
