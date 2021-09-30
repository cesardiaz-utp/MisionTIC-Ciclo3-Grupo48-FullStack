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
    path: '/products',
    name: 'Product List',
    component: () => import('../views/products/List.vue')
  },
  {
    path: '/products/new',
    name: 'New Product',
    component: () => import('../views/products/Edit.vue')
  },
  {
    path: '/products/:code',
    name: 'Edit Product',
    component: () => import('../views/products/Edit.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
