import Vue from 'vue'
import VueRouter from 'vue-router'
import Principal from '../views/Principal.vue'
import Login from '../components/Login.vue'
import Presentacion from '../components/Presentacion.vue'
import EditarUsuario from '../components/EditarUsuario.vue'


Vue.use(VueRouter)

const routes = [
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  {
    path: '/principal',
    name: 'Principal',
    component: Principal
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/presentacion',
    name: 'Presentacion',
    component: Presentacion
  },
  {
    path: '/editar',
    name: 'EditarUsuario',
    component: EditarUsuario
  }
  
]

const router = new VueRouter({
  routes
})

export default router
