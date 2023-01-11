const SellerController = require("../Controllers/SellerController")

const SellerService={
    getAllSeller:async (req,res)=>{
        let sellerList=await SellerController.getAllSeller()
        res.send(sellerList[0])
    },
    getSellerByID:async (req,res)=>{
        let id =req.query.shop_id
        let thisSellerList=await SellerController.getSellerByID(id)
        res.send(thisSellerList[0][0])
    }
}


module.exports=SellerService