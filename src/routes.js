import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import AccountManagement from './views/CustomerManagement/AccountManagement.vue'
import LatestActivity from './views/CustomerManagement/latestActivity.vue'
// let routes = [
export const constantRouterMap = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '管理列表',
         //hidden:true,
        // iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/accountManagement', component: AccountManagement, name: '任务进度' ,hidden:false},
            { path: '/latestActivity', component: LatestActivity, name: '最新活动' ,hidden:false}
        ]
    }
];

export default constantRouterMap;