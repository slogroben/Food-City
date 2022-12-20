const OrderController = require("../Controllers/OrderController")


const OrderService={
    addOrder:async(req,res)=>{
        header(res)
       let result= await OrderController.addNoPay(req.body)
       res.send({result})
    }
}

function header(res){
    res.header("Access-Control-Allow-Origin", "*");
}
module.exports=OrderService