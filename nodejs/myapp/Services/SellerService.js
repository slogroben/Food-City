const SellerController = require("../Controllers/SellerController")

const SellerService={
    getAllSeller:async (req,res)=>{
        header(res)
        let sellerList=await SellerController.getAllSeller()
        res.send(sellerList[0])
    },
    getSellerByID:async (req,res)=>{
        header(res)
        let id =req.query.shop_id
        let thisSellerList=await SellerController.getSellerByID(id)
        res.send(thisSellerList[0][0])
    }
}

function header(res){
    res.header("Access-Control-Allow-Origin", "*");
}

module.exports=SellerService