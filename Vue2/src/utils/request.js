import router from "@/router";
import axios from "axios";
import store from "@/store";

const url='http://192.168.8.125:8080/'
const timeout=10000

const server=axios.create({
    baseURL:url,
    timeout:timeout,
    // withCredentials: true
})

server.interceptors.request.use((config)=>{
    //无需登录的页面
    let excludeData=['getAllDishe','getAllSeller','login','register','getSellerByID','getDisheByID','captcha']
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
    //无需登录，但是要token的页面
    let exlist=['DishesCollectionState','ShopCollectionState','check','AllComment']
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
  server.postReq=(url,data,headers)=>{
    return server({
        method:'post',
        url:url,
        data:data,
        headers:headers
    })
  }



export default server