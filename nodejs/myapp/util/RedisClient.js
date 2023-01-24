// const client=require("./MyRedis")
// function setString(key,value,expire){
//     return new Promise((resolve,reject)=>{
//         client.set(key,value,(error,replay)=>{
//             if(error){
//                 reject('设置成功')
//             }
//             if(expire){
//                 client.expire(key,expire)
//             }
//             resolve('设置失败')
//         })
        
//     })
// }

// function getString(key){
//     return new Promise((resolve,reject)=>{
//         client.get(key,(error,replay)=>{
//             console.log(replay);
//             if(error){
//                 reject(`获取${key}失败`)
//             }
//             resolve(replay)
//         })
//     })
// }

// module.exports={
//     getString,
//     setString
// }