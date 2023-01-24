const SellerController = require("../Controllers/SellerController")
const JWT = require("../util/jwt")
const { stateCode, stateMsg } = require("../util/messageCode")


const SellerService={
    sellerLogin:async (req,res)=>{
        let {phone}=req.query
        let seller=await SellerController.sellerLogin(phone)
        if(seller){
            res.send(seller)
        }else{
            res.send({state:stateCode.null,msg:stateMsg.null})
        }
    },
    sellerRegister:async (req,res)=>{
        let user_id=getUserId(req)
        req.body.user_id=user_id
        req.body.imgurl=req.file.path
        let result=await SellerController.sellerRegister(req.body)
        if(result){
            res.send({state:stateCode.success,msg:stateMsg.success})
        }else{
            res.send({state:stateCode.error,msg:stateMsg.error})
        }
    },
    getAllSeller:async (req,res)=>{
        let sellerList=await SellerController.getAllSeller()
        res.send(sellerList[0])
    },
    getSeller:async (req,res)=>{
        let user=getUser(req)
        let shop_id=user.shop_id
        let seller=await SellerController.getSeller(shop_id)
        res.send(seller[0])
    },
    getSellerByID:async (req,res)=>{
        let id =req.query.shop_id
        let thisSellerList=await SellerController.getSellerByID(id)
        res.send(thisSellerList[0][0])
    },
    getMyDishes:async (req,res)=>{
        let user=getUser(req)
        let dishelist=await SellerController.getMyDishes(user.shop_id)
        if(dishelist.length!=0){
            res.send(dishelist)
        }
        else{
            res.send({state:stateCode.null,msg:stateMsg.null})
        }
        
    },
    pushDishe:async (req,res)=>{
        console.log(req.fields);
        // let thisSellerList=await SellerController.pushDishe(id)
        // res.send(thisSellerList[0][0])
    }
}

function getUserId(req){
    return JWT.verify(req.header('Authorization')?.split(' ')[1]).id
}
function getUser(req){
    return JWT.verify(req.header('Authorization')?.split(' ')[1])
}

module.exports=SellerService