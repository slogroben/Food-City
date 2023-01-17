import router from "@/router";
import axios from "axios";
import store from "@/store";

const server=axios.create({
    baseURL:'http://192.168.43.175:8080/',
    timeout:10000
})

server.interceptors.request.use((config)=>{
    let excludeData=['getAllDishe','getAllSeller','login','register','getSellerByID','getDisheByID']
    for (const s of excludeData) {
        if(config.url.includes(s)){
            return config
        }
    }
    const token=localStorage.getItem('token')
    config.headers.Authorization='Barar '+token
    return config
}),function (error){
    return error
}

server.interceptors.response.use(function (response) {
    const {authorization}=response.headers
    authorization&&localStorage.setItem('token',authorization)
    return response;
  }, function (error) {
    let exlist=['DishesCollectionState','ShopCollectionState','check']
    for (const e of exlist) {
        if(error.response.config.url.split('/')[2].split('?')[0]==e){
            return Promise.reject(error);
        }  
    }
    try {
        if(error.response.data.errCode==store.state.stateCode.tokenOutTime){
            router.push({name:'userlogin'})
        }
    } catch (error) {
        
    }
    
    return Promise.reject(error);
  });

  server.getReq=(url)=>{
    return server({
        method:'get',
        url:url,
    })
  }

  server.postReq=(url,data)=>{
    return server({
        method:'post',
        url:url,
        data:data
    })
  }

export default server