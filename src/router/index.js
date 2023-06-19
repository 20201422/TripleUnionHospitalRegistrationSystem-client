import { createRouter, createWebHistory } from 'vue-router'

import Login from "@/views/LoginView.vue"
import Main from "@/views/MainView.vue"


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

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
