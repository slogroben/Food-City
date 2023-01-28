const SellerController = require("../Controllers/SellerController")
const JWT = require("../util/jwt")
const { stateCode, stateMsg } = require("../util/messageCode")
//对文件进行操作
const fs=require('fs')
const storagePath = require("../util/storagePath")
const fileOperation = require("../util/fileOperation")


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
        req.body.user_id=getUserId(req)
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
        if(!getUser){res.end()}
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
    reShopState:async (req,res)=>{
        let user=getUser(req)
        let state=req.query.state
        let result=await SellerController.reShopState(user.shop_id,state)
        if(result){
            res.send({state:stateCode.success,msg:stateMsg.success})
        }else{
            res.send({state:stateCode.error,msg:stateMsg.error})
        }
        
    },
    pushDishe:async (req,res)=>{
        let files=req.files
        let data=req.body
        files.forEach((f,index,files)=>{
            data['img'+(files.length-index)]=f.filename
        })
        let result=await SellerController.pushDishe(data)
        if(result){
            res.send({state:stateCode.success,msg:stateMsg.success})
        }else{
            res.send({state:stateCode.error,msg:stateMsg.error})
        }
    },
    deleteDishe:async (req,res)=>{
        let dishe=req.body
        for(let i=0;i<5;i++){
            await fs.unlink(storagePath.dishesImg+'\\'+dishe['dishes_img'+(i+1)],error=>{
                if(error){
                    console.log(error);
                }
            })  
        }
        let result=await SellerController.deleteDishe(dishe)
        if(result){
            res.send({state:stateCode.success,msg:stateMsg.success})
        }else{
            res.send({state:stateCode.error,msg:stateMsg.error})
        } 
    },
    reDishe:async (req,res)=>{
        let files=req.files
        for (const f of files) {
            req.body[f.fieldname]=f.filename
        }
        let data=req.body
        let result=await SellerController.reDishe(data)
        if(result){
            if(req.body.oldpic){
                let oldpic=req.body.oldpic
                if(!(oldpic instanceof Array)){
                    fileOperation.delDishe(oldpic)
                    return
                }
                for (const o of oldpic) {
                    fileOperation.delDishe(o)
                }
            }
            res.send({state:stateCode.success,msg:stateMsg.success})
        }else{
            res.send({state:stateCode.error,msg:stateMsg.error})
        }
    },
}

function getUserId(req){
    return JWT.verify(req.header('Authorization')?.split(' ')[1]).id
}
function getUser(req){
    return JWT.verify(req.header('Authorization')?.split(' ')[1])
}

module.exports=SellerService