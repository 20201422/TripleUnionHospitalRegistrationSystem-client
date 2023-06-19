//更改用户状态信息
export const user = (state, user) => {
    //判断用户是否存在
    if (user != null){
        state.userId = JSON.parse(user).userId;
        state.userName = JSON.parse(user).userName;
        state.userType = JSON.parse(user).userType;
        state.userImage = JSON.parse(user).userImage;
        state.isLogin = true;
    }else if (user == null){
        //登出时清空sessionStorage里面的参数
        sessionStorage.setItem("user", null);
        sessionStorage.setItem("userToken", '');
        state.currentUser = null;
        state.isLogin = false;
        state.assign='';
    }
}

//更改token
export const setToken = (state,token) => {
    if (token!=null){
        state.token = token;
    }else {
        state.token = '';
    }
}


export const project = (saveProject, project) => {
    if (project != null) {
        saveProject.projectId = JSON.parse(project).projectId;
        saveProject.projectName = JSON.parse(project).projectName;
        saveProject.projectState = JSON.parse(project).projectState;
        saveProject.isProject = true;
    } else if (project == null) {
        sessionStorage.setItem("project", null)
        sessionStorage.setItem("projectToken", '')
        saveProject.currentProject = null
        saveProject.isProject = false
        saveProject.assign='';
    }
}

export const setProjectToken = (saveProject, token) => {
    if (token!=null){
        saveProject.token = token;
    }else {
        saveProject.token = '';
    }
}
