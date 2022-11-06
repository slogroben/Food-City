import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions={
    getDisheList(state){
        axios({
            method:'get',
            url:"http://localhost:8080/dishe/getAllDishe"
        }).then(
            response=>{
                state.dishesList=response.data;
            },
            error=>{
                this.getDishesList()
            }
        )
    }
}
const mutations={
}
const state={
    dishesList:''
}
const getters={

}

export default new Vuex.Store({
    actions,
    mutations,
    state,getters
})