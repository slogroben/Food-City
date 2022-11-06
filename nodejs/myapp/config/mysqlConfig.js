function getConfig(){
    return{
        host:'127.0.0.1',
        port:3306,
        user:'root',
        password:'123456',
        database:'mydb1',
        connectionLimit:10
    }
}

module.exports=getConfig