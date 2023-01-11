import axios from "axios";

const server=axios.create({
    baseURL:'http://192.168.43.175:8080/',
    timeout:10000
})

server.interceptors.request.use((config)=>{
    if(config.url.includes('getAllDishe')){
        return config
    }
    if(config.url.includes('getAllSeller')){
        return config
    }
    if(config.url.includes('login')){
        return config
    }
    if(config.url.includes('register')){
        return config
    }
    console.log(config);
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