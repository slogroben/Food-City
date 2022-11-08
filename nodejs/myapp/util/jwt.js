const jwt=require('jsonwebtoken')

const screct='xycode'

const JWT={
    generate:(data,vaildTime)=>{
        const token=jwt.sign(data,screct,{expiresIn:vaildTime})
        return token
    },
    verify:(token)=>{
        const data=jwt.decode(token,screct)
        if(data){
            return data
        }
        else{
            return false
        }
        
    }
}