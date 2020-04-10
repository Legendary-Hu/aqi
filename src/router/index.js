import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CityView from "../components/CityView/CityView";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // component: () => import('../components/Index/Index'),
    redirect: '/all'
  },

  {
    path:'/all',
    component: () => import('../components/Index/Index')
  },
  {
    path:'/rand',
    component: () => import('../components/Rand/Rand')
  },

  {
    path:'/analyze',
    component: () => import('../components/Analyze/Analyze')
  },
  {
    path:'/feedback',
    component:() => import('../components/Feedback/Feedback')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
