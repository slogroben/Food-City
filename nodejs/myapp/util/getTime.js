
let date=new Date()



function getTime(){
    let arr=[date.toLocaleDateString(),date.toLocaleTimeString()]
    return arr.join(' ')
}

module.exports=getTime()