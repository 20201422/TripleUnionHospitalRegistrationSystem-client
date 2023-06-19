//调用mutations
export const setUser = ({commit},user) => {
    commit("user", user);
}
export const setToken = ({commit},token) =>{
    commit("setToken", token);
}


export const setProject = ({commit},project) => {
    commit("project", project)
}
export const setProjectToken =  ({commit},projectToken) => {
    commit("setProjectToken", projectToken)
}
