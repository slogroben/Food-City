const DisheController = require("../Controllers/DisheController")


const DisheService={
    getAllDishe:async (req,res)=>{
        header(res)
        let dishelist=await DisheController.getAllDishe()
        res.send(dishelist[0])
    },
    getDisheByID:async (req,res)=>{
        header(res)
        res.header("Access-Control-Allow-Origin", "*");
        let id=req.query.shop_id
        let dishelist=await DisheController.getDisheByID(id)
        res.send(dishelist[0])
    }
}
function header(res){
    res.header("Access-Control-Allow-Origin", "*");
}
module.exports=DisheService