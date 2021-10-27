import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( '../views/Registration.vue')
  },
  {
    path: '/thread/:threadId',
    name: 'Thread',
    component: () => import( '../views/Thread.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
