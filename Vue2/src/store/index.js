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
                context.commit('modifyDisheList',response.data)
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
                context.commit('modifySellerList',response.data)
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
                const {user,token,state}=response.data
                if(state==stateCode.success){
                    localStorage.setItem('token',token)
                    context.commit('modifyUser',user)
                }
                if(state==stateCode.error){
                    localStorage.removeItem('token')
                    context.commit('modifyUser',null)
                }
            },
            error=>{
                this.checkUser()
            }
        )
    },
    getOrderList(context,token){
        axios({
            method:'get',
            url:'http://localhost:8080/order/find?state='+context.state.orderState.shopCart,
            headers:{
                'Authorization':token?'Bearer '+token:null,
            }
        }).then(
            response=>{
                context.commit('findOrder',response.data)
            },
            error=>{
                console.log(error);
            }
        )            
    }
}
const mutations={
    modifyDisheList(state,data){
        state.dishesList=data
    },
    modifySellerList(state,data){
        state.sellerList=data
    },
    modifyUser(state,data){
        state.user=data
    },
    findOrder(state,data){
        state.shopcart=data
    }
}
const state={
    dishesList:'',
    sellerList:'',
    user:'',
    shopcart:'',

    orderState:{
        shopCart:0,
        noPay:1,
        Pay:2
    }
}
const getters={
}

const stateCode={
    error:0,
    success:1
}


export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})