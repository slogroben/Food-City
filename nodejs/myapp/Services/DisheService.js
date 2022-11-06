const DisheController = require("../Controllers/DisheController")

const DisheService={
    getAllDishe:async (req,res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        let dishelist=await DisheController.getAllDishe()
        res.send(dishelist[0])
    }
}

module.exports=DisheService