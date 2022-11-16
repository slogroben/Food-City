import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions={
    getDisheList(context){
        axios({
            method:'get',
            url:"http://localhost:8080/dishe/getAllDishe"
        }).then(
            response=>{
                context.commit('getDisheList',response.data)
            },
            error=>{
                this.getDishesList()
            }
        )
    },
    getSellerList(context){
        axios({
            method:'get',
            url:"http://localhost:8080/seller/getAllSeller"
        }).then(
            response=>{
                context.commit('getSellerList',response.data)
            },
            error=>{
                this.getSellerList()
            }
        )
    },
}
const mutations={
    getDisheList(state,data){
        state.dishesList=data
    },
    getSellerList(state,data){
        state.sellerList=data
    }
}
const state={
    dishesList:'',
    sellerList:''
}
const getters={
}

export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})