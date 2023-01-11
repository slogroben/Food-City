const jwt=require('jsonwebtoken')

const screct='xycode'

const JWT={
    generate:(data,vaildTime)=>{
        vaildTime=vaildTime?vaildTime:'1h'
        const token=jwt.sign(data,screct,{expiresIn:vaildTime})
        return token
    },
    verify:(token)=>{
        try {
            const data=jwt.verify(token,screct)
            data.iat?delete data.iat:false
            data.exp?delete data.exp:false
            return data
        } catch (error) {
            return false
        }
    }
}

module.exports=JWT