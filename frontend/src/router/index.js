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
    path: '/thread/edit/:threadId',
    name: 'Thread_modify',
    component: () => import( '../views/Thread_edit.vue')
  },
  {
    path: '/thread/create',
    name: 'Thread_create',
    component: () => import( '../views/Thread_create.vue')
  },
  {
    path: '/thread/:threadId',
    name: 'Thread',
    component: () => import( '../views/Thread.vue')
  },
  {
    path: '/post/edit/:postId',
    name: 'Post_modify',
    component: () => import( '../views/Post_edit.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
