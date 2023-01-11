import { createStore } from 'vuex'
import router from '../router'
import { userLogin } from '@/api/user'
import { saveTokenAtCookie, deleteCookie } from '@/utils/cookies'
export default createStore({
  state: {
    userInfo: '',
    isLogin: false,
    isLoginError: false,
    token: ''
  },
  getters: {},
  mutations: {
    // state 값을 변경하는 로직
    // 로그인 성공
    loginSuccess(state, payload) {
      state.isLogin = true
      state.isLoginError = false
      state.userInfo = payload
    },
    // 로그인 실패
    loginError(state) {
      state.isLogin = false
      state.isLoginError = true
    },
    logout(state) {
      state.isLogin = false
      state.isLoginError = false
      state.userInfo = null
      state.token = null
      deleteCookie('token')
    },
    // 토큰 핸들링
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {
    // 비지니스 로직
    // 로그인 시도
    async login({ commit }, loginObj) {
      try {
        const { data } = await userLogin(loginObj)
        commit('loginSuccess', data.userInfo)
        commit('setToken', data.token)
        saveTokenAtCookie(data.token)
        router.push({ name: 'myPage' })
      } catch (error) {
        commit('loginError')
      }
    },
    logout({ commit }) {
      commit('logout')
      alert('로그아웃 하였습니다.')
      router.push({ name: 'home' })
    }
  },

  modules: {}
})
