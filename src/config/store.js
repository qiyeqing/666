import Vue from 'vue' 
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    httpError:{
        hasError:false,
        status:'',
        statusText:'',
        userList:[],
        login:null,
        tag:1
    }
}

const mutations = {
    ON_HTTP_ERROR(state,payload){
        state.httpError = payload
    },
    SET_Tag(state,data){
        state.tag = data;
        localStorage.setItem('tag', JSON.stringify(data))
    }
}
const getters={
     isLogin(state) {
        if (!state.login) {
          state.login = localStorage.getItem('list') ? localStorage.getItem('list') : null
        }
        return state.login
      },
      currentTag (state) {  
        return   state.tag = localStorage.getItem('tag') ? localStorage.getItem('tag') : 1;
      },
}

export default new Vuex.Store({
    state,
    mutations,
    getters
})