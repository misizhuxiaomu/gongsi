import axios from 'axios';
import store from '../vuex/store'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import router from 'vue-router'
//export const loc = 'http://192.168.10.185:8080'
export const loc='/api';

export const requestLogin = params => {
    return axios({
            method: 'post',
            url: `${loc}/pms/signIn`,
            params: params
            //withCredentials: true
        }).then((res) => res.data);
};
//登出
export const loginOut = params =>{
    return axios({
        method:'post',
        url:`${loc}/pms/logout`,
         params: params
         //withCredentials: true
        }).then((res) => res.data);
};
// //获取任务进度数据
export const queryApplicationList = params => {
    return axios({
        method:'get',
        url:`${loc}/pms/project/listTask`,
         params: params
        }).then((res) => res.data);
};
// //获取项目进度数据
export const queryAccountList = params => {
    return axios({
        method:'get',
        url:`${loc}/pms/project/listProject`,
         params: params,
        }).then((res) => res.data);
};
export const ChartList = params => {
    return axios({
        method:'get',
        url:`${loc}/pms/project/countProject`,
         params: params,
        }).then((res) => res.data);
};

// 添加请求拦截器
axios.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    // 判断是否存在token，如果存在将每个页面header都添加token
    if(store.state.token){
    config.headers.common['Authorization']=store.state.token
    
    }
   
    return config;
    }, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
    });

    // http response 拦截器
    axios.interceptors.response.use(response => {
    return response;
    },
    error => {
    // console.log(store)
    if (error.response) {
    switch (error.response.status) {
    case 401:
    store.commit('del_token');
    window.location.hash = '/login'
    // router.replace({
    // path: '/login',
    // query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
    // })
    }
    }
    return Promise.reject(error)
    });

  export default axios;