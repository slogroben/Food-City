import server from '@/utils/request'
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function myAxios(method,url,headers,data){
    method=method?method:'get'
    return server({
        method,
        url,
        headers,
    })
}

const actions={
    //获取所有菜品信息
    getDisheList(context){
        myAxios('get',"/dishe/getAllDishe")
        .then(
            response=>{
                context.commit('modifyDisheList',response.data)
            },
            error=>{
                console.log(error);
            }
        )
    },
    //获取所有商家信息
    getSellerList(context){
        myAxios('get',"/seller/getAllSeller")
        .then(
            response=>{
                context.commit('modifySellerList',response.data)
            },
            error=>{
                console.log(error);
            }
        )
    },
    //校验用户
    checkUser(context,token){
        if(!token){return}
        myAxios('get',"/user/check?token="+token)
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
                console.log(error);
            }
        )
    },
    //获取所有订单
    getOrderList(context,token){
        myAxios(null,'/order/find?state='+context.state.orderState.shopCart).then(
            response=>{
                context.commit('findOrder',response.data)
            },
            error=>{
                console.log(error);
            }
        )            
    },
    //获取各种订单数量
    getOrderNum(context){
        if(!localStorage.getItem('token')){return}
        context.state.num.shopCart=0
        context.state.num.noPay=0
        context.state.num.Pay=0
        server.getReq('/order/findByUserID')
                .then(
                    response=>{
                        let orderList=response.data
                        orderList.forEach(u => {
                            if(u.order_state==context.state.orderState.shopCart){
                                context.commit('modifyNum',context.state.orderState.shopCart)
                            }
                            if(u.order_state==context.state.orderState.noPay){
                                context.commit('modifyNum',context.state.orderState.noPay)
                            }
                            if(u.order_state==context.state.orderState.Pay){
                                context.commit('modifyNum',context.state.orderState.Pay)
                            }
                        });
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
    },
    modifyNum(state,flag){
        if(flag==state.orderState.shopCart){state.num.shopCart=state.num.shopCart+1}
        if(flag==state.orderState.noPay){state.num.noPay=state.num.noPay+1}
        if(flag==state.orderState.Pay){state.num.Pay=state.num.Pay+1}
    }
}
const state={
    dishesList:'',
    sellerList:'',
    user:'',
    shopcart:'',

    num:{
        shopCart:0,
        noPay:0,
        Pay:0
    },

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