import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../views/SignUp.vue'
import Home from '../views/Home.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/signup', component: SignUp }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
