import server from '@/utils/request'
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import qs from 'qs'
import router from '@/router'

Vue.use(Vuex)

const actions={
    //获取所有菜品信息
    getDisheList(context){
        server.getReq("/dishe/getAllDishe")
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
        server.getReq("/seller/getAllSeller")
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
        server.getReq("/user/check?token="+token)
        .then(
            response=>{
                const {user,token,state}=response.data
                if(state==context.state.stateCode.success){
                    localStorage.setItem('token',token)
                    context.commit('modifyUser',user)
                }
                if(state==context.state.stateCode.error){
                    localStorage.removeItem('token')
                    context.commit('modifyUser',null)
                }
            },
            error=>{
                // console.log(error);
            }
        )
    },
    //获取所有订单
    getOrderList(context){
        server.getReq('/order/find?state='+context.state.orderState.shopCart).then(
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
    },
    //添加到购物车
    addOrder(context,data) {
        let order = {
            order_title: data.dishes_title,
            order_img1: data.dishes_img1,
            order_price: data.dishes_price*(data.dishes_num?data.dishes_num:1),
            order_num: data.dishes_num?data.dishes_num:1,
            dishes_id:data.dishes_id,
            order_state:data.order_state
        };
        return server.postReq("/order/add", qs.stringify(order))
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
        Pay:2,
        finish:3,
        Evaluated:4
    },

    stateCode:{
        tokenOutTime:-1,
        error:0,
        success:1
    }
}
const getters={
}


export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})