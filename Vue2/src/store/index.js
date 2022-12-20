import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function myAxios(method,url,data){
    method=method?method:'get'
    return axios({
        method,
        url,
    })
}

const actions={
    //获取所有菜品信息
    getDisheList(context){
        myAxios('get',"http://localhost:8080/dishe/getAllDishe")
        .then(
            response=>{
                context.commit('getDisheList',response.data)
            },
            error=>{
                this.getDishesList()
            }
        )
    },
    //获取所有商家信息
    getSellerList(context){
        myAxios('get',"http://localhost:8080/seller/getAllSeller")
        .then(
            response=>{
                context.commit('getSellerList',response.data)
            },
            error=>{
                this.getSellerList()
            }
        )
    },
    //校验用户
    checkUser(context,token){
        myAxios('get',"http://localhost:8080/user/check?token="+token)
        .then(
            response=>{
                const {user,token}=response.data
                localStorage.setItem('token',token)
                context.commit('checkUser',user)
            },
            error=>{
                this.checkUser()
            }
        )
    },
    getOrderList(context){
        let user_id=context.state.user.user_id
        console.log(user_id);
        axios({
            method:'get',
            url:'http://localhost:8080/My/FindNoSumServlet?user_id='+user_id
        }).then(
            response=>{
                this.orderList=response.data
                this.orderList.forEach(o => {
                    o.isChecked=false
                })
            },
            error=>{
                console.log(error);
            }
        )            
    }
}
const mutations={
    getDisheList(state,data){
        state.dishesList=data
    },
    getSellerList(state,data){
        state.sellerList=data
    },
    checkUser(state,data){
        state.user=data
    }
}
const state={
    dishesList:'',
    sellerList:'',
    user:'',
}
const getters={
}

export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})