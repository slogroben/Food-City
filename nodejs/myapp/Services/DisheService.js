const DisheController = require("../Controllers/DisheController")


const DisheService={
    getAllDishe:async (req,res)=>{
        let dishelist=await DisheController.getAllDishe()
        res.send(dishelist[0])
    },
    getDisheByID:async (req,res)=>{
        let {shop_id}=req.query
        let dishelist=await DisheController.getDisheByID(shop_id)
        res.send(dishelist[0])
    },
    getDisheByDisheID:async (req,res)=>{
        let {dishes_id}=req.query
        let dishelist=await DisheController.getDisheByDisheID(dishes_id)
        res.send(dishelist[0])
    }
}

module.exports=DisheService