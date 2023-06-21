import { createRouter, createWebHistory } from 'vue-router'

import Login from "@/views/LoginView.vue"
import Register from "@/views/RegisterView.vue";
import Main from "@/views/MainView.vue"
import Department from "@/views/DepartmentView.vue"
import Registration from "@/views/RegistrationView.vue";
import MyRegistration from "@/views/MyRegistrationView.vue"
import MedicalRecord from "@/views/MedicalRecordView.vue"
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
        component: Login,
    },
    {
        path: '/Register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/Main',
        name: 'main',
        component: Main,
    },
    {
        path: '/Patient/Department',
        name: 'Department',
        component: Department,
    },
    {
      path: '/Patient/Registration/:departmentId',
        name: 'Registration',
        component: Registration,
    },
    {
        path: '/Patient/MyRegistration',
        name: 'MyRegistration',
        component: MyRegistration,
    },
    {
        path: '/Patient/MedicalRecord',
        name: 'MedicalRecord',
        component: MedicalRecord,
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
