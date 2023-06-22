import { createRouter, createWebHistory } from 'vue-router'

import Login from "@/views/LoginView.vue"
import Register from "@/views/RegisterView.vue";
import Main from "@/views/MainView.vue"
import Department from "@/views/DepartmentView.vue"
import Registration from "@/views/RegistrationView.vue";
import MyRegistration from "@/views/MyRegistrationView.vue"
import MedicalRecord from "@/views/MedicalRecordView.vue"
import departmentHeaderMain from "@/components/departmentHeader/departmentHeaderMain.vue"
import doctorMain from "@/components/doctor/doctorMain.vue"
import personalInformation from "@/components/doctor/personalInformation.vue"
import patientQueue from "@/components/doctor/patientQueue.vue"
import myArrangement from "@/components/doctor/myArrangement.vue"
import introduction from "@/components/departmentHeader/introduction.vue"
import arrangement from "@/components/departmentHeader/arrangement.vue"
import changeshiftApply from "@/components/doctor/changeshiftApply.vue"
import changeshiftManage from "@/components/departmentHeader/changeshiftManage.vue"
import mangerMain from "@/components/Manger/MangerMain.vue"
import businessTable from "@/components/Manger/BusinessTable.vue";
import departmentReservationData from "@/components/Manger/DepartmentReservationData.vue"
import doctorReservationData from "@/components/Manger/DoctorReservationData.vue"

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
            { path: 'arrangement', component:arrangement},
            { path: 'changeshiftManage',component:changeshiftManage}
        ]
    },
    {
        path:'/doctorMain',
        name: 'doctorMain',
        component:doctorMain,
        children: [
            { path: '/doctorMain', redirect:'/doctorMain/personalInformation'},
            { path: 'personalInformation' ,component:personalInformation},
            { path: 'patientQueue', component: patientQueue},
            { path: 'myArrangement' , component:myArrangement},
            { path: 'changeshiftApply', component:changeshiftApply},
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
    {
        path:'/mangerMain',
        name: 'mangerMain',
        component:mangerMain,
        children:[
            { path: 'businessTable',component:businessTable},
            { path: 'departmentReservationData',component:departmentReservationData},
            { path: 'doctorReservationData',component:doctorReservationData},
        ]
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
