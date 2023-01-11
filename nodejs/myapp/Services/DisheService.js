const DisheController = require("../Controllers/DisheController")


const DisheService={
    getAllDishe:async (req,res)=>{
        let dishelist=await DisheController.getAllDishe()
        res.send(dishelist[0])
    },
    getDisheByID:async (req,res)=>{
        let id=req.query.shop_id
        let dishelist=await DisheController.getDisheByID(id)
        res.send(dishelist[0])
    }
}

module.exports=DisheService