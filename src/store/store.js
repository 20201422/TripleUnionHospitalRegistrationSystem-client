import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

const store = new Vuex.Store({
    //存储用户登录信息的一个状态
    state:{
        userId: null,   // 用户Id
        userName: null,  // 用户名称
        userType: null,  // 用户类型
        userImage: null, // 用户头像
        isLogin: false,  // 登录状态
        token: '',    // 用户登录成功后持有的token
    },
    saveProject: {
        projectId: null,
        projectName: null,
        projectState: null,
        isProject: false,
        token: '',
    },
    //关联着其他三个目录，目的松耦合
    getters,
    mutations,
    actions
})
export default store;
