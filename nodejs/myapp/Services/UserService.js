const UserContoller = require("../Controllers/UserContoller")

const UserService={
    userLogin:async (req,res)=>{
        const {username,password}=req.body
        let user=await UserContoller.userLogin(username,password)
        if(user[0]){
            
        }
    }
}

module.exports=UserService