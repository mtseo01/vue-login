import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/store'

const rejectAuthUser = (to, from, next) => {
  if (store.state.isLogin === true) {
    alert('이미 로그인을 하였습니다.')
    next('/')
  } else next()
}
const onlyAuthUser = (to, from, next) => {
  if (store.state.isLogin === false) {
    alert('로그인이 필요합니다.')
    next('/login')
  } else next()
}
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    beforeEnter: rejectAuthUser,
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/mypage',
    name: 'myPage',
    beforeEnter: onlyAuthUser,
    component: () =>
      import(/* webpackChunkName: "mypage" */ '../views/MyPageView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () =>
      import(/* webpackChunkName: "signup" */ '../views/SignupPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
