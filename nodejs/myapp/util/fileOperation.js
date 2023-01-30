const fs=require('fs');
const storagePath = require('./storagePath');

const fileOperation={
    delDishe:(name)=>{
        fs.unlink(storagePath.dishesImg+'/'+name,error=>{
            if(error){
                console.log(error);
            }
        })
    },
    delUser:(name)=>{
        fs.unlink(storagePath.userImg+'/'+name,error=>{
            if(error){
                console.log(error);
            }
        })
    },
    delSeller:(name)=>{
        fs.unlink(storagePath.shopImg+'/'+name,error=>{
            if(error){
                console.log(error);
            }
        })
    }
    
}

module.exports=fileOperation

