const UserContoller = require("../Controllers/UserContoller")
const JWT = require("../util/jwt")
const { stateCode } = require("../util/messageCode")

const UserService={
    userLogin:async (req,res)=>{
        const {username,password}=req.body
        let user=await UserContoller.userLogin(username,password)
        if(user[0].length){
            user=user[0][0]
            let token=JWT.generate(user)
            res.header('Authorization',token)
            //暴露Authorization
            res.setHeader("Access-Control-Expose-Headers", "Authorization");
            res.end()
        }
        else{
            res.status(401).send({errCode:stateCode.error})
        }
    },
    userCheck:async (req,res,token)=>{
        let user=JWT.verify(token)
        const {username,password}=user
        user=await UserContoller.userLogin(username,password)
        user=user[0][0]
        if(user){
            let token=JWT.generate(user)
            res.send({user,token,state:stateCode.success})
        }
        else{
            res.send({state:stateCode.error})
        }
    }
}


module.exports=UserService