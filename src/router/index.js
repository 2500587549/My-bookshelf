import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const About = () => import(/* webpackChunkName: "about" */ '../views/About.vue')
const Book = () => import(/* webpackChunkName: "about" */ '../views/Book.vue')


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/book',
    name: 'Book',
    component: Book
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
