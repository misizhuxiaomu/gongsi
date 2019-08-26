import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
// const state = {
    // count: 10,
    // token:''
    // time:3300
    // isLogin:0   //初始时候给一个  isLogin=0  表示用户未登录
    // user: JSON.parse(localStorage.username || '{}'),
// }


// 定义所需的 mutations
// const mutations = {
//     INCREMENT(state) {
//         state.count++
//     },
//     DECREMENT(state) {
//         state.count--
//     },
    // //设置全局token
    // set_token(state, token) {
    // state.token = token
    // sessionStorage.token = token
    // },
    // del_token(state) {
    // state.token = ''
    // sessionStorage.removeItem('token')
    // }

    // changeLogin(state,data){
    //     state.isLogin = data;
    // }
    // changeUser(state, msg){
    //     state.user = msg;
    // },

// }


// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    // state,
    // mutations,

    state:{
        token:'',
        account:true,
        isCollapse:true,
        textVa:[]
        },
        mutations:{
            set_token(state, token) {
            state.token = token
            sessionStorage.token = token
            },
            del_token(state) {
            state.token = ''
            sessionStorage.removeItem('token')
            },
            stateID(state,value){
                state.account = value
            },
            isquert(state,value){
                state.isCollapse = value
            },
            textV(state,value){
                state.textVa = value
            }
        }

})
