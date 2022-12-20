const UserContoller = require("../Controllers/UserContoller")
const JWT = require("../util/jwt")

const UserService={
    userLogin:async (req,res)=>{
        const {username,password}=req.body
        let user=await UserContoller.userLogin(username,password)
        if(user[0]){
            header(res)
            user=user[0][0]
            let token=JWT.generate(user)
            res.header('Authorization',token)
            //暴露Authorization
            res.setHeader("Access-Control-Expose-Headers", "Authorization");
            res.end()
        }
    },
    userCheck:async (req,res,token)=>{
        let user=JWT.verify(token)
        const {username,password}=user
        user=await UserContoller.userLogin(username,password)
        user=user[0][0]
        if(user){
            header(res)
            let token=JWT.generate(user)
            res.send({user,token})
        }
    }
}
function header(res){
    res.header("Access-Control-Allow-Origin", "*");
}

module.exports=UserService