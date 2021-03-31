import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Authentication/Login.vue'
import SignUp from '../views/Authentication/SignUp.vue'
import Chats from '../views/Chats/Chats.vue'
import ErrorPage from '../Error/ErrorPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Login
  },
  {
    path: '/login',
    name: 'LogIn',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/chats',
    name: 'Chats',
    component: Chats
  },
  {
    path: '/error',
    name: 'Error',
    component: ErrorPage 
  },
  {
    path: '*',
    redirect: { name: 'Home' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
