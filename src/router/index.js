import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../views/Home/Index.vue'

Vue.use(Router)

// Configuración rutas
const routerOptions = [
  { path: '/', name: 'Home' },
  { path: '/region/:region/profile/:battleTag', name: 'Profile' },
  { path: '/region/:region/profile/:battleTag/hero/:heroId', name: 'Hero' },
  { path: '/about', name: 'About' },
  { path: '/error', name: 'Error' },
  { path: '*', redirect: { name: 'Home' } }
]

// Rutas
const routes = routerOptions.map(r => {
  return {
    ...r,
    // Lazy load
    component: () => import(/* webpackChunkName: "[request]" */ `@/views/${r.name}/Index.vue`)
  }
})

/*
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" / '../views/About/Index.vue')
  }
]
*/

const router = new Router({
  routes
})

export default router
