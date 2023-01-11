import axios from "axios";
import { config } from "vue/types/umd";


axios.defaults.headers['Content-Type']='application/json;charset=utf-8'

const service=axios.create({
    baseURL:process.VUE_APP_BASE_API,
    timeout:60*60*1000
})

service.interceptors.request.use(config=>{
    const isToken=(config.headers || {}).isToken===false
})