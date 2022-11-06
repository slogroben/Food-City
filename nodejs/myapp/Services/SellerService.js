const SellerController = require("../Controllers/SellerController")

const SellerService={
    getAllSeller:async (req,res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        let dishelist=await SellerController.getAllSeller()
        res.send(dishelist[0])
    }
}

module.exports=SellerService