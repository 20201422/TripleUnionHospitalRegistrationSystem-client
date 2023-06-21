import { createRouter, createWebHistory } from 'vue-router'

import Login from "@/views/LoginView.vue"
import Main from "@/views/MainView.vue"
import departmentHeaderMain from "@/components/departmentHeader/departmentHeaderMain.vue"
import introduction from "@/components/departmentHeader/introduction.vue"
import arrangement from "@/components/departmentHeader/arrangement.vue"
import mangerMain from "@/components/Manger/MangerMain.vue"
import businessTable from "@/components/Manger/BusinessTable.vue";

const routes = [
    {
        path: '/',
        redirect: '/Main'
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/Main',
        name: 'main',
        component: Main,
        children: [
            { path: '/Main', redirect: '', },
            // { path: 'Project', component: Project, },
            // { path: 'Iteration', component: Iteration, },
            // { path: 'Work', component: Work, },
            // { path: 'Story', component: Story, },
        ],
    },
    {
        path:'/departmentHeaderMain',
        name: 'departmentHeaderMain',
        component:departmentHeaderMain,
        children:[
            { path: '/departmentHeaderMain',redirect:'/departmentHeaderMain/introduction'},
            { path: 'introduction',component:introduction},
            { path:'arrangement', component:arrangement}
        ]
    },
    {
        path:'/mangerMain',
        name: 'mangerMain',
        component:mangerMain,
        children:[
            { path: 'businessTable',component:businessTable},
        ]
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
